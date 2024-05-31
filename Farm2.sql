-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 24, 2024 at 01:50 PM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Farm2`
--

-- --------------------------------------------------------

--
-- Table structure for table `Farmer`
--
-- Creation: Apr 25, 2024 at 09:12 PM
--

CREATE TABLE `Farmer` (
  `farmer_id` int(11) NOT NULL,
  `farmer_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Farmer`
--

INSERT INTO `Farmer` (`farmer_id`, `farmer_name`, `email`, `password`) VALUES
(1, 'fatih balta', 'fatih_balta@yahoo.com', '$2a$10$y712jw62EI/sfs4R9zyEvuWRgY/D3DGhbh5p11KaOS5vvSp/QsHAu'),
(2, 'kaanbalta', 'kaanbalta57@gmail.com', '$2a$10$XRsQj.KQ47Tinqd5Q5Tmiebttn1QM.ezfyB/BNx3EMtREet80vtmq'),
(3, 'Cansu', 'cansubalta57@gmail.com', '$2a$10$3/3t73SV9QUNPK.FHHaYIOzMFr.qRG.Mp8gVw5X8lhpQx1R./5mzW'),
(4, 'yildirim', 'yildirim@eta.com', '$2a$10$2aU0cPd0tCe4dypCS9/R.O6Cj0CgtDhSdtPEG4/y90nGb.vG/ugeO'),
(5,'ahmet cuneyd tantug','tantug@itu.edu.tr','$2a$10$XRsQj.KQ47Tinqd5Q5Tmiebttn1QM.ezfyB/BNx3EMtREet80vtmq');

-- --------------------------------------------------------

--
-- Table structure for table `livestock_rasyon`
--
-- Creation: Apr 27, 2024 at 08:26 PM
--

CREATE TABLE `livestock_rasyon` (
  `id` int(11) NOT NULL,
  `eartag` varchar(255) DEFAULT NULL,
  `rasyon_id` int(11) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `livestock_rasyon`
--

INSERT INTO `livestock_rasyon` (`id`, `eartag`, `rasyon_id`, `start_date`, `end_date`) VALUES
(1, '6944', 1, '2024-01-27', '2024-05-04'),
(3, 'TR032728275', 1, '2024-04-27', NULL),
(4, 'TR032854736', 1, '2024-04-27', NULL),
(5, 'TR032924901', 1, '2024-04-27', NULL),
(6, 'TR032942821', 1, '2024-04-27', NULL),
(7, 'TR033070508', 1, '2024-04-27', NULL),
(8, 'TR171429180', 1, '2024-04-27', NULL),
(9, 'TR171429192', 1, '2024-04-26', NULL),
(10, 'TR171429233', 1, '2024-04-27', NULL),
(11, 'TR171429234', 1, '2024-04-27', NULL),
(12, 'TR171429421', 1, '2024-04-27', NULL),
(13, 'TR431473974', 1, '2024-04-27', NULL),
(14, 'TR64974809', 1, '2024-04-27', NULL),
(15, 'TR64975856', 1, '2024-04-27', NULL),
(16, 'TR64976385', 1, '2024-04-27', NULL),
(17, 'TR64980287', 1, '2024-04-27', NULL),
(18, '9490', 1, '2024-04-26', NULL),
(20, '6866', 1, '2024-05-01', NULL),
(22, '6944', 2, '2024-05-04', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `live_stock`
--
-- Creation: May 04, 2024 at 10:43 AM
--

CREATE TABLE `live_stock` (
  `eartag` varchar(255) NOT NULL,
  `farmer_id` int(11) DEFAULT NULL,
  `race` varchar(255) NOT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `room` int(11) NOT NULL,
  `cost` float DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `feed_cost` decimal(10,2) DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `live_stock`
--

INSERT INTO `live_stock` (`eartag`, `farmer_id`, `race`, `gender`, `room`, `cost`, `is_deleted`, `feed_cost`) VALUES
('2554', 1, 'angus', 1, 11, 55000, 0, '0.00'),
('6866', 1, 'angus', 1, 13, 45000, 0, '0.00'),
('6944', 1, 'angus', 1, 11, 53000, 0, '164.08'),
('9490', 1, 'angus', 1, 11, 53000, 1, '199.92'),
('TR032728275', 1, 'angus', 1, 11, 53000, 0, '194.66'),
('TR032854736', 1, 'angus', 1, 11, 53000, 0, '195.08'),
('TR032924901', 1, 'angus', 1, 11, 53000, 1, '195.96'),
('TR032942821', 1, 'angus', 1, 11, 53000, 0, '182.38'),
('TR033070508', 1, 'angus', 1, 11, 53000, 0, '202.54'),
('TR171429180', 1, 'angus', 1, 11, 53000, 0, '185.00'),
('TR171429192', 1, 'angus', 1, 11, 53000, 0, '198.60'),
('TR171429233', 1, 'angus', 1, 11, 53000, 0, '191.58'),
('TR171429234', 1, 'angus', 1, 11, 53000, 0, '199.48'),
('TR171429421', 1, 'angus', 1, 11, 53000, 0, '198.16'),
('TR431473974', 1, 'angus', 1, 11, 53000, 0, '199.04'),
('TR64974809', 1, 'angus', 1, 11, 53000, 0, '194.66'),
('TR64975856', 1, 'angus', 1, 11, 53000, 0, '198.16'),
('TR64976385', 1, 'angus', 1, 10, 53000, 0, '191.58'),
('TR64980287', 1, 'angus', 1, 11, 53000, 0, '197.28');

--
-- Triggers `live_stock`
--
DELIMITER $$
CREATE TRIGGER `after_insert_live_stock` AFTER INSERT ON `live_stock` FOR EACH ROW BEGIN
    INSERT INTO livestock_rasyon (eartag, rasyon_id, start_date, end_date) 
    VALUES (NEW.eartag, 1, CURDATE(), NULL);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `monthly_weight`
--
-- Creation: May 16, 2024 at 09:59 AM
--

CREATE TABLE `monthly_weight` (
  `record_id` int(11) NOT NULL,
  `eartag` varchar(255) DEFAULT NULL,
  `record_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `weight` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `monthly_weight`
