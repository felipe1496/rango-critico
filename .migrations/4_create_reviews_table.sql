create table reviews (
    id text primary key,
    content varchar(5000) not null,
    restaurant_id text references restaurants(id) not null,
    user_id text references users(id) not null,
    rating numeric(2, 1) not null,
    updated_at timestamp not null default current_timestamp,
    created_at timestamp not null default current_timestamp
);