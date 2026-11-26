CREATE DATABASE IF NOT EXISTS pw3_api
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE pw3_api;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nome, email) VALUES
  ('Ana Souza', 'ana@email.com'),
  ('Bruno Lima', 'bruno@email.com'),
  ('Carla Mendes', 'carla@email.com');
