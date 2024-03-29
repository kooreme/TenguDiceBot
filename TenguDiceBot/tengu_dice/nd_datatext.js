/* eslint-disable no-irregular-whitespace */
exports.ジツ系統決定 = [
    `**カトン・ジツ**：広範囲火力系

**使用タイミング**：手番「攻撃フェイズ」
**コスト**：精神力1、1行動
**ターゲット**：隣接する3×3マス
**発動難易度**：ニューロン＋ジツ：NORMAL
**効果種別**：範囲攻撃、火炎属性

術者と隣接した3×3マスの敵全員に1ダメージを与える（『回避：NORMAL』）。
【ジツ】2の場合、中心点の敵1体に1ではなくD3ダメージを与える。
【ジツ】3の場合、中心点の敵1体に1ではなくD6ダメージを与える（中心点のみ『回避：HARD』）。
`,
    `**ヘンゲヨーカイ・ジツ**：自己強化系
**使用タイミング**：手番「開始フェイズ」
**コスト**：精神力1、瞬時行動
**ターゲット**：自分自身
**発動難易度**：ニューロン＋ジツ：NORMAL
**効果種別**：強化、効果継続（Xターン）

このジツの効果が継続している間、術者は【カラテ】+3、【脚力】+2される（**【体力】の増加はない**）。
装備は自動的に「素手&スリケン」固定となり、カタナなどは使用できない。

この効果はXターン後の手番開始フェイズまで継続する。
Xの値は【ジツ】値に等しい。
効果が終了するターンの手番開始フェイズに【精神力】を1点消費すると、自動的にXターンだけ効果を延長できる。
`,
    `**カラテミサイル**：遠隔攻撃系
**使用タイミング**：手番「攻撃フェイズ」
**コスト**：精神力1、1行動
**ターゲット**：最大で【ジツ】値+1体までの敵**（上限4）**
**発動難易度**：ニューロン＋ジツ：NORMAL
**効果種別**：射撃、マルチターゲット

カラテミサイルのLV数+1個のカラテ光球弾が発射され、使用者から視線が通ってさえいれば、どれだけ離れていても自動的に命中する。
ダメージはそれぞれ1である（『回避：NORMAL』）。
複数の敵に振り分けても、1つの敵に集中してもよい（まとめて回避可能）。
カラテミサイルは射撃系効果のため、ターゲットが自分と隣接している場合には使用できない。
このジツで射出できるカラテ光球弾の最大数は4個である。
`,
    `**ムテキ・アティチュード**：防御系
**使用タイミング**：回避判定の代わり
**コスト**：精神力1
**ターゲット**：自分自身
**発動難易度**：ニューロン＋ジツ：NORMAL
**効果種別**：強化、効果継続（次の手番開始フェイズまで）

術者は回避判定の代わりに、このジツの使用を試みられる。
回避ダイスが残り0個の時や、本来は回避不能な条件下でも使用できる。

効果が継続している間、『ダメージ軽減1』を得る。
【ジツ】値2の場合これは『ダメージ軽減2』となる。
【ジツ】値3の場合、これに加えて『即死耐性』を得る（『装甲貫通』などによって『ダメージ軽減0』になると一時的に『即死耐性』も失われる）。

【ジツ】値に関わらず、このジツの効果が持続している間、術者は通常の回避判定を行えなくなる。
`,
    `**カナシバリ・ジツ**：精神攻撃/幻惑/毒系
**使用タイミング**：手番「攻撃フェイズ」
**コスト**：精神力1、1行動
**ターゲット**：隣接する3×3マス
**発動難易度**：ニューロン＋ジツ：NORMAL
**効果種別**：範囲攻撃、精神攻撃
**無効**：戦闘兵器などには効果を発揮しない

術者と隣接した3×3マスの敵全員に対して『精神力ダメージ1』を与える（『回避：NORMAL』）。
【ジツ】値にかかわらず、このジツを回避できなかったモータル全員は、ターン終了まで一切行動不能となる。

【ジツ】値2の場合、回避に成功したかどうかにかかわらず、効果範囲内にいる敵のうち好きな1体に『抵抗判定：ニューロン：NORMAL』を行わせ、これに失敗したら『カナシバリ』効果を与える。
【ジツ】値3の場合、この『抵抗判定』の難易度がHARDとなる。

**カナシバリ**：対象1体は、術者側の次の手番開始時まで『麻痺状態』となり、その場から動けず、あらゆる行動の判定難易度が+2され、敵からの攻撃/射撃の難易度が-2される。
対象がこの『麻痺状態』中にダメージ（味方による攻撃でも可）を受けて【体力】/【精神力】が1以上減少した場合、そのフェイズの終わりに『カナシバリ』効果は終了する。
`,
    `**プレイヤーは1〜5の中から好きなジツを選んでよい**
（「/fnd 初期ジツ系統#n 」（nは1～5）を入力すると入手できるジツの詳細を確認できます）
`,
];

exports.初期スキル決定 = [
    `**◉常人の三倍の脚力**：【脚力】+1、連続側転難易度−1

この強化系スキルを持つ者は【脚力】が+1される。
また『連続側転』難易度が−1される。
初期作成時は、キャラクターシート上で「N」と書かれた『連続側転』難易度を「E」に書き換えること。
`,
    `**◉頑強なる肉体**：【体力】+2、抵抗判定の強化

この強化系スキルを持つ者は【体力】+2。
また【カラテ】値を使った抵抗判定/対抗判定を強いられ、それが「毒」種別を持つ場合、追加でダイスを2個振ることができる。
`,
    `**◉ランスキック**：ワザ。弾き飛ばしを発生させる

**使用タイミング**：手番「攻撃フェイズ」開始直後
**効果種別**：ワザ、戦闘スタイル、近接攻撃

現在装備している武器にかかわらず、この素手系戦闘スタイルを選択できる。
他のワザを発生させることはできない。
この攻撃に対してカウンターを受けた場合、回避不能となる。

**『●戦闘スタイル：ランスキック』**：【脚力】値で『攻撃判定：NORMAL』を行う。
これは『●連続攻撃1（固定）』だが、【脚力】7以上の場合のみ『●連続攻撃2（固定）』も選択できる。
この攻撃の基本ダメージは1固定である（『回避：NORMAL』）。
回避されなかった場合、『サツバツ！』出目1の効果（『痛打』＋『弾き飛ばし』）が自動的に発生する。
この『攻撃判定』で『サツバツ！』が自然発生した場合、出目1を選ぶか、D6でランダムに決めるかを選択できる。
`,
    `**◉魅了**：モータル1体を無力化する

**使用タイミング**：手番「攻撃フェイズ」
**コスト**：1行動
**ターゲット**：6マス以内にいるモブ敵の「モータル」1体
**発動難易度**：ニューロン：NORMAL
**効果種別**：精神攻撃

このスキルが発動すると、現在の【精神力】が1以下のモータル1体を直ちに戦闘不能状態にし、マップから取り除く。
効果を受けたモータルの描写は自由であり、魅了状態になって立ち尽くしたり、
失禁とともに気絶したり、狂ったように叫んで逃げ去ったり、あるいは恐怖で心停止する可能性もある。
`,
    `**◉ニンジャソウルの闇**：【体力】+1、『攻撃判定ダイス+1』、『射撃判定ダイス+1』、ジツの『発動判定ダイス+1』

この強化系スキルを持つ者は【体力】+1、『攻撃判定ダイス+1』、『射撃判定ダイス+1』、『ジツ発動判定ダイス+1』の効果を得る。
また『Wasshoi!判定』時、「標的ニンジャ」を決める上で、このニンジャの【DKK】値に+1の修正をもたらす。
このスキルは複数個所持できる。
`,
    `**◉kill-9**：戦闘兵器やクローンヤクザに自爆命令を下す

**前提**：生体LAN端子Lv1以上（持たない場合は判定難易度+1）
**使用タイミング**：手番「攻撃フェイズ」
**コスト**：1行動
**ターゲット**：「重サイバネ」/「戦闘兵器」/「クローンヤクザ」/「生体LAN端子を持つ者」いずれか1体（同じ部屋にいれば視線不要）
**効果種別**：特殊、電脳戦系、ハッキング

【ニューロン】値で『ハッキング判定：HARD』を行う。
成功した場合、『ダメージ軽減』不可の2ダメージを与える（『回避難易度：NORMAL』）。
射撃ではないため、隣接時のペナルティは存在しない。
`,
];

