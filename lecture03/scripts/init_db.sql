DROP TABLE IF EXISTS is_genre;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS companies;


CREATE TABLE companies (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    country TEXT NOT NULL
);

CREATE TABLE genres (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE games (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    year INTEGER,
    publisher INTEGER,
    developer INTEGER,
    FOREIGN KEY(publisher) REFERENCES companies(id),
    FOREIGN KEY(developer) REFERENCES companies(id)
);

CREATE TABLE is_genre (
    game INTEGER NOT NULL,
    genre INTEGER NOT NULL,
    FOREIGN KEY(game) REFERENCES games(id),
    FOREIGN KEY(genre) REFERENCES genres(id)
);