--

INSERT INTO `monthly_weight` (`record_id`, `eartag`, `record_date`, `weight`) VALUES
(1, 'TR033070508', '2023-10-06 00:00:00', 340),
(3, 'TR171429234', '2023-10-12 00:00:00', 358),
(4, 'TR431473974', '2023-10-12 00:00:00', 329),
(5, 'TR171429192', '2023-10-12 00:00:00', 410),
(6, 'TR64975856', '2023-10-12 00:00:00', 340),
(7, 'TR171429421', '2023-10-12 00:00:00', 331),
(8, 'TR64980287', '2023-10-12 00:00:00', 309),
(9, 'TR032924901', '2023-10-12 00:00:00', 326),
(10, 'TR032854736', '2023-10-12 00:00:00', 362),
(12, 'TR032728275', '2023-10-12 00:00:00', 318),
(13, 'TR64976385', '2023-10-12 00:00:00', 335),
(14, 'TR171429233', '2023-10-12 00:00:00', 315),
(15, 'TR171429180', '2023-10-12 00:00:00', 369),
(16, 'TR032942821', '2023-10-12 00:00:00', 308),
(17, '6944', '2023-10-12 00:00:00', 337),
(18, 'TR033070508', '2023-12-22 00:00:00', 393),
(19, '9490', '2023-12-22 00:00:00', 375),
(20, 'TR171429234', '2023-12-22 00:00:00', 380),
(21, 'TR431473974', '2023-12-22 00:00:00', 396),
(22, 'TR171429192', '2023-12-22 00:00:00', 444),
(23, 'TR64975856', '2023-12-22 00:00:00', 376),
(24, 'TR171429421', '2023-12-22 00:00:00', 380),
(25, 'TR64980287', '2023-12-22 00:00:00', 360),
(26, 'TR032924901', '2023-12-22 00:00:00', 386),
(27, 'TR032854736', '2023-12-22 00:00:00', 413),
(28, 'TR64974809', '2023-12-22 00:00:00', 381),
(29, 'TR032728275', '2023-12-22 00:00:00', 360),
(30, 'TR64976385', '2023-12-22 00:00:00', 389),
(31, 'TR171429233', '2023-12-22 00:00:00', 362),
(32, 'TR171429180', '2023-12-22 00:00:00', 356),
(33, 'TR032942821', '2023-12-22 00:00:00', 344),
(34, '6944', '2023-12-22 00:00:00', 390),
(35, 'TR033070508', '2024-02-09 00:00:00', 439),
(36, '9490', '2024-02-09 00:00:00', 424),
(37, 'TR171429234', '2024-02-09 00:00:00', 425),
(38, 'TR431473974', '2024-02-09 00:00:00', 428),
(39, 'TR171429192', '2024-02-09 00:00:00', 443),
(40, 'TR64975856', '2024-02-09 00:00:00', 427),
(41, 'TR171429421', '2024-02-09 00:00:00', 426),
(42, 'TR64980287', '2024-02-09 00:00:00', 432),
(43, 'TR032924901', '2024-02-09 00:00:00', 414),
(44, 'TR032854736', '2024-02-09 00:00:00', 445),
(45, 'TR64974809', '2024-02-09 00:00:00', 413),
(46, 'TR032728275', '2024-02-09 00:00:00', 411),
(47, 'TR64976385', '2024-02-09 00:00:00', 433),
(48, 'TR171429233', '2024-02-09 00:00:00', 398),
(49, 'TR171429180', '2024-02-09 00:00:00', 397),
(50, 'TR032942821', '2024-02-09 00:00:00', 387),
(51, '6944', '2024-02-09 00:00:00', 407),
(52, 'TR033070508', '2024-03-04 00:00:00', 462),
(53, '9490', '2024-03-04 00:00:00', 456),
(54, 'TR171429234', '2024-03-04 00:00:00', 455),
(55, 'TR431473974', '2024-03-04 00:00:00', 454),
(56, 'TR171429192', '2024-03-04 00:00:00', 453),
(57, 'TR64975856', '2024-03-04 00:00:00', 452),
(58, 'TR171429421', '2024-03-04 00:00:00', 452),
(59, 'TR64980287', '2024-03-04 00:00:00', 450),
(60, 'TR032924901', '2024-03-04 00:00:00', 447),
(61, 'TR032854736', '2024-03-04 00:00:00', 445),
(62, 'TR64974809', '2024-03-05 00:00:00', 444),
(63, 'TR032728275', '2024-03-04 00:00:00', 444),
(64, 'TR64976385', '2024-03-04 00:00:00', 437),
(65, 'TR171429233', '2024-03-04 00:00:00', 437),
(66, 'TR171429180', '2024-03-04 00:00:00', 422),
(67, 'TR032942821', '2024-03-04 00:00:00', 416),
(68, '6944', '2024-03-04 00:00:00', 414),
(72, 'TR64974809', '2024-03-04 00:00:00', 340),
(73, '9490', '2023-10-10 00:00:00', 293),
(81, '9490', '2024-05-19 00:00:00', 515);