exports.初期アイテム決定 = [
    `**家族の写真**：【精神力】+1、その他使い切り効果あり

【精神力】+1。以下のいずれかのタイミングで、「瞬時使い切り」の回復アイテムとしても使用できる（そのように使用すると失われる）：

・【DKK】獲得直後、または『Wasshoi!判定』の直前に使用し、現在の【DKK】をゼロにする。
・【精神力】を瞬時に4回復する。
`,
    `**オーガニック・スシ**：【体力】3回復（使い捨て）

手番の「移動フェイズ」または「攻撃フェイズ」に、「1行動」を消費して使用できる。
使用すると【体力】が3回復する。
このアイテムは一度使用すると失われる。
`,
    `**トロ粉末**：【精神力】2回復（使い捨て）

手番の「移動フェイズ」または「攻撃フェイズ」に、「1行動」を消費して使用できる。
使用すると【精神力】が2回復する（上限を超えて回復することはない）。
このアイテムは一度使用すると失われる。
`,
    `**ウイルス入りフロッピー**：ハッキング判定でダイス+3個（使い捨て）

あらゆるハッキング系の判定に使用できる。
使用するとそのハッキング判定でダイスが+3個される。
このアイテムは一度使用すると失われる。
`,
    `**ZBRアドレナリン注射器**：気絶状態にある仲間の蘇生（使い捨て）

手番の「移動フェイズ」または「攻撃フェイズ」に、「1行動」を消費して使用できる。
隣接する味方（『気絶状態』にある者に限る）に使用した場合、そのキャラは直ちに【体力】1、【精神力】0の状態で蘇生する。
このアイテムは一度使用すると失われる。
`,
    `**カタナ**：攻撃時に戦闘スタイルなどを選択できる（後述）

**所持ペナルティ**：なし
**装備時ペナルティ**：連続側転難易度+1
**ダメージと基本攻撃難易度**：1ダメージ、NORMAL

**装備時に選択可能な戦闘スタイル：**
**『●戦闘スタイル：強攻撃』**：この手番の全攻撃が『攻撃判定難易度』+1となる代わりに、全攻撃が『痛打+1』となる。
**『●戦闘スタイル：精密攻撃』**：【ワザマエ】で『攻撃判定』可能。ただし『サツバツ！』は【6,6,6】、『ナムアミダブツ！』は【6,6,6,6】となる。
この攻撃時はいかなる『痛打』も発生しない。
`,
];

exports.初期サイバネ決定 = [
    `**テッコLV1**：【カラテ】判定でダイス+1個、回避ダイス+1個

【カラテ】のみを使用する全ての判定（『攻撃判定』『脱出判定』など）において、振れるダイスが+1個される。
加えて、各ターン開始時に得られる回避ダイスが1個増える。
【体力】は増加しない。
`,
    `**ヒキャクLV1**：【脚力】+1、回避ダイス+1個

【脚力】が+1される。
加えて、各ターンの開始時に得られる『回避ダイス』が1個増える。
`,
    `**サイバネアイLV1**：【ワザマエ】判定でダイス+2個

【ワザマエ】のみを使用する全ての判定（『連続側転判定』『射撃判定』『交渉判定』、および精密攻撃時の攻撃判定など）において、振れるダイスが+2個される。
`,
    `**生体LAN端子LV1**：【ニューロン】判定でダイス+2個、イニシアチブ+1

イニシアチブ値+1。
【ニューロン】のみを使用する全ての判定（『知識判定』『ハッキング判定』など。『ジツ発動判定』は【ジツ】値も使うため不可）において、ダイスが+2個される。
電脳化を前提とする電子ドラッグや能力を使用できるようになる。
【精神力】は増加しない。
`,
    `**クロームハートLV1**：【体力】+1、【精神力】+1

【体力】+1、【精神力】+1
`,
    `**戦闘用バイオサイバネLV1**：近接攻撃時のダメージ+1、交渉難易度+1

※これを選ぶ場合、初期装備アイテムと初期スキルを全て捨てること。

このサイバネを持つ者は「バイオサイバネ武器」を得る。
あらゆる交渉難易度が＋１される。
この武器の装備中は、近接攻撃で敵に与える基本ダメージが1ではなく2となる。
`,
];

exports.サツバツ = [
    `**痛烈な一撃**：『痛打+1』、『弾き飛ばし』

**「イヤーッ！」腹部に強烈な一撃が命中！ 敵はくの字に折れ曲がり、ワイヤーアクションめいて吹っ飛んだ！**
『痛打+1』。
敵の【体力】を減らした場合、付属効果として『弾き飛ばし』を与える。
`,
    `**頭部痛打**：『痛打+1』、ニューロンダメージ2、ワザマエダメージ1

**「観念してハイクを詠め！」頭部への痛烈なカラテが命中！ 眼球破壊もしくは激しい脳震盪が敵を襲う！**
『痛打+1』。
敵の【体力】を減らした場合、付属効果として『ニューロンダメージ2』と『ワザマエダメージ1』と『●部位損傷：頭部』を与える。
`,
    `**急所破壊**：『痛打+1』、ニューロンダメージ1、精神力ダメージ2

**「苦しみ抜いて死ぬがいい！」急所や内臓を情け容赦なく破壊！**
『痛打+1』。
敵の【体力】を減らした場合、付属効果として『ニューロンダメージ1』と『精神力ダメージ2』と『●部位損傷：胴体』を与える。
`,
    `**脚部破壊**：『痛打+1』、カラテダメージ1、脚力ダメージ2

**「どこへ逃げても無駄だ！」敵の脚を無慈悲に粉砕！**
『痛打+1』。
敵の【体力】を減らした場合、付属効果として『カラテダメージ1』と『脚力ダメージ2』と『●部位損傷：脚部』を与える。
`,
    `**両腕破壊**：『痛打+1』、カラテダメージ2、ワザマエダメージ2

**「これで手も足も出まい！」敵の両腕をダブルチョップ切断！ 傷口から鮮血がスプリンクラーめいて噴き出す！**
『痛打+1』。
敵の【体力】を減らした場合、付属効果として『カラテダメージ2』と『ワザマエダメージ2』と『●部位損傷：腕部』を与える。
`,
    `**心臓破壊**：『即死！』もしくは『痛打+2D6』

**「さらばだ！ イイイヤアアアアーーーーッ！」ヤリめいたチョップが敵の胸を貫通！ さらに心臓を掴み取り、握りつぶした！ ゴウランガ！**
『即死！』。
敵が『即死耐性』を持つ場合、この効果は『痛打＋2D6』に置き換えられる。
`,
];

