-- Tabla de usuarios con roles

-- Crear el tipo de enum para roles
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE app_role AS ENUM (
      'Clientes',
      'LoanOfficers',
      'Realtors',
      'Bancos',
      'admin'
    );
  END IF;
END $$LANGUAGE plpgsql;

-- Crear tabla de usuarios con datos de autenticación
CREATE TABLE IF NOT EXISTS app_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_uid UUID NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  username TEXT UNIQUE,
  role app_role NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger para actualizar updated_at al modificar registros
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END $$
LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_app_users_updated_at ON app_users;
CREATE TRIGGER update_app_users_updated_at
BEFORE UPDATE ON app_users
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Índices para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_app_users_auth_uid ON app_users(auth_uid);
CREATE INDEX IF NOT EXISTS idx_app_users_email ON app_users(email);
CREATE INDEX IF NOT EXISTS idx_app_users_role ON app_users(role);

-- Habilitar RLS (Row Level Security)
ALTER TABLE app_users ENABLE ROW LEVEL SECURITY;

-- Políticas de acceso basadas en roles
CREATE POLICY app_users_read ON app_users FOR SELECT
USING (auth.uid()::text = auth_uid::text);

CREATE POLICY app_users_modify ON app_users FOR UPDATE
USING (auth.uid()::text = auth_uid::text);

CREATE POLICY app_users_insert ON app_users FOR INSERT
WITH CHECK (auth.uid()::text = auth_uid::text);

-- Función para crear usuario de Supabase automáticamente
CREATE OR REPLACE FUNCTION create_app_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Verificar si el usuario existe en auth
  SELECT auth.uid() INTO auth_uid;
  
  -- Si no existe, crearlo a través de Auth.signUp()
  IF NOT EXISTS (
    SELECT 1 FROM app_users WHERE auth_uid = auth.uid()
  ) THEN
    INSERT INTO app_users (auth_uid, email, role)
    VALUES (auth.uid(), NEW.email, 'Clientes')
    RETURNING id;
  END IF;
  
  RETURN NEW;
END $$
LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS create_app_user_trigger ON app_users;
CREATE TRIGGER create_app_user_trigger
BEFORE INSERT ON app_users
FOR EACH ROW EXECUTE FUNCTION create_app_user();