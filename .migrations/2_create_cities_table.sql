create table cities (
    id text primary key,
    name varchar(400) not null,
    state varchar(400) not null,
    created_at timestamp not null default current_timestamp,
    constraint cities_unique_name_state unique (name, state)
)