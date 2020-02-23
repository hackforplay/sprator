# Sprator

[![npm latest version](https://img.shields.io/npm/v/sprator/latest.svg)](https://www.npmjs.com/package/sprator)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

sprator (Sprator-ts) は、 [torin (@yurkth)](https://twitter.com/yurkth) 氏が作成したソフトウェア Sprator のアルゴリズムを TypeScript で再実装したライブラリです。

オリジナルのソースコードは C++ で書かれており、Siv3D を用いて GUI アプリケーション化されています。下はそのスクショです。とてもかわいいですね。

![](https://user-images.githubusercontent.com/59264002/72552708-d2453b80-38da-11ea-8059-5fb624933144.png)

> ソース [Sprator](https://github.com/yurkth/sprator)

[セルオートマトン](https://ja.wikipedia.org/wiki/%E3%82%BB%E3%83%AB%E3%83%BB%E3%82%AA%E3%83%BC%E3%83%88%E3%83%9E%E3%83%88%E3%83%B3) で生成されているため、たくさんのスプライトを簡単に生成できます。

ライブラリを使うと Node.js 上でスプライトを生成できます。結果は Buffer として取得できます

```typescript
import { generate } from 'sprator';

const buffer = generate('040f1148', 10, 16, 'cyan', 'blue', 'white'); // シード値, 大きさ, 色を与えて生成する
```

結果： ![040f1148.png](https://spr.hackforplay.xyz/?seed=040f1148&dot=10&ppd=16&fill=cyan&border=blue&background=black)

パラメータについては [Sprator Server](/README_ja.md#sprator-server) を参照して下さい

## Installation

npm でインストールできます

> npm install sprator

## Requirement

Node.js v10 以上が必要です

## Sprator Server

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Express 製の [小さなウェブサーバ](/Sprator-ts/server.ts) です。ローカルで立ち上げたい場合は、

> npm start

とすれば、 http://localhost:3000 でアクセスできます

こちらのサーバはあらゆる URL の GET リクエストを受け付けます。例えば `/logo.png` を付けてアクセスすれば、ブラウザから保存する場合に便利です

利用できるパラメータは全て GET クエリとして送信します。下の一覧を参考にしてください

### Query

#### Example

e.g. http://localhost:3000?seed=1d14f&dot=8&ppd=8&fill=palegreen&border=forestgreen&background=rgba(128,128,128,0.8)

![https://sprator.herokuapp.com/?seed=1d14c&dot=8&ppd=8&fill=palegreen&border=darkolivegreen&background=rgba(225,225,225,0.8)](<https://sprator.herokuapp.com/?seed=1d14c&dot=8&ppd=8&fill=palegreen&border=darkolivegreen&background=rgba(225,225,225,0.8)>)

#### seed

セルオートマトンの初期状態の決定するシード値です。与えられた文字列を１６進数として解釈し、２進数に変換して、それぞれのビットをセルに対応させます

> ヒント：スプライトは左右が鏡になっており、かつ上端と左端と下端は枠線をつけるために常に０になるので、10 ドットの場合のセルオートマトンは `(10/2-1) * (10-2) = 32` マス（32bit）になります
> つまり１６進数に換算するとちょうど８桁まではシード値として有効ですが、それより右の数値は無視されます。また、シード値の長さが足りない場合は０として扱われます

Default: `040f1148`

#### dot

スプライトのドット数を表します。６以上の偶数である必要があります

Default: `10`

#### ppd

ピクセルパードット

出力されるビットマップが１ドットあたり何ピクセルで描画されるかを表します。例えば dot=10 かつ ppd=4 であれば、模様の大きさは 40px 四方になり、さらに 3 ドット分のマージンがつくので、 `(10 + 3*2) * 4 = 64px` 四方になります

> ヒント：マージンを加えた正方形の一辺は、丸く切り取られても見切れないよう、元の正方形の外接円に内接する正方形の一辺よりも大きくなるように、整数の値を周囲に加えた長さになります。
> 外接円の内接円の一辺は元の正方形の √2 ≒ 1.41 倍になので、10 ドットの場合は 14.1 ドットになるはずですが、
> マージンの長さが `(14.1 - 10) / 2 = 2.05…` ドットでは端数が出てしまうために、切り上げして 3 ドットと計算されます。
> 現状、この計算方法は固定されているため、クエリでは変更できません

Default: 10

#### fill

塗り潰し色です。CSS Color が使えます

> You must encode `#` (`%23`) on URL.

Default: #228b22

#### border

枠線の色です。CSS Color が使えます

Default: #2f4f4f

#### background

背景色です。CSS Color が使えます

Default: #000000

## Usage

[以前作ったアイコン生成ソフトをリメイクした - 屋根裏](https://yurkth.hateblo.jp/entry/sprite-generator)

## License

Sprator is licensed under the MIT license. See the [LICENSE](/LICENSE) for more information.
