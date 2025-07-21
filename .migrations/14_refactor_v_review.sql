DROP VIEW v_reviews;

CREATE OR REPLACE VIEW v_reviews
AS SELECT rev.id,
    rev.content,
    rev.rating,
    rev.user_id,
    rev.updated_at,
    rev.created_at,
    rev.visited_at,
    res.id as restaurant_id,
    res.name as restaurant_name,
    res.description as restaurant_description,
    res.avatar_url as restaurant_avatar_url,
    c.id as city_id,
    c.name AS city_name,
    c.state as city_state
   FROM reviews rev
     JOIN restaurants res ON rev.restaurant_id = res.id
     JOIN cities c ON rev.city_id = c.id;