exports.wasshoiエントリー = [
    `**高所からの回転着地！タタミ四枚の距離で睨み合った！**：
標的ニンジャから3または4マス離れた任意のマスに、【殺】コマを置くこと。
`,
    `**ドアを蹴破って出現！**：
標的ニンジャがいる部屋の任意のドアの隣に【殺】コマを置くこと。
なお、ドアにあらかじめ鍵をかけるなどの行為は全て無駄である。
`,
    `**KRAAAAASH！ 窓を突き破り出現！**：
標的ニンジャがいる部屋の任意の窓の隣に【殺】コマを置くこと。
【殺】コマが隣接している間、その窓は脱出用として使用できなくなる。
`,
    `**天井破壊や床破砕または垂直リフト射出により出現！**：
標的ニンジャから2マス離れた任意の場所に【殺】コマを置くこと。
激しい恐怖や動揺により、次のターンの終了時まで、その場にいる【DKK】1以上のニンジャ全員は『連続側転難易度』が+1される。
`,
    `**冷蔵庫や金庫から突如出現！**：
そのマップ上に存在するトレジャーボックス内に、ニンジャスレイヤーが潜んでいた。
標的ニンジャから最も近いトレジャーボックス1個（もしくは適切な障害物や爆発物）の隣に【殺】コマを置くこと。
激しい恐怖や動揺により、次のターンの終了時まで、その場にいる【DKK】1以上のニンジャ全員は『連続側転難易度』が+1される。
`,
    `**「行き先はジゴクですよ」**：
マップ上にいるNPC1人（標的ニンジャから最も近くにいる者）が、実はニンジャスレイヤーの変装であった。
そのNPCのコマを【殺】に変更せよ（本物のNPCがどこにいったのかはニンジャマスターが後で考える）。
激しい恐怖や動揺により、次のターンの終了時まで、その場にいる【DKK】1以上のニンジャ全員は『連続側転難易度』が+2される。
`,
];

exports.ソウカイヤカルマロンダリング = [
    `**『痴れ者めが！』**：
君の行いは裏社会の掟や規律までも乱しかねないほど残虐で無軌道であったため、ラオモトの耳にも入っている。
狂犬を躾もせず野放しにしていては、ソウカイヤのビジネスに悪影響が出るだろう。
このニンジャは『◉ニンジャソウルの闇』を1個得た上、ケジメを強いられて【名声】が−1される。
本来は【名声】値下限は０だが、これにより【名声】がマイナス値となってしまったニンジャは、突如現れたダークニンジャによって抹殺される（キャラロスト）。
`,
    `**『ブレイコウも大概にせよ』**：
ソウカイヤは快楽殺人者の集団などではない。
ヤクザとしての強暴性や勇猛さは讃えられるが、無力なモータルの拷問や虐殺を重ねていい気になっているようなサンシタに未来はなかろう。
だが今回のところ、寛大なるラオモトは君の粗相を大目に見てくれた。
このニンジャは、望むならば『◉ニンジャソウルの闇』か『◉忠誠心：ソウカイヤ』のどちらかを1個得られる。
`,
    `**『面白い奴だ、これでサケでも飲むがいい！』**：
ラオモトは懐から無造作に万札束を取り出し、君に放り投げた。
このニンジャは【万札】10を得る。
また『◉忠誠心：ソウカイヤ』を1個得てもよい。
`,
    `**『面白い奴だ、これでサケでも飲むがいい！』**：
ラオモトは懐から無造作に万札束を取り出し、君に放り投げた。
このニンジャは【万札】10を得る。
また『◉忠誠心：ソウカイヤ』を1個得てもよい。
`,
    `**『ムハハハハ！　よいぞ、貴様の無慈悲さはワシを楽しませてくれる！』**：
君はラオモトから一目置かれる存在となった。
このニンジャの【名声】は+1される。
`,
    `**『どれ、ワシがひとつ稽古をつけてやろう』**：
ラオモトは立ち上がると上着を脱ぎ、カラテを構えた。
君はこの場で直々にカラテの稽古をつけてもらえることとなったのだ。
このニンジャは【カラテ】/【ニューロン】/【ワザマエ】のいずれかを1成長させされる。
もしくは、【カラテ】/【ニューロン】/【ワザマエ】のいずれかの『成長の壁』を1個取り除くことができる。
`,
    `**『ムッハハハハハハ！　お前には華がある！　これでさらに磨いておけ！』**：
ラオモトは懐から無造作に万札束を取り出し、君に放り投げる。
このニンジャの【名声】は+1され、さらに【万札】30を得る。
`,
    `**『見事な働きであった。お前はこれで、ヤクザの品格も学んでくるがいい』**：
ラオモトがぽんぽんと手を叩くと、控えていた金髪オイランたちが「オキナワ旅行」と書かれた大型のボードを高々と掲げ、君に手渡した。
これは極めて栄誉なことだ。
このニンジャの【名声】は+1され、さらに「マキモノ・オブ・シークレット・ニンジャアーツ」1個と、「オキナワ旅券」1枚を獲得する（【万札】10で売却してもよい）。
`,
    `**『いい面構えをしている。ヤクザの目だ』**：
数々の死線を乗り越え、人間性を捨ててゆく中で、君はいつしか成長の壁を超えていた。
このニンジャの【名声】は+1される。さらに【カラテ】/【ニューロン】/【ワザマエ】のいずれかを１成長させされる。
もしくは、【カラテ】/【ニューロン】/【ワザマエ】のいずれかの『成長の壁』を1個取り除くことができる。
また、望むならば『◉ニンジャソウルの闇』か『◉忠誠心：ソウカイヤ』のどちらかを1個得られる。
`,
    `**『ムハハハハハハ！　面白い！　貴様の無慈悲さはまるでカタナのようだ！』**：
ボスは君の働きぶりにご満悦だ。
このニンジャは【名声】＋2、または【万札】50を得る（どちらか好きな方を選べる）。
また、望むならば『◉ニンジャソウルの闇』か『◉忠誠心：ソウカイヤ』のどちらかを1個得られる。
`,
    `**『アッパレ！　好きな褒美を取らせよう！』**：
今宵のラオモトは特に上機嫌だ。
国宝級のカタナや美術品を持った妖しいオイランたちが君の前にずらりと並び、その中から好きなものを1つ選ぶように促す。
このニンジャの【名声】は+2される。
さらに現在の【名声】値に関係なく、【万札】30相当までの好きなレア等級のアイテムを1個獲得できる（ニンジャマスターは必要に応じて選択肢を用意しておくこと）。
`,
    `**『リー先生のラボへ行け。お前のニンジャソウルを確かめる必要がある』**：
ラオモト・カンはただならぬニンジャ存在感を感じ取った。
もしかすると、君に憑依していたのは単なるレッサーニンジャソウルなどではなく、グレーター級、あるいはアーチ級ソウルなのかもしれない。
正体が明かされるかどうかは不明だが、少なくとも、溢れ出すそのキリングオーラは周囲のソウカイニンジャから高いソンケイを勝ち取るだろう。
このニンジャの【名声】が+2される。
このニンジャの【ジツ】値を2成長させるか、もしくは【ジツ】の『成長の壁』を１つ取り除くことができる。
【ジツ】値を上昇させたくない場合、代わりに取得条件が揃っている◉系スキルを2個まで直ちに獲得できる（ソウルの力が技として目覚めたのだ）。
`,
];

