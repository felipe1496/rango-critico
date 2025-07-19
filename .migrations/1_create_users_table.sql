create table users (
    id text primary key,
    name varchar(200) not null,
    email varchar(400) not null unique,
    avatar_url varchar(4000),
    created_at timestamp not null default current_timestamp
);