-- Script ajustado para MiKasApp: tablas y llaves compatibles con los IDs que usa la app.
-- Ejecuta este script en tu proyecto Supabase SQL Editor.

-- Extensión opcional para generación de UUIDs como texto
create extension if not exists "pgcrypto";

-- Tabla de perfiles de usuario
CREATE TABLE IF NOT EXISTS profiles (
  user_id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  username TEXT UNIQUE,
  role TEXT NOT NULL DEFAULT 'Clientes',
  itin TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de metas de ahorro
CREATE TABLE IF NOT EXISTS savings_goals (
  goal_id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT REFERENCES profiles(user_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  target_amount NUMERIC NOT NULL,
  saved_amount NUMERIC NOT NULL DEFAULT 0
);

-- Tabla de progreso educativo
CREATE TABLE IF NOT EXISTS educational_progress (
  module_id TEXT NOT NULL,
  user_id TEXT REFERENCES profiles(user_id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  medal TEXT,
  PRIMARY KEY (module_id, user_id)
);

-- Tabla de documentos
CREATE TABLE IF NOT EXISTS documents (
  doc_id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT REFERENCES profiles(user_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de agentes
CREATE TABLE IF NOT EXISTS agents (
  agent_id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT REFERENCES profiles(user_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  city TEXT,
  rating NUMERIC
);

-- Tabla de hogares
CREATE TABLE IF NOT EXISTS homes (
  home_id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  city TEXT,
  price NUMERIC,
  image_url TEXT,
  agent_id TEXT REFERENCES agents(agent_id)
);

-- Tabla de favoritos de usuario
CREATE TABLE IF NOT EXISTS user_favorites (
  user_id TEXT REFERENCES profiles(user_id) ON DELETE CASCADE,
  home_id TEXT REFERENCES homes(home_id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, home_id)
);

-- Trigger para actualizar updated_at en profiles
CREATE OR REPLACE FUNCTION update_profiles_timestamps()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_timestamp ON profiles CASCADE;
CREATE TRIGGER update_profiles_timestamp
BEFORE INSERT OR UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_profiles_timestamps();

-- Índices de ayuda
CREATE INDEX IF NOT EXISTS idx_savings_goals_user_id ON savings_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_educational_progress_user_id ON educational_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_agents_user_id ON agents(user_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON user_favorites(user_id);

-- NOTA: En este esquema no se habilita RLS porque MiKasApp aún no usa Supabase Auth en el frontend.
-- Si más adelante integras Auth, agrega políticas con auth.uid() y habilita RLS.
