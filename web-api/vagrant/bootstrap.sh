#!/bin/sh
set -e

if [ -e /.installed ]; then
  echo 'Already installed.'

else
  echo ''
  echo 'INSTALLING'
  echo '----------'

  # Variables
  DBNAME=episodehunter
  DBUSER=episodehunter
  DBPASSWD=episodehunter

  # Update app-get
  add-apt-repository -y ppa:chris-lea/redis-server
  apt-get update

  echo "\n--- Install base packages ---\n"
  apt-get -y install vim curl build-essential python-software-properties git

  echo "\n--- Install graphicsmagick ---\n"
  apt-get -y install graphicsmagick

  echo "\n--- Install NodeJS v4.0 ---\n"
  curl -sL https://deb.nodesource.com/setup_4.x | bash -
  apt-get install -y nodejs

  echo "\n--- Install node specific package ---\n"
  npm install -g pm2 gulp typescript

  echo "\n--- Install Redis ---\n"
  apt-get install -y redis-server

  echo "\n--- Updating redis configs in /etc/redis/redis.conf ---\n"
  sed -i "s/bind 127.0.0.1/bind 0.0.0.0/" /etc/redis/redis.conf
  echo "\n--- Restarting redis server ---\n"
  service redis-server restart

  echo "\n--- Install MySQL specific packages and settings ---\n"
  echo "mysql-server mysql-server/root_password password $DBPASSWD" | debconf-set-selections
  echo "mysql-server mysql-server/root_password_again password $DBPASSWD" | debconf-set-selections

  apt-get -y install mysql-server-5.6

  echo "\n--- Setting up our MySQL user and db ---\n"
  # Set up a develop database
  mysql -uroot -p$DBPASSWD -e "CREATE DATABASE $DBNAME"
  mysql -uroot -p$DBPASSWD -e "grant all privileges on $DBNAME.* to '$DBUSER'@'%' identified by '$DBPASSWD'"
  mysql -uroot -p$DBPASSWD $DBNAME < /home/vagrant/data/episodehunter-api/vagrant/$DBNAME.sql

  # Set up a test database
  mysql -uroot -p$DBPASSWD -e "CREATE DATABASE ${DBNAME}_test"
  mysql -uroot -p$DBPASSWD -e "grant all privileges on ${DBNAME}_test.* to '$DBUSER'@'%' identified by '$DBPASSWD'"
  mysql -uroot -p$DBPASSWD ${DBNAME}_test < /home/vagrant/data/episodehunter-api/vagrant/$DBNAME.sql

  echo "\n--- Updating mysql configs in /etc/mysql/my.cnf ---\n"
  sed -i "s/bind-address.*/bind-address = 0.0.0.0/" /etc/mysql/mysql.conf.d/mysqld.cnf
  echo "\n--- Restarting mysql ---\n"
  service mysql restart

  # Make sure that vagrant doesn't re-install everything
  touch /.installed
fi
