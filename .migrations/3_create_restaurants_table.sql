create table restaurants (
    id text primary key,
    name varchar(400) not null,
    description varchar(400) not null,
    avatar_url varchar(3000),
    city_id text not null references cities(id),
    endereco varchar(400) not null,
    created_at timestamp not null default current_timestamp,
    constraint restaurants_unique_name_city unique (name, city_id)
);

