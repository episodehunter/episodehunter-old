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
  apt-get update

  echo "\n--- Install base packages ---\n"
  apt-get -y install vim curl build-essential python-software-properties git > /dev/null 2>&1

  echo "\n--- Install MySQL specific packages and settings ---\n"
  echo "mysql-server mysql-server/root_password password $DBPASSWD" | debconf-set-selections
  echo "mysql-server mysql-server/root_password_again password $DBPASSWD" | debconf-set-selections

  apt-get -y install mysql-server-5.6 > /dev/null 2>&1

  echo "\n--- Setting up our MySQL user and db ---\n"
  mysql -uroot -p$DBPASSWD -e "CREATE DATABASE $DBNAME"
  mysql -uroot -p$DBPASSWD -e "grant all privileges on $DBNAME.* to '$DBUSER'@'%' identified by '$DBPASSWD'"
  mysql -uroot -p$DBPASSWD $DBNAME < /home/vagrant/data/vagrant/$DBNAME.sql

  echo "\n--- Updating mysql configs in /etc/mysql/my.cnf ---\n"
  sed -i "s/bind-address.*/bind-address = 0.0.0.0/" /etc/mysql/mysql.conf.d/mysqld.cnf
  echo "\n--- Restarting mysql ---\n"
  service mysql restart

  # Make sure that vagrant doesn't re-install everything
  touch /.installed
fi
