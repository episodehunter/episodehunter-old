# Welcome to the land of legacy database structure.
# This will be updated when this project reach beta stage

# Tabelldump movie
# ------------------------------------------------------------

DROP TABLE IF EXISTS `movie`;

CREATE TABLE `movie` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tmdb_id` int(7) DEFAULT NULL,
  `imdb_id` varchar(10) DEFAULT '',
  `title` varchar(255) NOT NULL,
  `orginal_title` varchar(255) NOT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `tagline` varchar(255) DEFAULT NULL,
  `runtime` int(3) DEFAULT NULL,
  `spoken_lang` varchar(255) DEFAULT NULL,
  `companies` varchar(255) DEFAULT NULL,
  `trailer` varchar(11) DEFAULT NULL,
  `release_date` varchar(10) DEFAULT NULL,
  `budget` int(10) DEFAULT NULL,
  `overview` text,
  `poster` varchar(50) DEFAULT NULL,
  `fanart` varchar(50) DEFAULT NULL,
  `last_update` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Tabelldump movie_rating
# ------------------------------------------------------------

DROP TABLE IF EXISTS `movie_rating`;

CREATE TABLE `movie_rating` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `movie_id` int(10) unsigned NOT NULL,
  `rating` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Tabelldump movie_watched
# ------------------------------------------------------------

DROP TABLE IF EXISTS `movie_watched`;

CREATE TABLE `movie_watched` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `movie_id` int(10) NOT NULL,
  `time` int(10) unsigned NOT NULL,
  `type` int(1) unsigned DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Tabelldump movie_watching
# ------------------------------------------------------------

DROP TABLE IF EXISTS `movie_watching`;

CREATE TABLE `movie_watching` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `movie_id` int(10) NOT NULL,
  `progress` int(2) DEFAULT NULL,
  `time` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Tabelldump throttle
# ------------------------------------------------------------

DROP TABLE IF EXISTS `throttle`;

CREATE TABLE `throttle` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `ip_address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `attempts` int(11) NOT NULL DEFAULT '0',
  `suspended` tinyint(1) NOT NULL DEFAULT '0',
  `banned` tinyint(1) NOT NULL DEFAULT '0',
  `last_attempt_at` timestamp NULL DEFAULT NULL,
  `suspended_at` timestamp NULL DEFAULT NULL,
  `banned_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Tabelldump tv_episode
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tv_episode`;

