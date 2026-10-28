-- KUBI · Progreso por estudiante (versión 2 de la propuesta, 28-10-2026)
-- PROPUESTA. NO APLICADA. Revisar y aprobar antes de ejecutar en cualquier proyecto remoto.
-- No elimina ni modifica tablas existentes: solo crea tablas nuevas si no existen.
--
-- Cuentas: inicio de sesión anónimo de Supabase. El estudiante solo elige un apodo;
-- no se guarda nombre, correo, RUT, fecha de nacimiento ni colegio.

create table if not exists public.perfiles_estudiante (
  id uuid primary key references auth.users (id) on delete cascade,
  alias text check (alias is null or char_length(alias) between 2 and 16),
  curso text check (curso is null or curso in ('7b', '8b', '1m', '2m', '3m', '4m')),
  xp_total integer not null default 0 check (xp_total >= 0),
  racha_actual smallint not null default 0 check (racha_actual >= 0),
  racha_mejor smallint not null default 0 check (racha_mejor >= 0),
  ultimo_dia date,
  -- id del logro → día en que se obtuvo, por ejemplo {"primera-mision": "2026-10-28"}
  logros jsonb not null default '{}'::jsonb check (jsonb_typeof(logros) = 'object'),
  creado_en timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);

-- Una fila por misión jugada (incluida la práctica PAES, mision_id = 'practica-paes').
create table if not exists public.progreso_mision (
  estudiante_id uuid not null references public.perfiles_estudiante (id) on delete cascade,
  mision_id text not null check (char_length(mision_id) between 1 and 40),
  completada boolean not null default false,
  mejor_correctas smallint not null default 0 check (mejor_correctas >= 0),
  intentos integer not null default 0 check (intentos >= 0),
  actualizado_en timestamptz not null default now(),
  primary key (estudiante_id, mision_id)
);

-- Seguridad por fila: cada estudiante solo ve y escribe lo suyo.
alter table public.perfiles_estudiante enable row level security;
alter table public.progreso_mision enable row level security;

create policy "perfil propio: leer" on public.perfiles_estudiante
  for select to authenticated using ((select auth.uid()) = id);
create policy "perfil propio: crear" on public.perfiles_estudiante
  for insert to authenticated with check ((select auth.uid()) = id);
create policy "perfil propio: actualizar" on public.perfiles_estudiante
  for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy "progreso propio: leer" on public.progreso_mision
  for select to authenticated using ((select auth.uid()) = estudiante_id);
create policy "progreso propio: crear" on public.progreso_mision
  for insert to authenticated with check ((select auth.uid()) = estudiante_id);
create policy "progreso propio: actualizar" on public.progreso_mision
  for update to authenticated using ((select auth.uid()) = estudiante_id) with check ((select auth.uid()) = estudiante_id);
-- Sin políticas de borrado: la app no borra progreso.
