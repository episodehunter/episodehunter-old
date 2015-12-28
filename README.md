## Episodehunter

> Backend for episodehunter

This is part of an ongoing project to rewrite episodehunter.tv to an node.js project.
Parallel to this project, there is an ongoing project to rewrite the front end part of episodehunter [here](https://github.com/tjoskar/episodehunter.tv)

### Requirement (see below)
- Node >= 4.0
- MySQL >= 5.6
- Redis >= 3.0

### Clone
```
$ git clone git@github.com:episodehunter/episodehunter.git
```

### Install
```
$ node setup.js
```

## Usage
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

#### Start
```
$ vagrant ssh
$ cd data
$ pm2 start process.json
```

## Why a monorepo?

Copy and pasted from https://github.com/babel/babel/blob/master/doc/design/monorepo.md

**Pros:**

 * Single lint, build, test and release process.
 * Easy to coordinate changes across modules.
 * Single place to report issues.
 * Easier to setup a development environment.
 * Tests across modules are ran together which finds bugs that touch multiple modules easier.

**Cons:**

 * Codebase looks more intimidating.
 * Repo is bigger in size.

#### This is dumb! Nobody in open source does this!

[React](https://github.com/facebook/react/tree/master/packages), [Meteor](https://github.com/meteor/meteor/tree/devel/packages), and [Ember](https://github.com/emberjs/ember.js/tree/master/packages), among others, do this.

#### Previous discussion

- [Dan Luu](http://danluu.com/monorepo/)
- [Gregory](http://gregoryszorc.com/blog/2014/09/09/on-monolithic-repositories/)
- [Szorc](http://gregoryszorc.com/blog/2015/02/17/lost-productivity-due-to-non-unified-repositories/)
- [Face](https://developers.facebooklive.com/videos/561/big-code-developer-infrastructure-at-facebook-s-scale)[book](https://code.facebook.com/posts/218678814984400/scaling-mercurial-at-facebook/)
- [Benjamin Pollack](http://bitquabit.com/post/unorthodocs-abandon-your-dvcs-and-return-to-sanity/)
- [Benjamin Eberlei](https://qafoo.com/resources/presentations/froscon_2015/monorepos.html)
- [Simon Stewart](http://blog.rocketpoweredjetpants.com/2015/04/monorepo-one-source-code-repository-to.html)
- [Digital Ocean](https://www.digitalocean.com/company/blog/taming-your-go-dependencies/)
- [Google](http://www.infoq.com/presentations/Development-at-Google)
- [Twitter](http://git-merge.com/videos/scaling-git-at-twitter-wilhelm-bierbaum.html)
- [thedufer](http://www.reddit.com/r/programming/comments/1unehr/scaling_mercurial_at_facebook/cek9nkq)
- [Paul Hammant](http://paulhammant.com/categories.html#trunk_based_development)
