-- Script corregido - sin dblink (compatible con Supabase)

-- 1. Crear el enum de roles
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

-- 2. Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS app_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_uid UUID NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  username TEXT UNIQUE,
  role app_role NOT NULL DEFAULT 'Clientes',
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Trigger para actualizar timestamps
CREATE OR REPLACE FUNCTION update_app_users_timestamps()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END $$
LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_app_users_timestamp ON app_users CASCADE;
CREATE TRIGGER update_app_users_timestamp
BEFORE INSERT OR UPDATE ON app_users
FOR EACH ROW EXECUTE FUNCTION update_app_users_timestamps();

-- 4. Índices para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_app_users_auth_uid ON app_users(auth_uid);
CREATE INDEX IF NOT EXISTS idx_app_users_email ON app_users(email);
CREATE INDEX IF NOT EXISTS idx_app_users_role ON app_users(role);

-- 5. Habilitar RLS
ALTER TABLE app_users ENABLE ROW LEVEL SECURITY;

-- 6. Políticas de seguridad
CREATE POLICY app_users_read ON app_users FOR SELECT
USING (auth.uid()::text = auth_uid::text);

CREATE POLICY app_users_modify ON app_users FOR UPDATE
USING (auth.uid()::text = auth_uid::text);

CREATE POLICY app_users_insert ON app_users FOR INSERT
WITH CHECK (auth.uid()::text = auth_uid::text);

-- 7. Función para crear usuario automáticamente
CREATE OR REPLACE FUNCTION create_app_user()
RETURNS TRIGGER AS $$
DECLARE
  auth_uid UUID;
BEGIN
  -- Obtener el UID desde contexto de auth
  SELECT auth.uid()::uuid INTO auth_uid;

  -- Verificar si ya existe
  IF NOT EXISTS (
    SELECT 1 FROM app_users WHERE auth_uid = NEW.auth_uid
  ) THEN
    INSERT INTO app_users (auth_uid, email, role)
    VALUES (auth_uid, NEW.email, 'Clientes')
    RETURNING id INTO NEW.id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS create_app_user_trigger ON app_users;
CREATE TRIGGER create_app_user_trigger
BEFORE INSERT ON app_users
FOR EACH ROW EXECUTE FUNCTION create_app_user();

-- 8. Nota de implementación
-- Este script requiere:
-- 1. Conexión a Supabase con permisos de creación de funciones
-- 2. Implementación de hooks en Supabase Auth para pasar el UID
-- 3. Actualización de la aplicación para incluir el campo auth_uid