-- --------------------------------------------------------

--
-- Table structure for table `Rasyon`
--
-- Creation: Apr 27, 2024 at 08:25 PM
--

CREATE TABLE `Rasyon` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Rasyon`
--

INSERT INTO `Rasyon` (`id`, `name`, `description`) VALUES
(1, 'Ligh-rasyon', 'Starting ration for animal'),
(2, 'high-rasyon', 'Rasyon for put animal high loads of meal');

-- --------------------------------------------------------

--
-- Table structure for table `RasyonComponents`
--
-- Creation: Apr 27, 2024 at 08:25 PM
--

CREATE TABLE `RasyonComponents` (
  `id` int(11) NOT NULL,
  `rasyon_id` int(11) DEFAULT NULL,
  `component_name` varchar(255) DEFAULT NULL,
  `dm` decimal(10,2) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `RasyonComponents`
--

INSERT INTO `RasyonComponents` (`id`, `rasyon_id`, `component_name`, `dm`, `amount`, `price`) VALUES
(2, 1, 'misir silaji', '0.28', '0.00', '2.30'),
(3, 1, 'saman', '0.92', '1.50', '1.00'),
(4, 1, 'atk', '0.92', '2.15', '10.77'),
(5, 1, 'arpa', '0.90', '2.50', '8.20'),
(6, 1, 'reygras sılajo', '0.35', '8.00', '1.50'),
(7, 1, 'yonca', '0.90', '0.00', '1.00'),
(8, 1, 'yulaf', '0.90', '0.00', '0.35'),
(19, 2, 'MISIR SİLAJI', '0.28', '10.00', '2.30'),
(20, 2, 'SAMAN', '0.92', '1.50', '1.00'),
(21, 2, 'YONCA', '0.68', '0.00', '0.90'),
(22, 2, 'SOYA KÜSPESİ', '0.92', '0.00', '3.00'),
(23, 2, 'PAMUK KÜSPESİ', '0.92', '0.00', '1.40'),
(24, 2, 'BUĞDAY KEPEĞİ', '0.90', '1.00', '6.20'),
(25, 2, 'MISIR EZMESİ', '0.88', '4.00', '8.00'),
(26, 2, 'ÜRE', '1.00', '0.00', '2.50'),
(27, 2, 'SODA', '1.00', '0.01', '14.68'),
(28, 2, 'VİT MİN PREMİXİ', '1.00', '0.80', '14.68'),
(29, 1, 'BUĞDAY KEPEĞİ', '0.90', '1.25', '6.20'),
(30, 1, 'tuz', '1.00', '0.05', '4.00'),
(31, 1, 'premix-soda', '1.00', '0.05', '367.25'),
(32, 1, 'dane-misir', '0.88', '3.50', '8.00');

--
-- Triggers `RasyonComponents`
--
DELIMITER $$
CREATE TRIGGER `BeforeUpdateRasyonComponents` BEFORE UPDATE ON `RasyonComponents` FOR EACH ROW BEGIN
    IF NEW.dm <> OLD.dm OR NEW.amount <> OLD.amount OR NEW.price <> OLD.price THEN
        INSERT INTO RasyonComponentsHistory(
            rasyon_component_id, 
            old_dm, new_dm,
            old_amount, new_amount, 
            old_price, new_price,
            change_date
        )
        VALUES (
            OLD.id, 
            OLD.dm, NEW.dm,
            OLD.amount, NEW.amount, 
            OLD.price, NEW.price,
            NOW()
        );
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `rasyoncomponentshistory`
--
-- Creation: May 20, 2024 at 09:33 PM
--

CREATE TABLE `rasyoncomponentshistory` (
  `id` int(11) NOT NULL,
  `rasyon_component_id` int(11) DEFAULT NULL,
  `old_dm` decimal(10,2) DEFAULT NULL,
  `new_dm` decimal(10,2) DEFAULT NULL,
  `old_amount` decimal(10,2) DEFAULT NULL,
  `new_amount` decimal(10,2) DEFAULT NULL,
  `old_price` decimal(10,2) DEFAULT NULL,
  `new_price` decimal(10,2) DEFAULT NULL,
  `change_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rasyoncomponentshistory`
--

INSERT INTO `rasyoncomponentshistory` (`id`, `rasyon_component_id`, `old_dm`, `new_dm`, `old_amount`, `new_amount`, `old_price`, `new_price`, `change_date`) VALUES
(3, 2, '0.50', '0.28', '2.00', '2.50', '4.00', '0.49', '2024-05-04 10:47:54'),
(4, 3, '0.92', '0.92', '1.00', '0.50', '1.50', '0.35', '2024-05-04 10:48:58'),
(5, 4, '0.92', '0.92', '1.00', '0.50', '9.50', '1.66', '2024-05-04 10:53:26'),
(6, 5, '3.60', '0.90', '3.75', '10.00', '8.00', '1.70', '2024-05-04 10:54:28'),
(7, 5, '0.90', '0.90', '10.00', '10.00', '1.70', '1.60', '2024-05-04 11:08:54'),
(8, 2, '0.28', '0.28', '2.50', '10.00', '0.49', '0.49', '2024-05-04 17:42:13'),
(9, 2, '0.28', '0.28', '10.00', '10.00', '0.49', '2.30', '2024-05-04 17:42:28'),
(10, 3, '0.92', '0.92', '0.50', '1.50', '0.35', '1.00', '2024-05-04 17:42:51'),
(11, 4, '0.92', '0.92', '0.50', '2.15', '1.66', '10.77', '2024-05-04 17:43:43'),
(12, 5, '0.90', '0.90', '10.00', '3.50', '1.60', '8.20', '2024-05-04 17:44:04'),
(13, 6, '0.35', '0.35', '1.00', '10.00', '0.55', '1.50', '2024-05-04 17:44:29'),
(14, 8, '0.90', '0.90', '0.50', '0.00', '0.35', '0.35', '2024-05-04 17:44:43'),
(15, 19, '0.28', '0.28', '5.50', '10.00', '0.30', '0.30', '2024-05-04 17:45:05'),
(16, 19, '0.28', '0.28', '10.00', '10.00', '0.30', '2.30', '2024-05-04 17:45:09'),
(17, 20, '0.92', '0.92', '1.50', '1.50', '0.50', '1.50', '2024-05-04 17:45:19'),
(18, 20, '0.92', '0.92', '1.50', '1.50', '1.50', '1.00', '2024-05-04 17:45:29'),
(19, 21, '0.68', '0.68', '0.75', '0.00', '0.90', '0.90', '2024-05-04 17:45:37'),
(20, 22, '0.92', '0.92', '0.50', '0.00', '3.00', '3.00', '2024-05-04 17:45:43'),
(21, 23, '0.92', '0.92', '1.00', '0.00', '1.40', '1.40', '2024-05-04 17:45:47'),
(22, 24, '0.90', '0.90', '2.00', '1.00', '1.00', '1.00', '2024-05-04 17:46:07'),
(23, 24, '0.90', '0.90', '1.00', '1.00', '1.00', '6.20', '2024-05-04 17:46:11'),
(24, 25, '0.88', '0.88', '4.50', '4.00', '1.35', '1.35', '2024-05-04 17:47:00'),
(25, 25, '0.88', '0.88', '4.00', '4.00', '1.35', '8.00', '2024-05-04 17:47:08'),
(26, 26, '1.00', '1.00', '0.04', '0.00', '2.50', '2.50', '2024-05-04 17:47:14'),
(27, 27, '1.00', '1.00', '0.08', '0.01', '2.20', '2.20', '2024-05-04 17:47:34'),
(28, 27, '1.00', '1.00', '0.01', '0.01', '2.20', '14.68', '2024-05-04 17:47:49'),
(29, 28, '1.00', '1.00', '0.05', '0.05', '8.00', '14.68', '2024-05-04 17:48:04'),
(30, 28, '1.00', '1.00', '0.05', '0.80', '14.68', '14.68', '2024-05-04 17:48:16'),
(31, 6, '0.35', '0.35', '10.00', '8.00', '1.50', '1.50', '2024-05-04 17:52:38'),
(32, 29, '0.90', '0.90', '1.20', '1.25', '6.20', '6.20', '2024-05-04 18:33:16'),
(33, 2, '0.28', '0.28', '10.00', '0.00', '2.30', '2.30', '2024-05-04 18:35:05'),
(34, 5, '0.90', '0.90', '3.50', '2.50', '8.20', '8.20', '2024-05-04 18:35:52');

-- --------------------------------------------------------

--
-- Table structure for table `slaughter_schema`
--
-- Creation: May 20, 2024 at 12:54 PM
--

CREATE TABLE `slaughter_schema` (
  `slaughter_id` int(11) NOT NULL,
  `eartag` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `carcas_weight` decimal(10,2) DEFAULT NULL,
  `sale_price` decimal(10,2) DEFAULT NULL,
  `feed_cost` decimal(10,2) DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `slaughter_schema`
--

INSERT INTO `slaughter_schema` (`slaughter_id`, `eartag`, `date`, `carcas_weight`, `sale_price`, `feed_cost`) VALUES
(13, '9490', '2024-05-19', '250.00', '360.00', '199.92'),
(14, 'TR032924901', '2024-05-20', '225.00', '360.00', '195.96');

--
-- Triggers `slaughter_schema`
--
DELIMITER $$
CREATE TRIGGER `AfterInsertSlaughter` AFTER INSERT ON `slaughter_schema` FOR EACH ROW BEGIN
    UPDATE live_stock
    SET is_deleted = 1
    WHERE eartag = NEW.eartag;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_feed_cost_slaughter` BEFORE INSERT ON `slaughter_schema` FOR EACH ROW BEGIN
    SET NEW.feed_cost = (SELECT feed_cost FROM live_stock WHERE eartag = NEW.eartag);
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Farmer`
--
ALTER TABLE `Farmer`
  ADD PRIMARY KEY (`farmer_id`);

--
-- Indexes for table `livestock_rasyon`
--
ALTER TABLE `livestock_rasyon`
  ADD PRIMARY KEY (`id`),
  ADD KEY `eartag` (`eartag`),
  ADD KEY `rasyon_id` (`rasyon_id`);

--
-- Indexes for table `live_stock`
--
ALTER TABLE `live_stock`
  ADD PRIMARY KEY (`eartag`),
  ADD KEY `Farmer_id` (`farmer_id`);

--
-- Indexes for table `monthly_weight`
--
ALTER TABLE `monthly_weight`
  ADD PRIMARY KEY (`record_id`),
  ADD KEY `monthly_weight_ibfk_1` (`eartag`);

--
-- Indexes for table `Rasyon`
--
ALTER TABLE `Rasyon`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `RasyonComponents`
--
ALTER TABLE `RasyonComponents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rasyon_id` (`rasyon_id`);

--
-- Indexes for table `rasyoncomponentshistory`
--
ALTER TABLE `rasyoncomponentshistory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rasyoncomponentshistory_ibfk_1` (`rasyon_component_id`);

--
-- Indexes for table `slaughter_schema`
--
ALTER TABLE `slaughter_schema`
  ADD PRIMARY KEY (`slaughter_id`),
  ADD KEY `slaughter_schema_ibfk_1` (`eartag`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Farmer`
