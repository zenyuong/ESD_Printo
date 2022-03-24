-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 14, 2019 at 06:42 AM
-- Server version: 5.7.19
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `provider`
--
CREATE DATABASE IF NOT EXISTS `provider` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `provider`;

-- --------------------------------------------------------

--
-- Table structure for table `provider`
--

DROP TABLE IF EXISTS `provider`;
CREATE TABLE IF NOT EXISTS `provider` (
  `provider_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `tele_id` varchar(64) NOT NULL,
  `coordinates` varchar(64) NOT NULL,
  `location_name` varchar(64) NOT NULL,
  PRIMARY KEY (`provider_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `provider`
--

INSERT INTO `provider` (`provider_id`, `username`, `tele_id`, `coordinates`,`location_name`) VALUES
('1', 'arthur', '@arthur', '550', 'smu'),
('2', 'julian', '@julian', '550', 'bedok'),
('3', 'joseph', '@joseph', '550', 'bencoolen');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
