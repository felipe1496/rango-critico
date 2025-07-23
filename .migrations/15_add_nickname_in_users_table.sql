alter table users add column nickname varchar(32) unique;

update users set nickname = substr(md5(random()::text || clock_timestamp()::text), 1, 10) where nickname is null;

alter table users alter column nickname set not null;