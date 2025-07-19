create table review_tags (
    id text primary key,
    review_id text not null references reviews(id) on delete cascade,
    tag varchar(100) not null,
    created_at timestamp not null default current_timestamp
);