-- AUDITORÍA Y PLAN MAESTRO - FASE 0: FUNDACIONES Y SEGURIDAD
-- Este script expande la base de datos para soportar Roles Reales, Multitenancy (Organizaciones), Expedientes Seguros y Perfiles Financieros.

-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLAS NÚCLEO (FUNDACIÓN)

-- Organizaciones (Multitenancy)
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('constructora', 'inmobiliaria', 'entidad_financiera', 'institucion_publica')),
    nit TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Perfiles extendidos (Llamada 'profiles', asume que el ID es el auth.uid() de Supabase)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY, -- Referencia a auth.users.id
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'comprador' CHECK (role IN ('comprador', 'propietario', 'constructora', 'inmobiliaria', 'entidad_financiera', 'admin')),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL, -- Si pertenece a un ente
    itin TEXT, -- Cédula
    residence TEXT DEFAULT 'local',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Perfil Financiero y de Hogar
CREATE TABLE IF NOT EXISTS public.financial_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    monthly_income NUMERIC DEFAULT 0,
    monthly_expenses NUMERIC DEFAULT 0,
    current_savings NUMERIC DEFAULT 0,
    severance_balance NUMERIC DEFAULT 0, -- Cesantías
    has_down_payment BOOLEAN DEFAULT false,
    wants_subsidy BOOLEAN DEFAULT true,
    family_members INTEGER DEFAULT 1,
    marital_status TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. EXPEDIENTE Y TRAZABILIDAD

-- Consentimientos (Habeas Data)
CREATE TABLE IF NOT EXISTS public.consents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    purpose TEXT NOT NULL,
    granted BOOLEAN DEFAULT true,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documentos (Expediente)
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL CHECK (category IN ('identificacion', 'ingresos', 'subsidios', 'credito', 'vivienda')),
    document_type TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    status TEXT DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'aprobado', 'rechazado')),
    expiration_date DATE,
    organization_access UUID[], -- Array de IDs de organizaciones autorizadas a ver este documento
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fuentes de Información Oficial
CREATE TABLE IF NOT EXISTS public.information_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    program_name TEXT NOT NULL,
    entity_name TEXT NOT NULL,
    official_url TEXT,
    last_verified_at TIMESTAMPTZ DEFAULT NOW(),
    active BOOLEAN DEFAULT true
);

-- 4. SEGURIDAD RLS (Row Level Security)

-- Habilitar RLS en tablas críticas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consents ENABLE ROW LEVEL SECURITY;

-- Políticas de Profiles: Un usuario solo puede verse a sí mismo (y los admins a todos)
CREATE POLICY "Users can view own profile" 
    ON public.profiles FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);

-- Políticas de Perfil Financiero
CREATE POLICY "Users can view and edit own financial profile" 
    ON public.financial_profiles FOR ALL 
    USING (auth.uid() = user_id);

-- Políticas de Documentos (Habeas Data)
CREATE POLICY "Users can manage own documents" 
    ON public.documents FOR ALL 
    USING (auth.uid() = user_id);

-- (Futuro: Políticas para que las organizaciones vean documentos según el array 'organization_access')

-- 5. TRIGGERS
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();
CREATE TRIGGER update_financial_profiles_modtime BEFORE UPDATE ON public.financial_profiles FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();
CREATE TRIGGER update_documents_modtime BEFORE UPDATE ON public.documents FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();
