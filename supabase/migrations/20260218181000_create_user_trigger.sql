-- Create a function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, role, created_at, updated_at)
  values (
    new.id,
    new.email,
    'ATHLETE',
    now(),
    now()
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create a trigger that calls the function on user creation
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
