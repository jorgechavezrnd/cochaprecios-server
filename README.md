# Cochaprecios - Server

##  Commands for initialize project ([Original Guide](https://gist.github.com/Klerith/3ba17e86dc4fabd8301a59699b9ffc0b))

1. Install TypeScript and some dependencies
```
npm i -D typescript @types/node ts-node-dev rimraf
```

2. Initialize the TypeScript configuration file
```
npx tsc --init --outDir dist/ --rootDir src
```

3. Scripts for dev, build and start
```
"dev": "tsnd --respawn --clear src/app.ts",
"build": "rimraf ./dist && tsc",
"start": "npm run build && node dist/app.js"
```
