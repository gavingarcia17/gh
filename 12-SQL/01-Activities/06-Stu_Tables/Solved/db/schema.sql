DROP DATABASE IF EXISTS books_db;
-- Creates the "books_db" database --
CREATE DATABASE books_db;

-- Use the books_db --
USE books_db;

-- Creates the table "biographies" within books_db --
CREATE TABLE biographies (
  -- Creates a numeric column called "id" --
  id INT,
  -- Makes a string column called "name" --
  name VARCHAR(100)
);
