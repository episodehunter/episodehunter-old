# ************************************************************
# Host: 127.0.0.1 (MySQL 5.6.25-0ubuntu0.15.04.1)
# Databas: episodehunter
# Genereringstid: 2015-08-23 11:07:59 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Tabelldump groups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `groups`;

CREATE TABLE `groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `permissions` text COLLATE utf8_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `groups_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Tabelldump images_delete
# ------------------------------------------------------------

DROP TABLE IF EXISTS `images_delete`;

CREATE TABLE `images_delete` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `type` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Tabelldump images_download
# ------------------------------------------------------------

DROP TABLE IF EXISTS `images_download`;

CREATE TABLE `images_download` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `media_id` int(10) unsigned NOT NULL,
  `type` varchar(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Tabelldump migrations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



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



# Tabelldump movie_to_add
# ------------------------------------------------------------

DROP TABLE IF EXISTS `movie_to_add`;

CREATE TABLE `movie_to_add` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tmdb_id` int(7) unsigned DEFAULT NULL,
  `imdb_id` varchar(10) DEFAULT NULL,
  `time` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



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



# Tabelldump movie_watched_temp
# ------------------------------------------------------------

DROP TABLE IF EXISTS `movie_watched_temp`;

CREATE TABLE `movie_watched_temp` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `movie_id` varchar(10) NOT NULL DEFAULT '',
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



# Tabelldump system_setings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `system_setings`;

CREATE TABLE `system_setings` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(11) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
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



# Tabelldump tv_to_add
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tv_to_add`;

CREATE TABLE `tv_to_add` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tvdb_id` int(7) unsigned NOT NULL,
  `time` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



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



# Tabelldump tv_watched_temp
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tv_watched_temp`;

CREATE TABLE `tv_watched_temp` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `serie_id` int(10) unsigned NOT NULL,
  `season` int(2) unsigned DEFAULT '0',
  `episode` int(3) unsigned DEFAULT '0',
  `time` int(10) unsigned DEFAULT '0',
  `type` int(1) unsigned DEFAULT '0',
  PRIMARY KEY (`id`)
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
  `permissions` text COLLATE utf8_unicode_ci,
  `activated` tinyint(1) NOT NULL DEFAULT '0',
  `activation_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `activated_at` timestamp NULL DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `persist_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reset_password_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `facebook_uid` bigint(20) unsigned DEFAULT NULL,
  `facebook_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `share` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `auto_follow` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `enable_just_went` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_username_unique` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
