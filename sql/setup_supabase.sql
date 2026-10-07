-- Configuración de tablas y RLS para Supabase
-- Extensiones necesarias
create extension if not exists "pgcrypto";

-- Tabla de perfiles (usuarios)
create table if not exists profiles (
  user_id uuid primary key,
  full_name text not null,
  itin text
);

-- Tabla de metas de ahorro
create table if not exists savings_goals (
  goal_id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(user_id) on delete cascade,
  name text not null,
  target_amount numeric not null,
  saved_amount numeric not null default 0
);

-- Tabla de progreso educativo (con medallas)
create table if not exists educational_progress (
  module_id text not null,
  user_id uuid references profiles(user_id) on delete cascade,
  completed boolean not null default false,
  medal text,
  primary key (module_id, user_id)
);

-- Tabla de documentos
create table if not exists documents (
  doc_id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(user_id) on delete cascade,
  title text not null,
  url text not null,
  uploaded_at timestamptz default now()
);

-- Nuevas tablas para ejemplos de lista de viviendas y agentes
create table if not exists agents (
  agent_id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(user_id) on delete cascade,
  name text not null,
  city text,
  rating numeric
);

create table if not exists homes (
  home_id uuid primary key default gen_random_uuid(),
  title text not null,
  city text,
  price numeric,
  image_url text,
  agent_id uuid references agents(agent_id)
);

create table if not exists user_favorites (
  user_id uuid references profiles(user_id) on delete cascade,
  home_id uuid references homes(home_id) on delete cascade,
  primary key (user_id, home_id)
);

-- Habilitar RLS
alter table profiles enable row level security;
alter table savings_goals enable row level security;
alter table educational_progress enable row level security;
alter table documents enable row level security;

-- Políticas basadas en auth.uid()
create policy "owner can view profile" on profiles for select using (auth.uid() = user_id);
create policy "owner can modify profile" on profiles for update using (auth.uid() = user_id);
create policy "owner can insert profile" on profiles for insert with check (auth.uid() = user_id);

create policy "owner can manage savings" on savings_goals for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "owner can manage savings insert" on savings_goals for insert with check (auth.uid() = user_id);

create policy "owner can access education" on educational_progress for all using (auth.uid() = user_id);
create policy "owner can access documents" on documents for all using (auth.uid() = user_id);
