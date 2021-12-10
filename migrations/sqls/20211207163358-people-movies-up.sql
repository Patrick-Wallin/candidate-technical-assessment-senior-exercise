CREATE TABLE people (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    UNIQUE (name)
);

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    UNIQUE (name)
);

CREATE TABLE people_movies (
    id SERIAL PRIMARY KEY,
    person_id int REFERENCES people(id) ON DELETE CASCADE ON UPDATE NO ACTION,
    movie_id int REFERENCES movies(id) ON DELETE CASCADE ON UPDATE NO ACTION,
    UNIQUE(person_id, movie_id)
);