exports.生い立ち = [
    `**11『○ジンクス』**：
特定のジンクスやブツメツなどを気にする昔気質の伝統主義者や敬虔なブッダ信奉者、あるいはアンタイブディスト（反ブッダ主義者）などであろう。

シナリオ開始時ごとにD6を振り、偶数なら【精神力】が+1、奇数なら【精神力】が-1される
（これにより【精神力】が0未満になる場合は、代わりに【体力】を-1する）。
この修正はそのシナリオの間のみ有効。

1つ選択：『◉知識：ストリートの流儀』『◉知識：宗教』『◉知識：オカルト』
`,
    `**12『○レッサー・ソンケイ』**：
ソンケイとは伝統的ヤクザたちが重んずるとされる精神的概念だ。
それはヤクザ者にとっての武士道のようなものであり、仏教における功徳にも似ている。
侠気に溢れた粋な行いを実践することでソンケイは磨かれて行き、やがてオーラのような存在感を放ち出す。
クランの構成員たちは自然と、そのような高いソンケイを持つ者に従うようになるという。

【名声】値を本来より+1した状態でスタートする。

1つ選択：『◉知識：ヤクザの流儀』『◉交渉：威圧』『◉交渉：共感』『◉交渉：鼓舞』
`,
    `**13『○凶悪指名手配犯』**：
「ここに来るまでに二人殺して来た」そう語るニンジャの服は赤い返り血に染まっていた。
ニンジャソウルの闇に飲まれて組織から粛清される日も、そう遠くはないだろう。

ゲームスタート時点から【万札】5と【DKK】2を持つ。
またシナリオ開始時に【DKK】が０だった場合、自動的に2まで上昇する。
1つ選択：『◉知識：犯罪』『◉知識：セキュリティ』『◉交渉：威圧』
`,
    `**14『○信心深い』**：
妙に信心深く、余暇のたびに宗教施設で真剣な懺悔や施しなどを行なったり、何らかの罪滅ぼしドネートをしている（あるいはそのような妄想かもしれない）。

余暇開始時ごとに、【万札】を−１して、代わりに【DKK】を−１してもよい。
これは余暇スロットを消費しない。

1つ選択：『◉知識：宗教』『◉知識：オカルト』『◉交渉：超然』
`,
    `**15『○ピンハネ』**：
裏社会で培ったストリートビジネスの知恵、持ち前の図太さ、もしくは経理の知識などを活かし、狡猾に上へのアガリをピンハネしている。

シナリオクリアごとに【万札】を追加で1得る。
加えて「モータルハント」時にも【万札】を追加で1得る（余暇中1回限り）。

1つ選択：『◉知識：犯罪』『◉知識：ドラッグ』『◉交渉：卑屈』
`,
    `**16『○ブラインドタッチ』**：
この者はホームポジジョンの構えに精通し、高速物理タイプができる。
もとは物理タイピング原理主義系のハッカー、もしくはエスイーなどのタイピング労働者だろう。

ハッキング判定時にダイスを1個追加で振れる。
生体LAN端子によるボーナスとは重複不可。

1つ選択：『◉知識：電子ウイルス』『◉知識：テックガジェット』『◉知識：ハッカーの流儀』『◉知識：サラリマンの流儀』
`,
    `**21『○錠前破り』**：
この者はかつてハック＆スラッシュ武装強盗団の一員として開錠役やトラップ排除役を担っていた。

ロック解除判定やトラップ解除判定でつねにダイスが+1個される。

1つ選択：『◉知識：カチグミエリア』『◉知識：セキュリティ』『◉知識：犯罪』
`,
    `**22『○言いくるめ』**：
この者は口達者で、出まかせによる言いくるめに秀でており、自らの機転とトークの力で何度も窮地を切り抜けてきた。
あるいはハック＆スラッシュ武装強盗団でオイラン役をつとめ、色仕掛けや誘惑やハニートラップを得意としていた。

「モータルハント」時に【万札】を追加で1得る（余暇中1回限り）。

2つ選択：『◉知識：ストリートの流儀』『◉交渉：欺き』『◉交渉：誘惑』『◉交渉：駆け引き』『◉交渉：共感』『◉交渉：卑屈』
`,
    `**23『○実家のカネ』**：
親の遺産か、退職金か、あるいは詐欺や銀行強盗などで得た金か……
潤沢とまでは言えないが、この者の家にはいくらかの蓄えがあり、それを使いつぶしながら生きてきた。
だがそれもじきに底をつこうとしている。

【万札】を本来よりも10多く所持してゲームを開始する。
また余暇開始時ごとにD6を振り、出目2〜6ならば遺産として【万札】1を得る。
出目1の場合、遺産が尽きたとみなされ、二度とこの効果を得られない。

1つ選択：『◉知識：サラリマンの流儀』『◉知識：貴族の流儀』『◉知識：高級嗜好品』
`,
    `**24『○電子戦争退役軍人』**：
電子戦争とは残存IPアドレスをめぐって2004年頃から始まったメガコーポ同士の企業間戦争であり、第一世代の生体LAN直結技術や様々なサイバネ兵器をも生み出した。
この者もかつて暗黒メガコーポの傭兵として戦い、その肉体にいくつもサイバネを埋め込んでいたが、電子戦争の終結とともにお払い箱となり、くすぶっていた。
電子戦争の時代を考えると年齢は30から40以上が望ましいが、若く設定したい場合は単純にメガコーポの傭兵上がりとすれば良いだろう。

「チャカガンx2と任意のグレネード1個」もしくは「▶︎生体LAN端子」を初期装備してゲームを開始する
（「▶︎生体LAN端子」はタダで獲得でき、望むならばさらにローンで初期装備サイバネを購入してよい）。

1つ選択：『◉知識：公僕の流儀』『◉知識：サラリマンの流儀』『◉知識：銃器』『◉知識：サイバネティクス』
`,
    `**25『○ガンマニア』**：
この者は重度のガンマニアであり、愛好する銃器を肌身離さず持ち歩き、チャンスさえあれば弾をバラまこうとする。

『◉トリガーハッピー』のスキルと「チャカガン」を初期装備する。
1つ選択：『◉知識：銃器』『◉知識：重工系メガコーポ』『◉知識：大型兵器』

`,
    `**26『○下劣なパパラッチ』**：
高性能のカメラアイを持つか、常に撮影用のビデオカメラなどを持ち歩くなどしており、決定的スクープやスナッフドキュメント現場の撮影に余念がない。

シナリオ中、ボス級の敵との戦闘中かつ2ターン目以降の自分の手番で、『回避ダイス』2個と「その他の行動」を消費することにより、『撮影判定』を行ってもよい。
『撮影判定』は【ワザマエ】を使用し、難易度はHARDである。
これに成功した場合、シナリオ終了時に【万札】をD3得る。
また撮影したシーンが極めて刺激的あるいはソウカイヤの利益となるような決定的映像だったとマスターが判断する場合、D3ではなく2D3の【万札】を得てもよい。

1つ選択：『◉知識：カチグミエリア』『◉交渉：欺き』『◉交渉：駆け引き』
`,
    `**31『○刀剣マニア』**：
この者は病的な刀剣収集マニアであり、戦利品と思しきカタナやダガーを（時には何本も）肌身離さず持ち歩いている。「
カタナ」を2本所持した状態でゲームをスタートする（他の初期装備アイテムがあれば捨てること）。
また鑑定眼にも優れているため、刀剣類をブラックマーケットに売却する際に【万札】を追加で1得られる。

1つ選択：『◉知識：伝統的アート』『◉知識：スポーツ』『◉交渉：駆け引き』
`,
    `**32『○ショドー十段』**：
日本社会においては達筆であると上から一目置かれ、また下位の者からは敬意を得られやすく、ソーシャル面で大きなアドバンテージを得られる。

各シナリオ終了後の評価タイムにおいて、このキャラはチームの報告書を自らのショドーによって提出したことにし、D6を振ってもよい。
出目が６だった場合、チームの評価が１段階向上するが、出目が１だった場合は慢心による誤字を指摘され評価が１段階下がる
（どちらの場合も評価リストの上限と下限を超えることはない）。

1つ選択：『◉知識：サラリマンの流儀』『◉知識：貴族の流儀』『◉知識：伝統的アート』
`,
    `**33『○元ハッカーカルト』**：
この者はかつてペケロッパ・カルトなどの電子カルト教団に所属していた。

永続的な【カラテ】-1と【ニューロン】+1の修正を受ける。
加えて「サイバーサングラス」または「▶︎生体LAN端子」を初期装備してゲームを開始してもよい。

1つ選択：『◉知識：電子ウイルス』『◉知識：テックガジェット』『◉知識：ハッカーの流儀』『◉知識：IRCネットワーク』
`,
    `**34『○スモトリ崩れ』**：
この者は2メートル近い見事な体躯を持ち、銃弾の一発や二発程度では致命傷とならない。
かつてはリキシ・リーグを目指す屈強で高潔なスモトリであったが、膝を壊して引退し、やがて汚れ仕事や邪悪行為に手を染めるようになった。
他の暗黒プロスポーツ選手に読み替えてもよい。

【体力】+2、【脚力】-1の修正を永続的に受ける（ニンジャの最低脚力2を無視する）。
1つ選択：『◉知識：スポーツ』『◉知識：ストリートの流儀』『◉知識：ヤクザの流儀』『◉知識：犯罪』
`,
    `**35『○アンタイブディズム・ブラックメタリスト』**：
聖職者襲撃や寺社仏閣放火を企むアンタイブディズム・ブラックメタリストの戦士たち。
多くの場合、顔は白塗りで、黒い長髪、下半身はレザーハカマ、上半身は裸という出で立ちである。
破壊発動ではなく音楽活動に勤しむ者たちもいる。

フランベルジュやグレートソードを初期装備してゲームを開始する（ルールはチェーンソーを使用）。
また『◉ニンジャソウルの闇』を1個持ってスタートしてもよい。

1つ選択：『◉知識：宗教』『◉知識：オカルト』『◉知識：現代的アート』
`,
    `**36『○元イタマエ』**：
この者はイタマエを志したことがあり、スシ製作知識だけでなく、ツキジ・マーケットなどとの古いコネクションも維持している。

ブラックマーケットでの買い物時、オーガニック・スシを本来より【万札】-1の価格で入手できる。
またオーガニック・トロスシを本来より【万札】-3の価格で入手できる。

1つ選択：『◉知識：伝統的アート』『◉知識：高級嗜好品』『◉知識：旧世紀地下道網』
`,
    `**41『○オイランドロイド偏愛』**：
ネコネコカワイイの狂信的ファン、すなわちNERDZであり、分解されたネコネコカワイイのレリックパーツを所有している。

レリック枠として「ブードゥー/聖遺物」を初期装備する。

1つ選択：『◉知識：オイランドロイド』『◉知識：テックガジェット』『◉知識：現代的アート』『◉知識：ファッション』
`,
    `**42『○堕落マッポ』**：
この者はかつて堕落したマッポや暴力デッカーであったが、ついに行き過ぎた悪事が露見して公職から追放されてしまった。
しかしかつてのコネやマッポ装備に関する知識は未だ健在である。

『◉憎悪（NPSD/ハイデッカー）』を持つ。
ブラックマーケットでの買い物時、トロ粉末を本来より【万札】-1の価格で入手できる。

1つ選択：『◉知識：公僕の流儀』『◉知識：ドラッグ』『◉知識：犯罪』
`,
    `**43『○キング・オブ・アーケード』**：
かつてはアーケードのゲームセンターに入り浸っており、禅TANKなどで反射神経を限界まで鍛え上げ、無慈悲なる狙撃手となった。

永続的な【カラテ】-１と【ワザマエ】+１の修正を受ける。

1つ選択：『◉知識：ストリートの流儀』『◉知識：銃器』『◉知識：スポーツ』『◉交渉：理路整然』
`,
    `**44『○アーチ級ニンジャソウルの片鱗』**：
この者はただならぬニンジャ存在感を発散していたり、覚醒時にソウルに由来する奇妙なヴィジョンを視たりしている。
あるいは「超能力者」「霊能力者」などと呼ばれる生来の特異能力者なのかもしれない。

このスキルを持つ者は、取得条件を満たしているジツ強化系スキル（☆◉）を1個持った状態でゲームを開始できる。
取得条件を満たすために、他の能力値いずれかを合計-２することで、【ジツ】値を+1してもよい（最大で【ジツ】値3まで）。
【ジツ】値0の場合、『◉◉戦闘系ニンジャソウル』が記憶スロットから呼び出せるような各種スキル種別のうち、取得条件を満たしいているものを1個持った状態でゲームを開始できる。

1つ選択：『◉知識：オカルト』『◉知識：古代ニンジャ文明』『◉交渉：超然』
`,
    `**45『○サイバーゴス』**：
この者は身体のサイバネ置換に対して一切の躊躇がなく、また神経系バイパス手術への適性が高い。
好きな「▷」を１個埋め込んだ状態でゲームを開始できる。
基部となる「▶︎」は通常どおり初期装備可能サイバネの中からローンによって選択する必要があるが、この生い立ちによる「▷」ぶんはタダで獲得できる。

1つ選択：『◉知識：サイバネティクス』『◉知識：ファッション』『◉知識：現代的アート』『◉交渉：誘惑』
`,
    `**46『○元湾岸警備隊』**：
湾岸警備隊はネオサイタマの湾岸部を守る海軍（ネイビー）めいた組織であるが、
必要とあらば市街地や、キョート共和国との国境地帯などでも作戦行動に従事するため、様々な軍用武器の取り扱いに精通することとなる。

「アサルトライフル」とレリック枠の「湾岸警備隊制式式グレネードベルト」を装備した状態でゲームを開始する。

1つ選択：『◉知識：公僕の流儀』『◉知識：水路港湾エリア』『◉知識：銃器』『◉知識：ビークル』『◉知識：大型兵器』
`,
    `**51『○元ヒキャク・パルクール』**：
ヒキャクとはパルクール訓練を積んだメッセンジャーの事で、複雑に入り組んだ都市の物流を支えている。

『◉常人の三倍の脚力』を持ってゲームを開始する。

1つ選択：『◉知識：カチグミエリア』『◉知識：水路港湾エリア』『◉知識：ビークル』『◉知識：サイバネティクス』
`,
    `**52『○危険生物ハンター』**：
この者は荒野部の出身であり、幼い頃から危険バイオ生物の脅威にさらされて生きてきた。

「ショットガン」を初期装備してゲームを開始する。
『◉憎悪：危険生物』を持ち、「種別：危険生物」への攻撃ダイス/射撃ダイスが+1個される。

1つ選択：『◉知識：山岳地帯』『◉知識：旧世紀地下道網』『◉知識：銃器』『◉知識：危険生物』『◉知識：バイオ系メガコーポ』
`,
    `**53『○キラーマシーン教育』**：
物心つく前からアサシンやヒットマンとしての教育を受けて育ったため、銃器の扱いには優れているが、感情や自己判断力が希薄化してしまっている。

永続的な【ニューロン】-１と【ワザマエ】+１の修正を受ける。
またチャカガンx２を初期装備できる。

1つ選択：『◉知識：銃器』『◉知識：サイバネティクス』『◉知識：犯罪』『◉知識：セキュリティ』
`,
    `**54『○テッポダマ』**：
この者は小規模なギャング団やヤンク暴走族などのチームリーダーを務めた経験があり、凶悪さと無慈悲さで知られている。
もしくはヤクザ組織の若きテッポダマであった。

『◉滅多斬り』『◉滅多打ち』『◉一瞬の勝機』『◉挑発』のいずれか１個を所持した状態でゲームを開始できる。

1つ選択：『◉知識：ストリートの流儀』『◉知識：ヤクザの流儀』『◉交渉：威圧』『◉交渉：共感』
`,
    `**55『○異端考古学者』**：
学会から追放された異端の考古学者であり、精神に深い傷を負っているが、ニンジャ真実と向かい合う心構えができている。

永続的な【ニューロン】-１の修正を受ける。
『◉不屈の精神』を得る。

2つ選択：『◉知識：古代ニンジャ文明』『◉知識：宗教』『◉知識：オカルト』『◉知識：伝統的アート』
`,
    `**56『○サイバネ賞金稼ぎ』**：
この者は裏社会の賞金首情報だけでなく、違法改造サイバネパーツの市場価値について深い知識を持つ。

シナリオ内で『重サイバネ』のNPCを殺害した場合（このキャラ本人ではなく仲間が殺害した場合でも）、その死体から追加で【万札】を1得られる。
それがボス級の敵でもあった場合、【万札】を追加で1ではなく5得られる。

1つ選択：『◉知識：サイバネティクス』『◉知識：重工系メガコーポ』『◉知識：犯罪』『◉交渉：駆け引き』
`,
    `**61『○ローグハッカー』**：
フィールドワークを得意とする一匹狼の活動的ハッカー。
旧世紀のハードウェアや基板に対して深い知識を持つ。

『キーボード・オブ・ゴールデン・エイジ』を初期装備している。

2つ選択：『◉知識：ハッカーの流儀』『◉知識：ビークル』『◉知識：電子ウイルス』『◉知識：テックガジェット』『◉知識：旧世紀地下道網』『◉知識：IRCネットワーク』
`,
    `**62『○エンジニア崩れ』**：
元エンジニアや職人、あるいはテックストリートチルドレンであり、ストリートに廃棄されたジャンク品の違法回収や分解などで糊口をしのいでいた。

『タカハシ・マスターツールキット』を初期装備してゲームを開始する。

2つ選択：『◉知識：ストリートの流儀』『◉知識：オイランドロイド』『◉知識：テックガジェット』『◉知識：旧世紀地下道網』『◉交渉：卑屈』
`,
    `**63『○放火魔』**：
この者は火と爆発に対して異常なまでの執着を持ち、とりわけ、無力なモータルが炎の中で絶叫しながら死んでゆくのを見ることに興奮をおぼえる。

「火炎放射器」を初期装備する。
また【DKK】を最初から１持ってスタートする。

1つ選択：『◉知識：犯罪』『◉交渉：威圧』『◉交渉：煽り』
`,
    `**64『○プロテインマニア』**：
この者は筋肉を過剰に鍛え上げることに対して病的なまでに執着しており、暇さえあれば腕立て伏せやダンベル運動、懸垂運動などを行っている。
実用性よりも重厚な筋肉の鎧を生み出すことを重点しているためバランスが悪く、筋肉ダルマめいた外見で、身体制御はややおぼつかない。

永続的な【カラテ】+１と【ワザマエ】-１の修正を受ける。

1つ選択：『◉知識：ファッション』『◉知識：スポーツ』『◉知識：ドラッグ』
`,
    `**65『○拷問好き』**：
この者は弱者（特に無力なモータル）を虐げることが三度の飯より好きだ。

『◉ニンジャソウルの闇』を持った状態でゲームをスタートする。
また【DKK】を最初から1持ってスタートする。
ジツ値を持っておらず、『◉ニンジャソウルの闇』を初期スキルに選択するならば、『◉邪悪なサディスト』も持った状態でゲームをスタートできる。

1つ選択：『◉知識：犯罪』『◉交渉：威圧』『◉交渉：超然』『◉交渉：共感』『◉交渉：誘惑』
`,
    `**66『○生粋のソウカイヤクザ』**：
ソウカイヤクザからニンジャとなった者であり、ラオモトの侠気に惚れ込んでいる。

『◉忠誠心：ソウカイヤ』を最初から1個、ないしは2個持ってスタートする（好きな個数を選べる）。

1つ選択：『◉知識：ストリートの流儀』『◉知識：ヤクザの流儀』『◉知識：ソウカイヤ』『◉知識：犯罪』
`,
];

