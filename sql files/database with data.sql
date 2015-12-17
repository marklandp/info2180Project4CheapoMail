-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2015 at 05:07 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `cheapo`
--
CREATE DATABASE IF NOT EXISTS `cheapo` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `cheapo`;

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `body` varchar(200) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `recipient_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `body`, `subject`, `user_id`, `recipient_id`) VALUES
(1, '''sup nerds?', 'heller', 3, 5),
(2, '''sup nerds?', 'heller', 3, 4),
(3, '''sup nerds?', 'heller', 3, 1),
(4, 'hey mpayne, good to hear from u. What''s up with you other guys?', 'fellas', 4, 3),
(5, 'hey mpayne, good to hear from u. What''s up with you other guys?', 'fellas', 4, 1),
(6, 'hey mpayne, good to hear from u. What''s up with you other guys?', 'fellas', 4, 5),
(7, 'well ma niggaz, end of semester. What shall we do? wna hack the cia?', 'yo', 1, 3),
(8, 'well ma niggaz, end of semester. What shall we do? wna hack the cia?', 'yo', 1, 3),
(9, 'well ma niggaz, end of semester. What shall we do? wna hack the cia?', 'yo', 1, 5),
(10, 'well ma niggaz, end of semester. What shall we do? wna hack the cia?', 'yo', 1, 4),
(11, 'yes!!!! we really should!', 'yes!', 3, 1),
(12, 'yes!!!! we really should!', 'yes!', 3, 5),
(13, 'yes!!!! we really should!', 'yes!', 3, 4),
(14, 'are you done with the cheapo mail assignment yet?', 'yo', 1, 3),
(15, 'who taught you web?', 'one question', 1, 3),
(16, 'david bain', 'who taught me web', 3, 1),
(17, 'do you guys like the transitions i added?', 'transitions', 3, 1),
(18, 'do you guys like the transitions i added?', 'transitions', 3, 5),
(19, 'do you guys like the transitions i added?', 'transitions', 3, 4),
(20, 'yes I love the transitions mpayne! i''m in for hacking the cia!', 'replies', 4, 1),
(21, 'yes I love the transitions mpayne! i''m in for hacking the cia!', 'replies', 4, 5),
(22, 'yes I love the transitions mpayne! i''m in for hacking the cia!', 'replies', 4, 3),
(23, 'I''ll start getting some intel to start our "project"', 'research', 4, 3),
(24, 'I''ll start getting some intel to start our "project"', 'research', 4, 1),
(25, 'I''ll start getting some intel to start our "project"', 'research', 4, 5);

-- --------------------------------------------------------

--
-- Table structure for table `message_read`
--

DROP TABLE IF EXISTS `message_read`;
CREATE TABLE IF NOT EXISTS `message_read` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message_id` int(11) NOT NULL,
  `reader_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

--
-- Dumping data for table `message_read`
--

INSERT INTO `message_read` (`id`, `message_id`, `reader_id`, `date`) VALUES
(1, 3, 1, '2015-12-16 21:15:20'),
(2, 5, 1, '2015-12-16 21:15:38'),
(3, 3, 1, '2015-12-16 21:21:00'),
(4, 2, 4, '2015-12-16 21:38:02'),
(5, 4, 3, '2015-12-16 22:00:18'),
(6, 7, 3, '2015-12-16 23:02:42'),
(7, 8, 3, '2015-12-16 23:02:45'),
(8, 11, 1, '2015-12-16 23:05:36'),
(9, 14, 3, '2015-12-17 01:58:45'),
(10, 15, 3, '2015-12-17 01:58:52'),
(11, 16, 1, '2015-12-17 02:30:32'),
(12, 10, 4, '2015-12-17 03:34:17'),
(13, 13, 4, '2015-12-17 03:34:36'),
(14, 19, 4, '2015-12-17 03:34:51'),
(15, 17, 1, '2015-12-17 03:46:32'),
(16, 20, 1, '2015-12-17 03:46:37'),
(17, 24, 1, '2015-12-17 03:46:46'),
(18, 22, 3, '2015-12-17 04:00:38'),
(19, 23, 3, '2015-12-17 04:00:47');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(40) NOT NULL DEFAULT '''''',
  `lastname` varchar(40) NOT NULL DEFAULT '''''',
  `username` varchar(50) NOT NULL,
  `pword` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `username`, `pword`) VALUES
(1, 'Cheapo', 'Admin', 'admin', 'cheapAd'),
(3, 'Markland', 'Payne', 'mpayne', 'mpayne'),
(4, 'Chris', 'Query', 'cquery', 'cquery'),
(5, 'John', 'Terry', 'jterry', 'jterry');
