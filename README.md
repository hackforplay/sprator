# Sprator

[![npm latest version](https://img.shields.io/npm/v/sprator/latest.svg)](https://www.npmjs.com/package/sprator)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

This is a TypeScript implementation of [Sprator](https://github.com/yurkth/sprator) (original is C++).

Sprator is a npm package to generate sprites using [cellular automaton](https://en.wikipedia.org/wiki/Cellular_automaton). Generated sprites is given as Buffer object in Node.js.

![](https://user-images.githubusercontent.com/59264002/72552708-d2453b80-38da-11ea-8059-5fb624933144.png)

> This image is from original [Sprator](https://github.com/yurkth/sprator) repo.

## Installation

### Node.js

You can install this package via npm.

> npm install sprator

## Requirement

Node.js v10 or higher.

## Sprator Server

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

This package includes simple [server](/Sprator-ts/server.ts) using express. You can use it locally by following command.

> npm start

Then the server is on http://localhost:3000

The server responds to GET request with any URL and accepts by following queries.

### Query

#### Example

e.g. http://localhost:3000?seed=1d14f&dot=8&ppd=8&fill=palegreen&border=forestgreen&background=rgba(128,128,128,0.8)

![https://sprator.herokuapp.com/?seed=1d14c&dot=8&ppd=8&fill=palegreen&border=darkolivegreen&background=rgba(225,225,225,0.8)](<https://sprator.herokuapp.com/?seed=1d14c&dot=8&ppd=8&fill=palegreen&border=darkolivegreen&background=rgba(225,225,225,0.8)>)

#### seed

Hex string represents seed of generation.

Default: `040f1148`

#### dot

Number of dots in an edge. 6 or more (must be even)

Default: `10`

#### ppd

Numbrer of pixels in a dot. e.g. If dot=10 and ppd=4, image size is 60x60 (includes 5px margin).

Default: 10

#### fill

Fill color can be used on the Canvas.

> You must encode `#` (`%23`) on URL.

Default: #228b22

#### border

Border color can be used on the Canvas.

Default: #2f4f4f

#### background

Background color can be used on the Canvas.

Default: #000000

## Usage

[以前作ったアイコン生成ソフトをリメイクした - 屋根裏](https://yurkth.hateblo.jp/entry/sprite-generator)

## License

Sprator is licensed under the MIT license. See the [LICENSE](/LICENSE) for more information.
