drop view v_reviews;

create or replace view v_reviews as (select
	rev.id,
	res.name as restaurant_name,
	rev.content,
	rev.rating,
	res.avatar_url as restaurant_avatar_url,
	rev.user_id,
	c.name as city_name,
	c.state,
	rev.updated_at,
	rev.created_at,
	rev.visited_at
from
	"reviews" rev
join "restaurants" res on
	rev.restaurant_id = res.id
join cities c on
	rev.city_id = c.id);

alter table restaurants drop column endereco;