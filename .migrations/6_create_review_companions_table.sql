create table review_companions (
	id text primary key,
	review_id text not null references reviews(id) on delete cascade,
	user_id text not null references users(id),
	created_at timestamp not null default current_timestamp,
	constraint review_companions_unique_review_id_user_id unique (review_id, user_id)
);
