-- Script corregido para Supabase sin errores de sintaxis

-- 1. Crear tipo de enum para roles
CREATE TYPE app_role AS ENUM (
  'Clientes',
  'LoanOfficers',
  'Realtors',
  'Bancos',
  'admin'
);

-- 2. Habilitar RLS en la tabla
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

-- 3. Funci�n para actualizar timestamps
CREATE OR REPLACE FUNCTION update_app_users_timestamps()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_app_users_timestamp ON app_users CASCADE;
CREATE TRIGGER update_app_users_timestamp
BEFORE INSERT OR UPDATE ON app_users
FOR EACH ROW EXECUTE FUNCTION update_app_users_timestamps();

-- 4. Crear �ndices
CREATE INDEX IF NOT EXISTS idx_app_users_auth_uid ON app_users(auth_uid);
CREATE INDEX IF NOT EXISTS idx_app_users_email ON app_users(email);
CREATE INDEX IF NOT EXISTS idx_app_users_role ON app_users(role);

-- 5. Habilitar RLS
ALTER TABLE app_users ENABLE ROW LEVEL SECURITY;

-- 6. Pol�ticas de seguridad
CREATE POLICY app_users_read ON app_users FOR SELECT
USING (auth.uid()::text = auth_uid::text);

CREATE POLICY app_users_modify ON app_users FOR UPDATE
USING (auth.uid()::text = auth_uid::text);

CREATE POLICY app_users_insert ON app_users FOR INSERT
WITH CHECK (auth.uid()::text = auth_uid::text);

-- 7. Funci�n para crear usuarios
CREATE OR REPLACE FUNCTION create_app_user()
RETURNS TRIGGER AS $$
DECLARE
  auth_uid TEXT;
BEGIN
  SELECT auth.uid() INTO auth_uid;
  IF NOT EXISTS (SELECT 1 FROM app_users WHERE auth_uid = NEW.auth_uid) THEN
    INSERT INTO app_users (auth_uid, email, role)
    VALUES (auth_uid, NEW.email, 'Clientes');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS create_app_user_trigger ON app_users;
CREATE TRIGGER create_app_user_trigger
BEFORE INSERT ON app_users
FOR EACH ROW EXECUTE FUNCTION create_app_user();

-- 8. Pruebas de acceso
CREATE OR REPLACE FUNCTION test_rls_access()
RETURNS VOID AS $$
BEGIN
  -- Crear un usuario de prueba
  INSERT INTO app_users (auth_uid, email, role)
  VALUES ('123e4567-e89b-12d3-a456-426614174000', 'test@example.com', 'Clientes');

  -- Intentar leer registro
  RAISE NOTICE '%', (SELECT * FROM app_users WHERE auth_uid = '123e4567-e89b-12d3-a456-426614174000');

  -- Intentar actualizar
  RAISE NOTICE '%', update_app_users(auth_uid := '123e4567-e89b-12d3-a456-426614174000', role := 'Realtors');
END;
$$ LANGUAGE plpgsql;