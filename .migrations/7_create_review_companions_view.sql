create or replace view v_reviews_companions as ( select
	rev.review_id,
	rev.user_id,
	u.avatar_url,
	u."name" as companion_name
from
	review_companions rev
join users u on
	rev.user_id = u.id);