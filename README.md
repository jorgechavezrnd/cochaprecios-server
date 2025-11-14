# Cochaprecios - Server

##  TODOs que se deben resolver cuando se pueda

- **Investigar solución para Jest con módulos ESM**: Actualmente `uuid` está en v8.3.2 en lugar de v13+ debido a que Jest no puede procesar módulos ESM. Investigar configuración con `extensionsToTreatAsEsm` y `transform` de ts-jest para soportar versiones modernas.

- **Actualizar @faker-js/faker a versión reciente**: Similar al problema con `uuid`, `@faker-js/faker` está en v8.4.1 en lugar de v10+ por incompatibilidad con Jest y ESM. Evaluar migración a Jest con soporte ESM experimental o configuración de `transformIgnorePatterns`.

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

##  Commands for setup the testing environment ([Original Guide](https://gist.github.com/Klerith/98d7b1bc0f1525e892f260813cad1007))

1. Install dependencies
```
npm install -D jest @types/jest ts-jest supertest
```

2. Initialize Jest configuration file
```
npm init jest@latest
```
or
```
npx create-jest
```

3. Modify `jest.config.ts` to use `ts-jest` preset
```
preset: 'ts-jest',
testEnvironment: "jest-environment-node",

// Opcional - The paths to modules that run some code to configure or set up the testing environment before each test
// setupFiles: ['dotenv/config'],
```

4. Script for testing in `package.json`
```
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage",
```