exports.NRS発狂 = [
    `**絶叫**：
恐怖のあまり、その場で絶叫を上げる。

探索中の場合、近くの敵に存在を気づかれる可能性がある（シナリオ次第）。
戦闘中の場合、恐怖のあまり足がガクガクと震え、このターン終了まで【脚力】が0となり、『崩れ状態』とみなされる。
`,
    `**失禁**：
恐怖とトラウマのあまりその場で立ちすくみ、失禁する。

自尊心を失い【精神力】が-1される。
戦闘中の場合、足がすくんで手がブルブルと震え、このターン終了まであらゆる自発的行動の難易度が＋１され、【脚力】が１となり、『崩れ状態』とみなされる。
`,
    `**パニック逃走や異常行動**：
恐怖のあまり絶叫し、仲間を見捨ててその場から全速力で逃げ出そうとしたり、銃を持っている場合は見えない敵に向かって乱射しようとする。
あるいは仲間のことをニンジャだと思い込んで攻撃を仕掛けたり、理解不能な異常行動を取ったりする。

探索シーケンスの場合、直ちに戦闘シーケンスが発生してこのPCの手番となり、1ターンだけマスターがこのPCを操作する。
このPCは常軌を逸した身体能力を発揮し、【脚力】6として行動する。
マスターはこのPCに自傷行為以外のどんな行動を取らせてもよい。
このPCにとっては、あらゆるキャラが敵とみなされる。
このターンの終了時に、このPCは正気に戻る。
戦闘中の場合も同様で、次の手番にこの状態となる。
手番開始時に攻撃できる相手がニンジャしか見えていない場合、逃走を優先する。
`,
    `**ドゲザ**：
失禁し【精神力】に1ダメージ。
突然ドゲザによる命乞いを行うため、このターン終了時まで『麻痺状態』とみなされる。
`,
    `**激しい嘔吐や鼻血**：
【体力】と【精神力】にそれぞれ１ダメージを受ける。
戦闘中の場合、このターンのあらゆる判定難易度が+1される。
しかし目の前の脅威に立ち向かおうとする意志は砕けていない。
`,
    `**気絶**：
失禁し【精神力】に1ダメージ。
さらに打ち上げられたマグロめいてその場で倒れて口をパクパクとさせ、『気絶状態』となる。
戦闘が終了するか、一定時間が経過するか、誰かに蘇生してもらうまで、この状態は解除されない。
`,
    `**心臓発作や狂死**：
急激なニンジャリアリティショックに耐えきれず、PCは心臓発作やニューロン損傷を起こして【体力】0となり、その場に倒れ『気絶状態』となる。
ZBRアドレナリンでなければ蘇生できない。
処置を受けずに時間が経過すると死亡する。
`,
];
const 風流判定 = `※『風流判定』は【ワザマエ】のみを用いる特殊な判定であり、サイバネによるボーナスを一切得られない。
『知識：貴族の流儀』/『知識：伝統的アート』/『知識：ザイバツ』があれば、『風流判定』でそれぞれダイス+1個を得られる（上限は+3個）。
`;

