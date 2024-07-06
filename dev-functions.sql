-- Delete albums.
DELETE FROM album_genre; ALTER TABLE album_genre AUTO_INCREMENT = 1; DELETE FROM album; ALTER TABLE album AUTO_INCREMENT = 1;

-- Delete books.
DELETE FROM book_genre; ALTER TABLE book_genre AUTO_INCREMENT = 1; DELETE FROM book; ALTER TABLE book AUTO_INCREMENT = 1;

-- Delete movies.
DELETE FROM movie_genre; ALTER TABLE movie_genre AUTO_INCREMENT = 1; DELETE FROM movie; ALTER TABLE movie AUTO_INCREMENT = 1;

-- Delete games.
DELETE FROM game_genre; ALTER TABLE game_genre AUTO_INCREMENT = 1; DELETE FROM game; ALTER TABLE game AUTO_INCREMENT = 1;