CREATE TABLE `tv_episode` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tvdb_id` int(10) NOT NULL DEFAULT '0',
  `serie_tvdb_id` int(7) NOT NULL DEFAULT '0',
  `serie_id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT 'TBA',
  `season` int(2) NOT NULL,
  `episode` int(3) NOT NULL,
  `first_aired` varchar(10) NOT NULL DEFAULT '',
  `overview` text CHARACTER SET utf8 NOT NULL,
  `image` varchar(50) DEFAULT '',
  `lastupdated` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `serie_id` (`serie_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# Tabelldump tv_featured
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tv_featured`;

CREATE TABLE `tv_featured` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `show_id` int(11) unsigned NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `show_id` (`show_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Tabelldump tv_follow
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tv_follow`;

CREATE TABLE `tv_follow` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned DEFAULT NULL,
  `show_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `user_id` (`user_id`,`show_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Tabelldump tv_network
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tv_network`;

CREATE TABLE `tv_network` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `network` varchar(50) DEFAULT NULL,
  `time_correction` int(2) DEFAULT '0',
  `validate` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `network` (`network`),
  KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Tabelldump tv_rating
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tv_rating`;

CREATE TABLE `tv_rating` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `show_id` int(10) unsigned NOT NULL,
  `rating` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Tabelldump tv_show
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tv_show`;

CREATE TABLE `tv_show` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tvdb_id` int(7) NOT NULL,
  `imdb_id` varchar(10) NOT NULL DEFAULT '',
  `name` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `airs_dayOfWeek` varchar(9) NOT NULL DEFAULT '',
  `airs_time` varchar(8) NOT NULL DEFAULT '',
  `first_aired` varchar(10) NOT NULL DEFAULT '',
  `genre` varchar(255) NOT NULL DEFAULT '',
  `language` varchar(2) NOT NULL DEFAULT '',
  `network` varchar(20) NOT NULL DEFAULT '',
  `overview` text CHARACTER SET utf8 NOT NULL,
  `runtime` int(3) NOT NULL DEFAULT '0',
  `status` varchar(10) NOT NULL DEFAULT 'TBA',
  `fanart` varchar(50) DEFAULT NULL,
  `poster` varchar(50) DEFAULT NULL,
  `lastupdate` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# Tabelldump tv_watched
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tv_watched`;

CREATE TABLE `tv_watched` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `serie_id` int(10) unsigned NOT NULL,
  `season` int(2) unsigned NOT NULL DEFAULT '0',
  `episode` int(3) unsigned NOT NULL DEFAULT '0',
  `time` int(10) unsigned DEFAULT '0',
  `type` int(1) unsigned DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `user_id` (`user_id`,`serie_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Tabelldump tv_watching
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tv_watching`;

CREATE TABLE `tv_watching` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `serie_id` int(10) unsigned DEFAULT NULL,
  `season` int(2) unsigned NOT NULL,
  `episode` int(3) unsigned NOT NULL,
  `progress` int(2) unsigned NOT NULL DEFAULT '0',
  `time` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Tabelldump users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `timezone` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'UTC',
  `apikey` varchar(5) COLLATE utf8_unicode_ci DEFAULT 'ak7',
  `last_login` timestamp NULL DEFAULT NULL,
  `reset_password_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `auto_follow` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `enable_just_went` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_username_unique` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


# Inserts
INSERT INTO `movie` (`id`, `tmdb_id`, `imdb_id`, `title`, `orginal_title`, `genre`, `tagline`, `runtime`, `spoken_lang`, `companies`, `trailer`, `release_date`, `budget`, `overview`, `poster`, `fanart`, `last_update`)
VALUES
  (1, 70160, 'tt1392170', 'The Hunger Games', 'The Hunger Games', '[\"Adventure\",\"Science Fiction\",\"Thriller\",\"Family\"]', 'May The Odds Be Ever In Your Favor.', 142, '[\"English\"]', '[\"Lionsgate\",\"Color Force\"]', 'fkxcftwKwfI', '2012-03-23', 75000000, 'Every year in the ruins of what was once North America, the nation of Panem forces each of its twelve districts to send a teenage boy and girl to compete in the Hunger Games.  Part twisted entertainment, part government intimidation tactic, the Hunger Games are a nationally televised event in which “Tributes” must fight with one another until one survivor remains.  Pitted against highly-trained Tributes who have prepared for these Games their entire lives, Katniss is forced to rely upon her sharp instincts as well as the mentorship of drunken former victor Haymitch Abernathy.  If she’s ever to return home to District 12, Katniss must make impossible choices in the arena that weigh survival against humanity and life against love. The world will be watching.', '504238b57b1e2.jpg', '504238b58ea27.jpg', 1362759161),
  (14, 949, 'tt0113277', 'Heat', 'Heat', '[\"Action\",\"Crime\",\"Drama\",\"Thriller\"]', 'A Los Angeles crime saga.', 170, '[\"English\",\"Espa\\u00f1ol\",\"P\\u0443\\u0441\\u0441\\u043a\\u0438\\u0439\"]', '[\"Warner Bros. Pictures\",\"Regency Enterprises\"]', 'USG0wDSdbrY', '1995-12-15', 60000000, 'Obsessive master thief McCauley leads a crack crew on various military-style heists across L.A. while equally obsessive detective Hanna tracks him. Each man recognizes and respects the other\'s ability and dedication, even as they express the willingness to kill each other, if necessary.', '504238ba89d06.jpg', '504238baa39fd.jpg', 1362759169);

INSERT INTO `tv_show` (`id`, `tvdb_id`, `imdb_id`, `name`, `airs_dayOfWeek`, `airs_time`, `first_aired`, `genre`, `language`, `network`, `overview`, `runtime`, `status`, `fanart`, `poster`, `lastupdate`)
VALUES
  (6, 79349, 'tt0773262', 'Dexter', '', '', '2006-10-01', '|Crime|Drama|Mystery|Suspense|Thriller|', 'en', 'Showtime', 'He\'s smart, he\'s good looking, and he\'s got a great sense of humor. He\'s Dexter Morgan, everyone\'s favorite serial killer. As a Miami forensics expert, he spends his days solving crimes, & nights committing them. But Dexter lives by a strict code of honor that is both his saving grace and lifelong burden. Torn between his deadly compulsion and his desire for true happiness, Dexter is a man in profound conflict with the world and himself.', 60, 'Ended', '504241a3587b9-1.jpg', '504241a2af246.jpg', 1449274722),
  (10, 121361, 'tt0944947', 'Game of Thrones', 'Sunday', '9:00 PM', '2011-04-17', '|Adventure|Drama|Fantasy|', 'en', 'HBO', 'Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night\'s Watch, is all that stands between the realms of men and the icy horrors beyond.', 60, 'Continuing', '504241d8bbe1d-1.jpg', '504241d7e6a13-2.jpg', 1449094766);

INSERT INTO `tv_episode` (`id`, `tvdb_id`, `serie_tvdb_id`, `serie_id`, `name`, `season`, `episode`, `first_aired`, `overview`, `image`, `lastupdated`)
VALUES
  (790, 3254641, 121361, 10, 'Winter Is Coming', 1, 1, '2011-04-17', 'Ned Stark, Lord of Winterfell learns that his mentor, Jon Arryn, has died and that King Robert is on his way north to offer Ned Arryns position as the Kings Hand. Across the Narrow Sea in Pentos, Viserys Targaryen plans to wed his sister Daenerys to the nomadic Dothraki warrior leader, Khal Drogo to forge an alliance to take the throne.', '', 1433646412),
  (791, 3436411, 121361, 10, 'The Kingsroad', 1, 2, '2011-04-24', 'Having agreed to become the Kings Hand, Ned leaves Winterfell with daughters Sansa and Arya, while Catelyn stays behind in Winterfell. Jon Snow heads north to join the brotherhood of the Nights Watch. Tyrion decides to forego the trip south with his family, instead joining Jon in the entourage heading to the Wall. Viserys bides his time in hopes of winning back the throne, while Daenerys focuses her attention on learning how to please her new husband, Drogo.', '', 1433646601),
  (792, 3436421, 121361, 10, 'Lord Snow', 1, 3, '2011-05-01', 'Arriving at Kings Landing, Ned is shocked to learn of the Crowns profligacy from his new advisors. At Castle Black, Jon Snow impresses Tyrion at the expense of greener recruits. Suspecting the Lannisters had a hand in Brans fall, Catelyn covertly follows her husband to Kings Landing, where she is intercepted by Petyr Baelish, a.k.a. Littlefinger, a shrewd longtime ally and brothel owner. Cersei and Jaime ponder the implications of Brans recovery; Arya studies swordsmanship. On the road to Vaes Dothrak, Daenerys finds herself at odds with Viserys.', '', 1433646608),
  (793, 3436431, 121361, 10, 'Cripples, Bastards, and Broken Things', 1, 4, '2011-05-08', 'Ned looks for clues to the death of his predecessor, and uncovers one of King Roberts bastards. Robert and his guests witness a tournament honoring Ned. Jon takes measures to protect Sam from further abuse at Castle Black; a frustrated Viserys clashes with Daenerys in Vaes Dothrak; Sansa imagines her future as a queen, while Arya envisions a far different future. Catelyn rallies her husbands allies to make a point, while Tyrion finds himself caught in the wrong place at the wrong time.', '', 1433646406),
  (794, 3436441, 121361, 10, 'The Wolf and the Lion', 1, 5, '2011-05-15', 'Incensed over news of Daenerys alliance with the Dothrakis, Robert orders a preemptive strike on the Targaryens that drives a wedge in his relationship with Ned. A captive Tyrion helps Catelyn, but receives a cold reception at the Eyrie from her sister, Jon Arryns widow Lysa. Sansa is charmed by the dashing Ser Loras Tyrell, a.k.a. the Knight of Flowers. Arya overhears a plot against her father.', '', 1433646554),
  (795, 3436451, 121361, 10, 'A Golden Crown', 1, 6, '2011-05-22', 'Reinstated as the Hand, Ned sits for the King while Robert is on a hunt. Ned issues a decree that could have long-term consequences throughout the Seven Kingdoms. At the Eyrie, Tyrion confesses to his \"crimes,\" and demands that Lysa give him a trial by combat. Joffrey apologizes to Sansa. Viserys receives his final payment for Daenerys from Drogo.', '', 1433646469),
  (796, 3436461, 121361, 10, 'You Win or You Die', 1, 7, '2011-05-29', 'Explaining that the future of the Lannisters is at stake, Tywin presses Jaime to be the man you were meant to be as they prepare for battle. Ned confronts Cersei about the secrets that killed Jon Arryn. With the fate of the missing Benjen very much on his mind, Jon takes his Nights Watch vows, though not with the assignment he coveted. After Ser Jorah saves Daenerys from treachery, an enraged Drogo vows to lead the Dothraki where theyve never gone before. An injured Robert takes pains to ensure an orderly transition at Kings Landing.', '', 1433646547),
  (797, 3360391, 121361, 10, 'The Pointy End', 1, 8, '2011-06-05', 'In the aftermath of Ned\'s capture, Syrio and Arya face off against Lannister guards, while Cersei manipulates Sansa to her own ends. Robb rallies his father\'s northern allies against Tywin Lannister and heads south to war. Tyrion forms an uneasy alliance with the hill tribes and reunites with his father. Jon lashes out at Ser Alliser Thorne and battles a mysterious attacker from beyond the Wall. Dany is forced to reconcile her desire to conquer Westeros with Drogo\'s savagery after the Dothraki raid a peaceful village.', '', 1433646627),
  (798, 4063481, 121361, 10, 'Baelor', 1, 9, '2011-06-12', 'With Sansa\'s life in danger, Ned makes a fateful decision. Catelyn brokers an unsavory deal with the slippery Walder Frey. Tyrion acquires a mistress and is forced by his father to fight on the front lines. Robb wins his first major victory and captures a prized prisoner. Jon is rewarded for his valor and discovers a dark secret about Maester Aemon. As Drogo\'s wound festers, Dany defies her bloodrider Qotho and puts her trust in the enslaved witch Mirri Maz Duur.', '', 1433646483),
  (799, 4063491, 121361, 10, 'Fire and Blood', 1, 10, '2011-06-19', 'As tragic news spreads across the Seven Kingdoms, Bran and Rickon share a prophetic dream, Catelyn interrogates Jamie about her son\'s fall, and Robb\'s destiny is forever changed. After a surprising decision by his father, Tyrion heads south. Arya assumes a new identity in an attempt to escape King\'s Landing, and Sansa is terrorized by Joffrey. At the Wall, Jon is forced to choose between the Night\'s Watch and the family he left behind. Across the sea, Dany pays a terrible price for her love, but finds new hope.', '', 1433646477);