exports.ザイバツカルマロンダリング = [
    `**『カァーッ！　そのほう、いささか身勝手が過ぎる。これはセプクものであるぞ！』**：
このニンジャは『風流判定：U-HARD』を行い、失敗すると【名声】が-1される。
本来の【名声】値下限は0だが、これにより【名声】がマイナス値となってしまったニンジャは、ザイバツ・シャドーギルドの本陣で見せしめとしてカマユデにされる（キャラロスト）。

` + 風流判定,
    `**『本来はカマユデであるが、ケジメで許して進ぜよう』**：
このニンジャは『風流判定：HARD』を行い、失敗すると【名声】が-1される。
この結果にかかわらず、望むならば『◉ニンジャソウルの闇』か『◉忠誠心：ザイバツ』のどちらかを1個得られる。

` + 風流判定,
    `**『ムフフ。そのほう、小気味良い無慈悲さである。褒美をとらせるゆえ、将来の支配階級としての奥ゆかしさを、さらに磨き上げよ』**：
このニンジャは【万札】5を得る。
『◉忠誠心：ザイバツ』を1個得てもよい。
『風流判定：HARD』に成功すると追加で【万札】5を得られる。

` + 風流判定,
    `**『どれ……そなたの装備は少々貧相であるな。ザイバツに相応しき瀟洒さを身に付けよ』**：
このニンジャは【万札】10までの伝統的防具または伝統的武器（ユミ/カタナ/ヤリ/ムチ/ノダチ）を1個授けられる。
【名声】5以上の場合は【万札】10ではなく【万札】20まで、【名声】10以上の場合は【万札】30までの中から1個獲得できる。
`,
    `**『お前の活躍があれば、ザイバツの世は近い。なお精進せよ』**：
君はパーガトリーを大いに喜ばせ、付き添いの上でホウリュウ・テンプル書庫への一時的アクセスを許可された。
ホウリュウ・テンプルには数々の禁断の書物や古文書が眠っているのだ。
このニンジャは「マキモノ・オブ・シークレット・ニンジャアーツ」を1個得る。
【名声】が5以上あり、『風流判定：U-HARD』に成功すれば、これは「*グレーター・マキモノ〜*」となる。

` + 風流判定,
    `**『良い手際と奥ゆかしさであった。暇を取らすゆえ、キョート城へ戻って参れ』**：
君は畏れ多くもパーガトリーの主催する貴族的茶会やハイク交流会に招かれ、他派閥のニンジャと交流を持つという栄誉を得た。
未だコネクションを持っていないザイバツのニンジャ1名を指名せよ。
これをユウジョウ判定の対象に加えられる。
また『風流判定：HARD』を行い、成功すると直ちにそのニンジャとの親密度を1段階得られる。
なお、グランドマスター級を対象とできるのは、【名声】15以上の場合のみである。

` + 風流判定,
];