--
ALTER TABLE `Farmer`
  MODIFY `farmer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `livestock_rasyon`
--
ALTER TABLE `livestock_rasyon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `monthly_weight`
--
ALTER TABLE `monthly_weight`
  MODIFY `record_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `Rasyon`
--
ALTER TABLE `Rasyon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `RasyonComponents`
--
ALTER TABLE `RasyonComponents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `rasyoncomponentshistory`
--
ALTER TABLE `rasyoncomponentshistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `slaughter_schema`
--
ALTER TABLE `slaughter_schema`
  MODIFY `slaughter_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `livestock_rasyon`
--
ALTER TABLE `livestock_rasyon`
  ADD CONSTRAINT `livestock_rasyon_ibfk_1` FOREIGN KEY (`eartag`) REFERENCES `live_stock` (`eartag`),
  ADD CONSTRAINT `livestock_rasyon_ibfk_2` FOREIGN KEY (`rasyon_id`) REFERENCES `Rasyon` (`id`);

--
-- Constraints for table `live_stock`
--
ALTER TABLE `live_stock`
  ADD CONSTRAINT `live_stock_ibfk_1` FOREIGN KEY (`farmer_id`) REFERENCES `Farmer` (`farmer_id`);

--
-- Constraints for table `monthly_weight`
--
ALTER TABLE `monthly_weight`
  ADD CONSTRAINT `monthly_weight_ibfk_1` FOREIGN KEY (`eartag`) REFERENCES `live_stock` (`eartag`);

--
-- Constraints for table `RasyonComponents`
--
ALTER TABLE `RasyonComponents`
  ADD CONSTRAINT `rasyoncomponents_ibfk_1` FOREIGN KEY (`rasyon_id`) REFERENCES `Rasyon` (`id`);

--
-- Constraints for table `rasyoncomponentshistory`
--
ALTER TABLE `rasyoncomponentshistory`
  ADD CONSTRAINT `rasyoncomponentshistory_ibfk_1` FOREIGN KEY (`rasyon_component_id`) REFERENCES `RasyonComponents` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `slaughter_schema`
--
ALTER TABLE `slaughter_schema`
  ADD CONSTRAINT `slaughter_schema_ibfk_1` FOREIGN KEY (`eartag`) REFERENCES `live_stock` (`eartag`);

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `UpdateFeedCostDaily` ON SCHEDULE EVERY 1 DAY STARTS '2024-05-04 22:38:14' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    CALL UpdateDailyAndTotalFeedCost();
END$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
