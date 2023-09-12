# [Esbuild-live-server](https://www.npmjs.com/package/esbuild-live-server)
A development server with live reload enabled, allows you to see updates to your file changes in realtime 

## Features

* Minimal but efficient
* Watches for file changes ([Chokidar](https://www.npmjs.com/package/chokidar)) and updates in real time 
* Live reload
* Fast build with [Esbuild](https://www.npmjs.com/package/esbuild) (Like flash 🏃🏾‍♂️)
* Uses a lightweight server, no overheads - [create-serve](https://www.npmjs.com/package/create-serve)

## Get Started

Install with npm 

```sh
npm install esbuild-live-server -D
```

Then `import` and use it in your code

`build.config.js`

import EsbuildServer from "esbuild-live-server"

```javascript
   // takes in two params, esbuild config and server config
    EsbuildServer({
        // ESBuild Config
    }, {
        // Server Config
        port: 4000,
        root: "./public", // path to the folder you want to serve
    });
```

### Run Scripts

command line

```sh
    node build.config.js --watch
    # or
    node build.config.js -w
```

package.json

```json
    {
        "scripts": {
            "dev": "node esbuild.config.js -w",
        }
    }
```

Then run

```sh
    yarn dev 
    # or
    npm run dev
```

### Thank You
