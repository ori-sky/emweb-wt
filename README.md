# emweb

emweb-wt is a module for emweb which adds support for Web Templates.

## Usage

### Installation

```
$ npm install emweb-wt
```

### Quick Start

To use emweb-wt in your project:

##### index.js
```javascript
var emweb = require('emweb');
var emweb_wt = require('emweb-wt');
var server = new emweb.Server();

// set handler for .w files to emweb-wt's handler
server.handlers.w = emweb_wt.handlers.w;

// ignore requests for .wt files - they should only be accessed through a .w file
server.handlers.wt = false;

server.start();
```
