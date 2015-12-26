## Episodehunter API

> API for episodehunter

This is part of an ongoing project to rewrite episodehunter.tv to an node.js project.
Parallel to this project, there is an ongoing project to rewrite the front end part of episodehunter [here](https://github.com/tjoskar/episodehunter.tv)

### Requirement
- Node >= 4.0
- MySQL >= 5.6 (see below)
- Redis >= 3.0 (see below)

### Clone
```
$ git clone --recursive git@github.com:episodehunter/episodehunter-api.git
```

### Install
```
$ npm run setup
```

## Usage
#### Start
```
$ gulp serve
$ gulp watch
```

#### Test
```
$ npm test
$ npm run test:integration
$ npm run test:all
```

##### Server
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

You can also access Redis by;
- Host: 127.0.0.1
- Port: 6379
