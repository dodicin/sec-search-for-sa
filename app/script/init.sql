CREATE TABLE IF NOT EXISTS articles (
    id int,
	title text NOT NULL,
	author text NULL,
	description text NULL,
	PRIMARY KEY(id)
);