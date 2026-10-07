-- FASE 2: IDENTIDAD INMOBILIARIA Y PROPIEDAD HORIZONTAL
-- Este esquema crea la estructura Multitenant para Conjuntos/Copropiedades sin afectar el módulo de compradores.

-- 1. COPROPIEDADES (Tenants)
CREATE TABLE IF NOT EXISTS public.ph_copropiedades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre TEXT NOT NULL,
    nit TEXT UNIQUE,
    direccion TEXT,
    ciudad TEXT,
    tipo TEXT CHECK (tipo IN ('residencial', 'comercial', 'mixto')),
    admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- El superadmin de esta copropiedad
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TORRES / BLOQUES
CREATE TABLE IF NOT EXISTS public.ph_torres (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    copropiedad_id UUID NOT NULL REFERENCES public.ph_copropiedades(id) ON DELETE CASCADE,
    nombre TEXT NOT NULL, -- Ej: 'Torre 1', 'Interior 3', 'Manzana A'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. UNIDADES PRIVADAS (Apartamentos, Casas, Locales)
CREATE TABLE IF NOT EXISTS public.ph_unidades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    torre_id UUID NOT NULL REFERENCES public.ph_torres(id) ON DELETE CASCADE,
    numero TEXT NOT NULL, -- Ej: '301', 'Casa 5'
    tipo TEXT DEFAULT 'apartamento' CHECK (tipo IN ('apartamento', 'casa', 'local', 'parqueadero', 'deposito')),
    coeficiente NUMERIC(5,4) DEFAULT 0.0000, -- Ej: 0.1250 %
    matricula_inmobiliaria TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. IDENTIDAD INMOBILIARIA (Relación Usuario <-> Unidad)
-- Un usuario puede ser propietario del 301, y arrendatario del 402 en otro conjunto.
CREATE TABLE IF NOT EXISTS public.ph_unidad_usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unidad_id UUID NOT NULL REFERENCES public.ph_unidades(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rol TEXT NOT NULL CHECK (rol IN ('propietario', 'residente', 'arrendatario', 'inmobiliaria')),
    estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'en_revision', 'verificado', 'rechazado', 'inactivo')),
    fecha_inicio DATE DEFAULT CURRENT_DATE,
    fecha_fin DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(unidad_id, user_id, rol) -- Evita duplicados exactos
);

-- 5. ESTADO DE CUENTA (Financiero de la unidad)
CREATE TABLE IF NOT EXISTS public.ph_estado_cuenta (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unidad_id UUID NOT NULL REFERENCES public.ph_unidades(id) ON DELETE CASCADE,
    concepto TEXT NOT NULL, -- Ej: 'Cuota Admin Enero', 'Cuota Extraordinaria'
    monto NUMERIC NOT NULL DEFAULT 0,
    saldo NUMERIC NOT NULL DEFAULT 0,
    fecha_vencimiento DATE NOT NULL,
    estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'mora', 'pagado', 'acuerdo_pago')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SEGURIDAD RLS (Aislamiento por Copropiedad)
ALTER TABLE public.ph_copropiedades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ph_torres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ph_unidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ph_unidad_usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ph_estado_cuenta ENABLE ROW LEVEL SECURITY;

-- Políticas Básicas Provisionales (Se endurecerán en las siguientes fases)
-- Un usuario puede ver las copropiedades donde tiene alguna unidad verificada, o si es el admin.
CREATE POLICY "Ver copropiedades autorizadas" ON public.ph_copropiedades FOR SELECT 
USING (
    admin_id = auth.uid() 
    OR id IN (
        SELECT t.copropiedad_id 
        FROM public.ph_torres t
        JOIN public.ph_unidades u ON t.id = u.torre_id
        JOIN public.ph_unidad_usuarios uu ON u.id = uu.unidad_id
        WHERE uu.user_id = auth.uid() AND uu.estado = 'verificado'
    )
);

-- Un usuario solo puede ver la relación de identidad que le pertenece
CREATE POLICY "Ver propia identidad inmobiliaria" ON public.ph_unidad_usuarios FOR SELECT 
USING (user_id = auth.uid());

-- Triggers de actualización
CREATE TRIGGER update_ph_copropiedades_modtime BEFORE UPDATE ON public.ph_copropiedades FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();
CREATE TRIGGER update_ph_unidades_modtime BEFORE UPDATE ON public.ph_unidades FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();
CREATE TRIGGER update_ph_unidad_usuarios_modtime BEFORE UPDATE ON public.ph_unidad_usuarios FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();
CREATE TRIGGER update_ph_estado_cuenta_modtime BEFORE UPDATE ON public.ph_estado_cuenta FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();
