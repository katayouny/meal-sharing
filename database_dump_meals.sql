CREATE DATABASE  IF NOT EXISTS `meals_sharing_db`;
USE `meals_sharing_db`;
--
-- Table structure for table `meals`
--

DROP TABLE IF EXISTS `meal`;
CREATE TABLE `meal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `max_reservations` int(45) NOT NULL,

  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6;

--
-- Dumping data for table `meals`
--

LOCK TABLES `meal` WRITE;
/*!40000 ALTER TABLE `meals` DISABLE KEYS */;
INSERT INTO `meal` VALUES (1,'something 1',3),(2,'something 2',3),(3,'samething 3',7),(4,'something 4',10),(5,'something 5',1);
/*!40000 ALTER TABLE `meals` ENABLE KEYS */;
UNLOCK TABLES;
