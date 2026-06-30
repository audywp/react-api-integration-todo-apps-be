-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query)

create table if not exists todos (
  id bigint generated always as identity primary key,
  title text not null,
  description text,
  is_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Optional: auto-update the updated_at column on row updates
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_set_updated_at on todos;
create trigger trg_set_updated_at
before update on todos
for each row execute function set_updated_at();
