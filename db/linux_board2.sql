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
-- Table structure for table `board2`
--

DROP TABLE IF EXISTS `board2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `board2` (
  `post_no` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) DEFAULT NULL,
  `written_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `post_title` varchar(45) DEFAULT NULL,
  `post_contents` mediumtext,
  PRIMARY KEY (`post_no`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board2`
--

LOCK TABLES `board2` WRITE;
/*!40000 ALTER TABLE `board2` DISABLE KEYS */;
INSERT INTO `board2` VALUES (1,'shinbaram','2018-02-04 15:10:49','The first post - title','Web Project<br><br>카페제작<br>- 카페 시작 페이지<br>    - 회원가입<br>    - 회원 탈퇴<br>    - 현재 접속중인 회원<br>    - login / logout<br>- login 성공하면 main page로<br>    - 왼쪽에는 navi<br>    - 위쪽에 로그인, 아웃<br>    - 그 밑에 배너<br>    - 게시판별 최신글<br>    - 인기글<br>- 게시판<br>    - 글쓰기<br>        - 글저장<br>    - 게시판 종류 설정<br>    - 글제목<br>    - 글 내용<br>    - 이미지 첨부 기능<br>    - 글 읽기<br>    - 글 검색<br>- 전체 게시판 글 검색<br><br>- session storage<br>- main에서 login, out<br>- 회원 탈퇴<br>- 게시판 부분<br><br><br>=E2/86400 + 365*70 + 19 + 9/24<br>셀타입 = 날짜<br>중복데이터, 긴아이디 제거<br>글번호'),(2,'shinbaram','2018-02-14 22:31:02','2222','22222'),(3,'shinbaram','2018-02-17 19:46:26','board2 - third post','board2 - third post\nboard2 - third post\nboard2 - third post\nboard2 - third post'),(4,'shinbaram','2018-02-17 19:48:35','4','4'),(5,'shinbaram','2018-02-17 19:52:55','5','5'),(6,'shinbaram','2018-02-17 22:11:55','6','6'),(7,'shinbaram','2018-02-17 22:15:20','7','7'),(8,'shinbaram','2018-02-17 22:15:43','8','8'),(10,'shinbaram','2018-03-06 20:38:18','리눅스햌','해커스');
/*!40000 ALTER TABLE `board2` ENABLE KEYS */;
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
