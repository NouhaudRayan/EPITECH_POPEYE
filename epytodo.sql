CREATE DATABASE IF NOT EXISTS epytodo COLLATE 'utf8_unicode_ci';
USE epytodo;

CREATE TABLE IF NOT EXISTS `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS `todo` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `due_time` datetime NOT NULL,
  `status` ENUM ('not started','todo','in progress','done')DEFAULT 'not started',
  `user_id` int(10) UNSIGNED DEFAULT NULL
);