const 絶対秩序判定 = `『絶対秩序判定』は【ニューロン】のみを用いる特殊な判定であり、サイバネによるボーナスを一切得られない。
『知識：公僕の流儀』/『知識：犯罪』/『知識：アマクダリ』があれば、『絶対秩序判定』でそれぞれダイス+1個を得られる（上限は+3個）。
`;

exports.アマクダリカルマロンダリング = [
    `**『あなたの存在は、不快です』**：
このニンジャは『絶対秩序判定：U-HARD』を行い、失敗すると【名声】が-2される。
本来の【名声】値下限は0だが、これにより【名声】がマイナス値となってしまったニンジャは、ジグラット地下で冷凍禁固刑に処される（キャラロスト）。

` + 絶対秩序判定,
    `**『その規律違反の数々、目に余る。冷凍禁固刑すらも視野に入る』**：
このニンジャは『絶対秩序判定：HARD』を行い、失敗すると【名声】が-1される。
この結果にかかわらず、望むならば『◉ニンジャソウルの闇』か『◉忠誠心：アマクダリ』のどちらかを1個得られる。

` + 絶対秩序判定,
    `**『誇りを持て。冷徹な秩序のためには、多少の犠牲は厭わぬ。秩序こそが最優先されるべきものだ』**：
このニンジャは『◉忠誠心：アマクダリ』を1個得てもよい。
`,
    `**『無法撲滅への道のりは遠い。アマクダリに忠誠を誓い、絶対の秩序の礎となれ』**：
このニンジャは『◉忠誠心：アマクダリ』を1個得てもよい。
『絶対秩序判定：HARD』を行い、これに成功した場合、【名声：アマクダリ】が+1される。

` + 絶対秩序判定,
    `**『良い働きだ。経費を申請し、装備を整えよ。冷徹なる法の執行者にふさわしき装備を』**：
このニンジャは【万札】10までのアイテム/装備を1個獲得できる。
【名声】5以上の場合は【万札】10ではなく【万札】20まで、【名声】10以上の場合は【万札】30までの中から1個獲得できる。
`,
    `**『その無慈悲な遂行能力と忠誠心を高く評価する。次回のアマクダリ政財社交界に、護衛として参加せよ』**：
君はジャスティスに気に入られ、他のニンジャとの面通しの機会を得た。
未だコネクションを持っていないアマクダリ/湾岸警備隊/ヨロシサンのニンジャ1名を指名せよ。
これをユウジョウ判定の対象に加えられる。
また『絶対秩序判定：HARD』を行い、成功すると直ちにそのニンジャとの親密度を1段階得られる。
なお、幹部級を対象とできるのは、【名声】15以上の場合のみである。

` + 絶対秩序判定,
];

