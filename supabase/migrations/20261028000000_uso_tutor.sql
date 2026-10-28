-- KUBI · Control de gasto del tutor IA (28-10-2026)
-- Solo la función del servidor (service_role) puede leer o escribir estas tablas.
-- La app no guarda aquí el contenido de los ejercicios ni datos del estudiante: solo conteos y costo.

create table if not exists public.uso_tutor_mes (
  mes text primary key check (mes ~ '^\d{4}-\d{2}$'),
  solicitudes integer not null default 0,
  costo_usd numeric(10, 5) not null default 0
);

create table if not exists public.uso_tutor_dia (
  estudiante_id uuid not null references auth.users (id) on delete cascade,
  dia date not null,
  solicitudes integer not null default 0,
  primary key (estudiante_id, dia)
);

alter table public.uso_tutor_mes enable row level security;
alter table public.uso_tutor_dia enable row level security;
-- Sin políticas: anon y authenticated no tienen acceso.

-- Reserva atómica: comprueba el tope mensual y el diario por estudiante, y suma la reserva.
create or replace function public.reservar_tutor(
  p_estudiante uuid,
  p_reserva numeric,
  p_tope_mes numeric,
  p_max_dia integer
) returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_mes text := to_char(now() at time zone 'America/Santiago', 'YYYY-MM');
  v_dia date := (now() at time zone 'America/Santiago')::date;
  v_costo numeric;
  v_hoy integer;
begin
  insert into public.uso_tutor_mes (mes) values (v_mes) on conflict (mes) do nothing;
  select costo_usd into v_costo from public.uso_tutor_mes where mes = v_mes for update;
  if v_costo + p_reserva > p_tope_mes then
    return 'tope_mensual';
  end if;

  insert into public.uso_tutor_dia (estudiante_id, dia) values (p_estudiante, v_dia)
    on conflict (estudiante_id, dia) do nothing;
  select solicitudes into v_hoy from public.uso_tutor_dia
    where estudiante_id = p_estudiante and dia = v_dia for update;
  if v_hoy >= p_max_dia then
    return 'tope_diario';
  end if;

  update public.uso_tutor_dia set solicitudes = solicitudes + 1
    where estudiante_id = p_estudiante and dia = v_dia;
  update public.uso_tutor_mes set solicitudes = solicitudes + 1, costo_usd = costo_usd + p_reserva
    where mes = v_mes;
  return 'ok';
end;
$$;

-- Ajusta la reserva al costo real (puede ser negativo) una vez terminada la llamada.
create or replace function public.ajustar_costo_tutor(p_delta numeric) returns void
language sql
security definer
set search_path = ''
as $$
  update public.uso_tutor_mes
    set costo_usd = greatest(0, costo_usd + p_delta)
    where mes = to_char(now() at time zone 'America/Santiago', 'YYYY-MM');
$$;

revoke all on function public.reservar_tutor(uuid, numeric, numeric, integer) from public, anon, authenticated;
revoke all on function public.ajustar_costo_tutor(numeric) from public, anon, authenticated;
grant execute on function public.reservar_tutor(uuid, numeric, numeric, integer) to service_role;
grant execute on function public.ajustar_costo_tutor(numeric) to service_role;
