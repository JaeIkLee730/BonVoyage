-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: BonVoyage
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `board1`
--

DROP TABLE IF EXISTS `board1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `board1` (
  `post_no` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) DEFAULT NULL,
  `written_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `post_title` varchar(45) DEFAULT NULL,
  `post_contents` mediumtext,
  PRIMARY KEY (`post_no`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board1`
--

LOCK TABLES `board1` WRITE;
/*!40000 ALTER TABLE `board1` DISABLE KEYS */;
INSERT INTO `board1` VALUES (3,'elephant','2018-01-30 18:12:24','the seventh post title','asdfasdfasdfasdfsadfa\nsdfsadfsadfsad   fasdfa\nsdfasdfsad   fasdfasf\nasdfasdas  dfasdfsadfdasfasdfasdf'),(4,'rainfall','2018-01-30 12:01:11','The fourth post - title','The fourth post-contents'),(5,'shinbaram','2018-01-30 13:34:48','The fitfh post - title','Web Project<br/><br/>카페제작<br/>- 카페 시작 페이지<br/>    - 회원가입<br/>    - 회원 탈퇴<br/>    - 현재 접속중인 회원<br/>    - login / logout<br/>- login 성공하면 main page로<br/>    - 왼쪽에는 navi<br/>    - 위쪽에 로그인, 아웃<br/>    - 그 밑에 배너<br/>    - 게시판별 최신카페<br/>    - 인기카페<br/>- 게시판<br/>    - 카페쓰기<br/>        - 카페저장<br/>    - 게시판 종류 설정<br/>    - 카페제목<br/>    - 카페 내용<br/>    - 이미지 첨부 기능<br/>    - 카페 읽기<br/>    - 카페 검색<br/>- 전체 게시판 카페 검색<br/><br/>- session storage<br/>- main에서 login, out<br/>- 회원 탈퇴<br/>- 게시판 부분<br/><br/><br/>=E2/86400 + 365*70 + 19 + 9/24<br/>셀타입 = 날짜<br/>중복데이터, 긴아이디 제거<br/>카페번호'),(6,'angela','2018-01-30 15:56:36','the sixth post title','asdfasdfasdfasdfsadfasdfsadfsadfsadfasdfasdfasdfsadfasdfasfasdfasdasdfasdfsadfdasfasdfasdf'),(7,'angela','2018-01-30 15:57:15','the seventh post title','asdfasdfasdfasdfsadfasdfsadfsadfsad   fasdfasdfasdfsad   fasdfasfasdfasdas  dfasdfsadfdasfasdfasdf'),(8,'angela','2018-01-30 15:57:53','the seventh post title','asdfasdfasdfasdfsadfa\nsdfsadfsadfsad   fasdfa\nsdfasdfsad   fasdfasf\nasdfasdas  dfasdfsadfdasfasdfasdf'),(9,'shinbaram','2018-02-03 17:10:07','asdfsadf','asdfsadfasdfasdfasdf'),(10,'aaaaa','2018-01-30 18:21:17','hguuj','jjjmumu'),(12,'rainfall','2018-02-01 21:19:34','sadfasfdasd','asdfasdfasdfsad\nasdfsa\nasdfsa\ndfasf\nas\nfasfasdfsadfasdfds'),(14,'rainfall','2018-02-01 21:27:40','Ahh ssi wae ahn doi bbak chi ge','Ahh ssi wae ahn doi bbak chi geAhh ssi wae ahn doi bbak chi ge\nAhh ssi wae ahn doi bbak chi ge\nAhh ssi wae ahn doi bbak chi ge\nAhh ssi wae ahn doi bbak chi ge\n'),(16,'muho','2018-02-02 00:33:57','asdasdf','asdfsdafasdfasdf'),(17,'muho','2018-02-02 00:34:15','aaaaa','asa'),(19,'ylm3333','2018-02-03 23:39:20','aaaaaaa','aaaaaaaaaaaaa'),(20,'ghlee56','2018-02-03 23:43:20','dfghjkl','asdfgh'),(22,'angela','2018-02-15 15:08:57','angela\'s post--22','angela\'s post - contents !!!!!!'),(23,'mozzi','2018-02-10 20:01:10','₩~~~~오잉오잉~~~~','오잉오잉오잉'),(24,'shinbaram','2018-02-14 22:07:34','22222','222222222222222');
/*!40000 ALTER TABLE `board1` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-19 22:25:26
