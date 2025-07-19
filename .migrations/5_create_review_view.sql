create or replace view v_reviews as (select
	rev.id,
	res.name as restaurant_name,
	rev.content,
	rev.rating,
	res.avatar_url as restaurant_avatar_url,
	res.endereco,
	rev.user_id,
	c.name as city_name,
	c.state,
	rev.updated_at,
	rev.created_at
from
	"reviews" rev
join "restaurants" res on
	rev.restaurant_id = res.id
join cities c on
	res.city_id = c.id);