exports.オムラカルマロンダリング = [
    `**『お前はバカか！？　やりすぎだ！　広告効果以上の損害が出ているじゃないか！　廃棄処分にするぞ！？』**：
CEOのお叱りを受け【名声】が-1される。
『◉忠誠心：オムラ社』を1個失ってよい。
`,
    `**『なんだこれは？　殺し方がセコいんだよ！　もっと火力を強化して派手に破壊しろ！　爆発で広告効果倍増だ！』**：
このニンジャは【万札】10相当の自社製品チケットと『◉忠誠心：オムラ社』を1個得られる。
`,
    `**『明日の朝礼はお前の活躍について話す！　お前こそはオムラ社の誇りだ！　臨時ボーナスをくれてやる！』**：
このニンジャは【万札】10と『◉忠誠心：オムラ』を1個得られる。
`,
    `**『いいぞ！　派手にやってきたじゃないか！　お前のスゴサは必ずや、我が社のイノベーションを加速させる！』**：
このニンジャは【万札】25相当の自社製品チケットを得られる。
『◉忠誠心：オムラ』を1個得られる。
`,
    `**『すごいぞ、２倍量ボーナスだ！　わかってるだろうが、下層市民なんて蟻だ！
お前がどれだけ踏み殺したって問題はない！　オムラという巨大なマシーンが前進することが大事なんだ！』**：
このニンジャは【万札】20を得る。
『◉忠誠心：オムラ』を強制的に1個得てしまう。
`,
    `**『モーターヤッター！　お前こそはモーター理念の申し子だ！
僕のヴィジョンを破壊と爆炎で実現するニンジャだ！　次会う時までに、さらに火力を増やしておけ！！』**：
このニンジャは【万札】50相当の自社製品チケットを得られる。
『◉忠誠心：オムラ』を強制的に1個得てしまう。
`,
];

exports.ヨロシサンカルマロンダリング = [
    `**『勝手な行動ばかり取りおって！　この不良品めが！　セプクじゃ！　直ちにセプクせよーッ！』**：
CEOのお叱りを受けセプクする（キャラロスト）。
君のデータは他のバイオニンジャに引き継がれるだろう。
`,
    `**『お前の肉体と精神は、全てヨロシ社の所有物なのです。この私の所有物でもある。今後も、そこをよく弁えるように』**：
このニンジャは【万札】10相当の自社製品チケットを得る。
『◉忠誠心：ヨロシサン』を1個得るか、あるいは1個失ってもよい。
`,
    `**『良い働きです。明日の秩序とヨロシサンのためにも休息は必要。この臨時ボーナスを持ってお行きなさい』**：
このニンジャは【万札】10と『◉忠誠心：ヨロシサン』を1個得られる。
`,
    `**『何が欲しいのか、口に出して言ってみなさい。
その手足やニューロンだけでなく、DNAの中までもっと改造して欲しいのでしょう？　ヨロシサンの一部となりたいのでしょう？』**：
このニンジャは【万札】25相当の自社製品チケットを得られる。
『◉忠誠心：ヨロシサン』を1個得られる。
`,
    `**『良い成果でした。こちらへ来て、我が前に跪きなさい。ほら、これは臨時ボーナスです。明日も、ヨロシサン』**：
このニンジャは【万札】20を得る。
『◉忠誠心：ヨロシサン』を強制的に1個得てしまう。
`,
    `**『フフフ。どれ、近うよれ。お前は我が社の誇りじゃ。
次はこの私直々に、ヨロシDNAの追加注入と新たなバイオ強化手術の手続きを行ってくれよう』**：
このニンジャは【万札】40相当の自社製品チケットを得られる。
『◉忠誠心：ヨロシサン』を強制的に1個得てしまう。
`,
];

exports.NSRS発狂 = [
    `**絶叫**：
恐怖のあまり、その場で絶叫を上げる。

探索中の場合、近くの敵に存在を気づかれる可能性がある（シナリオ次第）。
戦闘中の場合、恐怖のあまり足がガクガクと震え、このターン終了まで【脚力】が0となり、『崩れ状態』とみなされる。
`,
    `**失禁**：
恐怖とトラウマのあまりその場で立ちすくみ、失禁する。

自尊心を失い【精神力】が-1される。
戦闘中の場合、足がすくんで手がブルブルと震え、このターン終了まであらゆる自発的行動の難易度が＋１され、【脚力】が１となり、『崩れ状態』とみなされる。
`,
    `**パニック逃走や異常行動**：
恐怖のあまり絶叫し、仲間を見捨ててその場から全速力で逃げ出そうとしたり、闇雲にスリケンやジツを乱射しようとする。
ひどい状態になると、仲間のことをニンジャスレイヤーの変装や協力者だと思い込んで攻撃を仕掛けたり、理解不能な異常行動を取ったりする。

探索シーケンスの場合、直ちに戦闘シーケンスが発生してこのPCの手番となり、1ターンだけマスターがこのPCを操作する。
このPCは常軌を逸した身体能力を発揮し、【脚力】6として行動する。
マスターはこのPCに自傷行為以外のどんな行動を取らせてもよい。
このPCにとっては、あらゆるキャラが敵とみなされる。
このターンの終了時に、このPCは正気に戻る。
戦闘中の場合も同様で、次の手番にこの状態となる。
手番開始時に攻撃できる相手がニンジャスレイヤーしか見えていない場合、逃走を優先する。
`,
    `**ドゲザや命乞い**：
失禁し【精神力】に1ダメージ。
突然ドゲザや見苦しい命乞いを行うため、このターン終了時まで『麻痺状態』とみなされる。
`,
    `**激しい嘔吐や鼻血**：
【体力】と【精神力】にそれぞれ１ダメージを受ける。
戦闘中の場合、『崩れ状態』となり、このターンのあらゆる判定難易度が+1される。
しかし目の前の脅威に立ち向かおうとする意志は砕けていない。
`,
    `**気絶**：
失禁し【精神力】にD3ダメージ。
さらに打ち上げられたマグロめいてその場で倒れて口をパクパクとさせ、恐怖に凍りつく。

PCはこのターン終了時まで『気絶状態』となる。
`,
    `**心臓発作や発狂**：
ナラク・ニンジャの存在を感知した内なるニンジャソウルが恐怖の悲鳴をあげる。

PCは精神崩壊やニューロン損傷を起こし、【体力】と【精神力】にそれぞれD3ダメージを受ける。
これでも気絶/死亡しなかった場合、更にD3+1（ \`/nd NSRS発狂,d\` ）を振って「失禁」「パニック逃走」「ドゲザや命乞い」のいずれかの効果を受ける。
`,
];
