## Episodehunter API

This is an ongoing project to rewrite episodehunter.tv to an node.js project.
Parallel to this project, there is an ongoing project to rewrite the front end part of episodehunter [here](https://github.com/tjoskar/episodehunter.tv)

### Requirement
- Typescript >= 1.5
- MySQL >= 5.6 (se below)

### Install
```
$ npm install
$ tsc # Compile the ts files, use the -w flag to watch for changes
$ node dist/server.js # Starts the server, use nodemon to auto restart the server
```

##### Databse
This project is currently using MySQL as database.
You can use [vagrant](http://www.vagrantup.com/downloads) for this. Head over to `./vagrant` and run `$ vagrant up`. This will create a virtual machine (using Ubuntu) and creating a database and make the database accessible from the host.
```
$ cd vagrant
$ vagrant up # This will take a while
```
You can now connect to the database from your machine with the following credentials:
- Host: 127.0.0.1
- Username: episodehunter
- Password: episodehunter
- Port: 33060 (this port maps to 3306 on the guest machine)
