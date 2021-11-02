const Help = require("../classes/help");

const help =
`__**組み込みテーブル一覧**__
共通：
「！」「!」「・」「表」の４文字は無視されます。つけてもつけなくても動作します。
半角英字については大小の区別はありません。

**1：表名だけで使用できるもの**
\`例：/nd サツバツ！\`

**サツバツ**…サツバツ！命中時の効果を決定します。
**wasshoiエントリー**…Wasshoi!判定成功後のニンジャスレイヤーエントリー方法を選択します。
**初期ジツ系統**…キャラメイク時、PCのジツを決定します。
**初期スキル**…キャラメイク時、PCの初期所持スキルを決定します。
**初期アイテム**…キャラメイク時、PCの所持アイテムを決定します。
**初期知識スキル**…キャラメイク時、PCの初期知識スキルを決定します。
**初期サイバネ**…キャラメイク時、PCが初期装備するサイバネを決定します。
**生い立ち**…「ネオサイタマ生い立ち＆マイナースキル表」に基づき、ニンジャ作成時の生い立ちを決定します。（ただしダイスロールは1D36で代用されます）

**2：表名＋ショートカットで使用できるもの**
ショートカット英字が省略された場合はAを指定したものとみなします。
\`例：/nd NRS発狂,C\`

**NRS発狂**…モータルPCを操作中、NRS（ニンジャ・リアリティ・ショック）が発生した際の反応を決定します。以下の3パターンがあります。
\`\`\`
A…D3でダイスロール。
B…D6でダイスロール。
C…D6+1でダイスロール。
\`\`\`

**3：表名＋ショートカット＋補正値で使用できるもの**
ショートカット英字が省略された場合はAを指定したものとみなします。
補正値が省略された場合は0とみなします。補正値を指定するときにはショートカットを省略できません。
\`例：/nd ソウカイヤカルマロンダリング,C,-1\`

**ソウカイヤカルマロンダリング**
\`\`\`A…D3、B…D6、C…D6+1、D…2D6\`\`\`
**ザイバツカルマロンダリング**
\`\`\`A…D3、B…D3+1、C…2D3、D…D3+3\`\`\`
**アマクダリカルマロンダリング**
\`\`\`A…D3、B…D3+1、C…2D3、D…D3+3\`\`\`
**オムラカルマロンダリング**
\`\`\`A…D3、B…D3+1、C…2D3、D…D3+3\`\`\`
**ヨロシサンカルマロンダリング**
\`\`\`A…D3、B…D3+1、C…2D3、D…D3+3\`\`\`

**カスタムテーブル機能で追加されたもの**
このチャンネルで使えるものは、以下のコマンドで確認できます。
\`/ct checktablelist\`
`;

module.exports = new Help(help);