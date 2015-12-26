# Logger for Episodehunter

> Logger for episodehunter.tv

This is part of an ongoing project to rewrite episodehunter.tv to an node.js project.
Parallel to this project, there is an ongoing project to rewrite the front end part of episodehunter [here](https://github.com/tjoskar/episodehunter.tv)

### Methods

#### log
```javascript
import log from 'episodehunter-logger';

log.fatal(...msg) // The service/app is going to stop or become unusable. Will report to raven.
log.error(...msg) // Fatal for a particular request, but the service/app continues servicing other requests. Will report to raven.
log.warn(...msg)  // A note on something that should probably be looked at. Will report to raven.
log.info(...msg)  // Detail on regular operation.
log.debug(...msg) // Anything else, i.e. too verbose to be included in "info" level.
```

#### createLogger
```javascript
import {createLogger} from 'episodehunter-logger';

const name = 'image-ingest'; // Name of the current app
const logLevel = 'warn'; // Default. Min. log level.
const filePath = './logs/develop.txt'; // File to log to. Skipp if undefined. Will rotate file.
const stdout = true; // Bad name, but will use stout if true.
const ravenDNS = 'xxx...xxx@...'; // Your path to raven

const log = createLogger({name, logLevel, filePath, stdout, ravenDNS});
```
