-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(10) NOT NULL AUTO_INCREMENT,
  `uname` varchar(20) CHARACTER SET utf8 NOT NULL,
  `pwd` varchar(20) CHARACTER SET utf8 NOT NULL,
  `isAdmin` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for `type`
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `tname` varchar(20) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`tid`),
  UNIQUE KEY `tname` (`tname`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

create table taskInfo(
    uid int,
    tid int,
    skid int primary key auto_increment,
    title varchar(100),
    price decimal(10,2),
    num int,
    pic varchar(1000)
);
alter table taskInfo add foreign key(uid) references user(uid);
alter table taskInfo add foreign key(tid) references type(tid);
alter table taskInfo auto_increment=1;