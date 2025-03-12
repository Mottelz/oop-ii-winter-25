-- Insert dummy companies
INSERT INTO companies (name, country) VALUES
    ('Nintendo', 'Japan'),
    ('Sony Interactive Entertainment', 'Japan'),
    ('Microsoft', 'USA'),
    ('Ubisoft', 'France'),
    ('Electronic Arts', 'USA');

-- Insert dummy genres
INSERT INTO genres (name) VALUES
    ('Action'),
    ('Adventure'),
    ('RPG'),
    ('Strategy'),
    ('Sports');

-- Insert dummy games
INSERT INTO games (name, year, publisher, developer) VALUES
    ('The Legend of Zelda', 1986, 1, 1),
    ('Halo: Combat Evolved', 2001, 3, 3),
    ('Assassin''s Creed', 2007, 4, 4),
    ('FIFA 22', 2021, 5, 5),
    ('Final Fantasy VII', 1997, 2, 2),
    ('The Witcher 3', 2015, 2, 2),
    ('Dark Souls', 2011, 2, 2);

-- Insert dummy game-genre relationships
INSERT INTO is_genre (game, genre) VALUES
    (1, 2), -- The Legend of Zelda (Adventure)
    (1, 3), -- The Legend of Zelda (RPG)
    (2, 1), -- Halo: Combat Evolved (Action)
    (3, 1), -- Assassin's Creed (Action)
    (3, 2), -- Assassin's Creed (Adventure)
    (4, 5), -- FIFA 22 (Sports)
    (5, 3), -- Final Fantasy VII (RPG)
    (6, 2), -- The Witcher 3 (Adventure)
    (6, 3), -- The Witcher 3 (RPG)
    (6, 4), -- The Witcher 3 (Strategy)
    (7, 1), -- Dark Souls (Action)
    (7, 3); -- Dark Souls (RPG)
