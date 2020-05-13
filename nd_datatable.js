/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
exports.dataTable = {
    サツバツ: {
        dice: { 'a': '1d6' },
        data: {
            1: '**「死ねーッ！」腹部に強烈な一撃！　敵はくの字に折れ曲がり、ワイヤーアクションめいて吹っ飛んだ！**：本来のダメージ＋１ダメージを与える。敵は後方の壁または障害物に向かって、何マスでもまっすぐ弾き飛ばされる（他のキャラのいるマスは通過する）。壁または障害物に接触した時点で、敵はさらに１ダメージを受ける。敵はこの激突ダメージに対して改めて『回避判定』を行っても良い。',
            2: '**「イヤーッ！」頭部への痛烈なカラテ！　眼球破壊もしくは激しい脳震盪が敵を襲う！**：本来のダメージを与える。さらに敵の【ニューロン】と【ワザマエ】がそれぞれ１ずつ減少する（これによる最低値は１）。残虐ボーナスにより【万札】がD３発生。この攻撃を【カルマ：善】のキャラに対して行ってしまった場合、【DKK】がD３上昇する。',
            3: '**「苦しみ抜いて死ぬがいい」急所を情け容赦なく破壊！**：本来のダメージ＋１ダメージを与える。耐え難い苦痛により、敵は【精神力】が–２され、【ニューロン】が１減少する（これによる最低値は１）。残虐ボーナスにより【万札】がD３発生。この攻撃を【カルマ：善】のキャラに対して行ってしまった場合、【DKK】がD３上昇する。',
            4: '**「逃げられるものなら逃げてみよ」敵の脚を粉砕！**：本来のダメージを与える。さらに敵の【脚力】がD３減少する（最低値は１）。残虐ボーナスにより【万札】がD３発生。この攻撃を【カルマ：善】のキャラに対して行ってしまった場合、【DKK】がD３上昇する。',
            5: '**「これで手も足も出まい！」敵の両腕を切り飛ばした！　鮮血がスプリンクラーめいて噴き出す！**：本来のダメージ＋１ダメージを与える。さらに敵の【ワザマエ】と【カラテ】がそれぞれ２減少する（最低値は１）。残虐ボーナスにより【万札】がD３発生。この攻撃を【カルマ：善】のキャラに対して行ってしまった場合、【DKK】がD３上昇する。',
            6: '**「イイイヤアアアアーーーーッ！」ヤリめいたチョップが敵の胸を貫通！　さらに心臓を掴み取り、握りつぶした！　ナムアミダブツ！**：敵は残り【体力】に関係なく即死する。残虐ボーナスにより【万札】がD６発生。この攻撃を【カルマ：善】のキャラに対して行ってしまった場合、【DKK】がD６上昇する。',
        },

    },
    wasshoiエントリー: {
        dice: { 'a': '1d6' },
        data: {
            1: '**高所からの回転着地！タタミ四枚の距離で睨み合った！**：標的ニンジャから３または４マス離れた任意の場所に【殺】コマを置くこと。',
            2: '**ドアを蹴破って出現！**：そのマップの任意のドアの隣に【殺】コマを置くこと。マップ外に繋がるドアならばどれを選んでも良い。またマップ内の別部屋につながるドアの場合でも、他のPCがいない部屋からの出現になるならば、どこを選んでも良い。なお、ドアにあらかじめ鍵をかけるなどの行為は全て無駄である。',
            3: '**天井破壊または垂直リフト射出により出現！**：標的ニンジャから２マス離れた任意の場所に【殺】コマを置くこと。',
            4: '**冷蔵庫や金庫から突如出現！**：そのマップ上に存在するトレジャーボックスの中に、ニンジャスレイヤーが潜んでいた。標的ニンジャから最も近いトレジャーボックス１個の隣に【殺】コマを置くこと。',
            5: '**KRAAAAASH！ 窓を突き破り出現！**：標的ニンジャから最も近い窓の隣に【殺】コマを置くこと。窓がマップにない場合は「２：ドアを蹴破って出現」になる。',
            6: '**「行き先はジゴクですよ」**：マップ上にいるモータル１人（標的ニンジャから最も近くにいる者）が、実はニンジャスレイヤーの変装であった。そのモータルのコマを【殺】に変更せよ。驚きのあまり、標的ニンジャは次の手番に『ウカツ！』状態となる。',
        },
    },
    ジツ拡張サイバネ暴走: {
        dice: {
            'a': '1d6',
            'b': '1d6+1',
            'd': '1d6',
            'd6': '1d6',
            '1d': '1d6',
            '1d6': '1d6',
            'd+1': '1d6+1',
            '1d+1': '1d6+1',
            'd6+1': '1d6+1',
            '1d6+1': '1d6+1',
        },
        data: {
            1: '**「ナムアミダブツ！」：**サイバネ回路が異常暴走し、術者のニューロンを焼く。術者はサイバネから火花を散らして叫び、おびただしい鼻血を垂らしたり血の涙を流して、直ちに【精神力】に1ダメージを受ける。',
            2: '**「ナムアミダブツ！」：**サイバネ回路が異常暴走し、術者のニューロンを焼く。術者はサイバネから火花を散らして叫び、おびただしい鼻血を垂らしたり血の涙を流して、直ちに【精神力】に1ダメージを受ける。',
            3: '**「ナムアミダブツ！」：**サイバネ回路が異常暴走し、術者のニューロンを焼く。術者はサイバネから火花を散らして叫び、おびただしい鼻血を垂らしたり血の涙を流して、直ちに【精神力】に1ダメージを受ける。',
            4: '**「アイエエエエエエ！」：**オヒガンの奥底に眠るカツ・ワンソーの凝視を引き寄せ、術者のニンジャソウルが悲鳴をあげる（無論、ほとんどのニンジャにとっては何が起こっているのか理解できず、一時的な恐慌状態に陥るのみだ）。\n**術者は「ナムアミダブツ！」の効果（直ちに【精神力】に1ダメージを受ける）に加え、同じジツをこのシナリオ内で再使用するには、暴走事故の恐怖を克服するために本来よりも【精神力】を１多く支払わねばならなくなる（この効果は累積する）。**',
            5: '**「アイエエエエエエ！」：**オヒガンの奥底に眠るカツ・ワンソーの凝視を引き寄せ、術者のニンジャソウルが悲鳴をあげる（無論、ほとんどのニンジャにとっては何が起こっているのか理解できず、一時的な恐慌状態に陥るのみだ）。\n**術者は「ナムアミダブツ！」の効果（直ちに【精神力】に1ダメージを受ける）に加え、同じジツをこのシナリオ内で再使用するには、暴走事故の恐怖を克服するために本来よりも【精神力】を１多く支払わねばならなくなる（この効果は累積する）。**',
            6: '**「バカナ！ こんな、こんなはずでは……！」：**制御不能となったジツが暴発する！　術者は「ナムアミダブツ！」の効果（直ちに【精神力】に1ダメージ）を受ける。\n**そのジツが直ちにダメージを与えるようなものだった場合、そのダメージは全て＋１されるが、本来は味方を巻き込まないはずのジツであったとしても、味方を巻き込んでしまう（範囲ではなく敵単体をターゲットにするようなジツだった場合は、その敵に隣接する不運な味方がいた場合、その味方にも同じ効果が与えられてしまう。そのような味方が複数いる場合は１人をランダムに選択する）。**\nそれがムテキやヘンゲなど自分をターゲットにするジツだった場合は、術者は「ナムアミダブツ！」の効果に加え、【体力】に対して直ちに回避不能のD3ダメージを受けるが、効果が本来よりも１ターン長く継続する。特殊なジツの場合は、NMがこのどちらにするか決めること。',
            7: '**「バカナ！ こんな、こんなはずでは……！」：**制御不能となったジツが暴発する！　術者は「ナムアミダブツ！」の効果（直ちに【精神力】に1ダメージ）を受ける。\n**そのジツが直ちにダメージを与えるようなものだった場合、そのダメージは全て＋１されるが、本来は味方を巻き込まないはずのジツであったとしても、味方を巻き込んでしまう（範囲ではなく敵単体をターゲットにするようなジツだった場合は、その敵に隣接する不運な味方がいた場合、その味方にも同じ効果が与えられてしまう。そのような味方が複数いる場合は１人をランダムに選択する）。**\nそれがムテキやヘンゲなど自分をターゲットにするジツだった場合は、術者は「ナムアミダブツ！」の効果に加え、【体力】に対して直ちに回避不能のD3ダメージを受けるが、効果が本来よりも１ターン長く継続する。特殊なジツの場合は、NMがこのどちらにするか決めること。',
        },
    },

    暗黒カラテ衝動: {
        dice: { 'a': '1d6' },
        data: {
            1: '**破壊衝動：**\nこのニンジャは残虐な暴力衝動や殺戮衝動に呑まれやすくなったり、思考回路から人間性が失われてゆく。シナリオ内で【DKK】を獲得できるようなシチュエーションが目の前にある場合、可能な限りそれを得るような行動を取らねばならない。行動を強いられたくない場合、【精神力】を１消費すれば、このマップにいる間だけこの衝動を克服する。アーチ級ソウル憑依者の場合は【精神力】を１ではなく２消費する必要がある。',
            2: '**非ニンジャのクズめが！：**\nモータルなど脆弱な虫ケラにすぎず、そのような者に自分が傷つけられるはずはない。種別に『モータル』を持つ敵に対しての攻撃および回避時に、【精神力】を使用できなくなる。アーチ級ソウル憑依者の場合は、種別『戦闘兵器』も対象となる。',
            3: '**徹底抗戦：**\n極めて傲慢かつ自尊心が高いため、自分を挑発したり傷つけてきた敵の存在を許さない。たとえそれがネオサイタマの死神であろうとも。ダメージを受けたかどうかに関わらず敵から攻撃を受けた場合、ないしは露骨な挑発や侮辱を受けた場合、その敵が死ぬまで自分からマップ外への離脱を行うことはなく、また敵が命乞いなどをしたとしても必ず惨たらしく皆殺しにしようとする。【精神力】を１消費すれば、この衝動を克服できる（モブ多数の場合はまとめて1個とみなしてよい）。アーチ級ソウル憑依者の場合は【精神力】を１ではなく２消費する必要がある。',
            4: '**自我干渉：**\n本来は憑依と同時に消滅するはずであったソウルの記憶断片や声や自我のごく一部が、憑依者の精神に対してノイズのように残留してフラッシュバックを起こし、判断力や身体制御を狂わせる。このニンジャは「【精神力】−１」もしくは「回避ダイス−１個、近接攻撃ダイス−１個、遠隔攻撃ダイス−１個」どちらかの効果を受ける（取得時にどちらかを宣言し、取得後は変えられない）。アーチ級ソウル憑依者の場合はこれを両方、もしくは、どちらかの効果を２倍得る（取得時に宣言し、取得後は変えられない）。',
            5: '**ソウルの悲鳴：**\nニンジャスレイヤーおよび妖刀ベッピンを持つダークニンジャと戦闘に入った場合、ソウルそのものが堪え難い恐怖を覚え、浮き足立ち、震え上がる（憑依者自身はその理由を明確には理解できないだろう）。これらの敵からこのPCに対する『近接攻撃』と『遠隔攻撃』は全て『ウカツ！』状態に対する攻撃とみなされて難易度が−１される。加えて、このPCがこれらの敵に対して行う『近接攻撃』および『遠隔攻撃』は、全て難易度が＋１される。【精神力】２を消費すれば、そのシナリオ中のみこの衝動を克服する。アーチ級ソウル憑依者の場合は【精神力】を２ではなく４消費する必要がある。',
            6: '**ソウルの悲鳴：**\nニンジャスレイヤーおよび妖刀ベッピンを持つダークニンジャと戦闘に入った場合、ソウルそのものが堪え難い恐怖を覚え、浮き足立ち、震え上がる（憑依者自身はその理由を明確には理解できないだろう）。これらの敵からこのPCに対する『近接攻撃』と『遠隔攻撃』は全て『ウカツ！』状態に対する攻撃とみなされて難易度が−１される。加えて、このPCがこれらの敵に対して行う『近接攻撃』および『遠隔攻撃』は、全て難易度が＋１される。【精神力】２を消費すれば、そのシナリオ中のみこの衝動を克服する。アーチ級ソウル憑依者の場合は【精神力】を２ではなく４消費する必要がある。',
        },
    },
    カルマロンダリング: {
        dice: {
            'a': '1d6',
            'b': '1d6+1',
            'c': '2d6',
            'd': '1d6',
            'd6': '1d6',
            '1d': '1d6',
            '1d6': '1d6',
            'd+1': '1d6+1',
            '1d+1': '1d6+1',
            'd6+1': '1d6+1',
            '1d6+1': '1d6+1',
            '2d': '2d6',
            '2d6': '2d6',
        },
        data: {
            1: '**『痴れ者めが！』：**\n君の行いは、裏社会の掟や規律までも乱しかねないほど残虐で無軌道であったため、ラオモトの耳にも入っている。狂犬を躾もせず野放しにしていては、ソウカイヤのビジネスに悪影響が出るだろう。\n**このPCはケジメを強いられて【名声：ソウカイヤ】が−3され、さらに『ニンジャソウルの闇』を獲得してしまう。通算で３回『痴れ者めが！』を出してしまった場合、そのPCは突如現れたダークニンジャにより抹殺される（キャラロスト）。**',
            2: '**『ブレイコウも大概にせよ』：**\nソウカイヤは快楽殺人者の集団ではない。ヤクザとしての強暴性は讃えられるが、無力なモータルの拷問や虐殺を重ねていきがっているようなサンシタに未来はなかろう。\n**このPCの【名声：ソウカイヤ】は-１される。**',
            3: '**『面白い奴だ、これでサケでも飲むがいい！』：**\nラオモトは懐から無造作に万札束を取り出し、君に放り投げる。\n**このPCは【万札】10を得る。**',
            4: '**『面白い奴だ、これでサケでも飲むがいい！』：**\nラオモトは懐から無造作に万札束を取り出し、君に放り投げる。\n**このPCは【万札】10を得る。**',
            5: '**『ムハハハハ！　よいぞ、貴様の無慈悲さはワシを楽しませてくれる！』：**\n君はラオモトから一目置かれる存在となった。\n**このPCの【名声：ソウカイヤ】は＋１される。**',
            6: '**『どれ、ワシがひとつ稽古をつけてやろう』：**\n君は今すぐラオモトと１対１でタタミの上で戦うことが許される（実際に戦闘すること）。\n**ラオモトとの戦闘終了後、このPCの【名声：ソウカイヤ】は＋１され、さらに【カラテ】/【ニューロン】/【ワザマエ】のいずれかを１上昇させされる。その能力値が６だった場合、『成長の壁（１）』を取り除き７となる。なお、この戦闘時は、双方ともに爆発四散も『サツバツ！』も発生せず、『サツバツ！』が決まった瞬間に戦闘終了となる。ラオモトに対して『サツバツ！』を決めた場合、腕を見込まれ【名声】が＋D３される。**',
            7: '**『ムッハハハハハハ！　お前には華がある！　これでさらに磨いておけ！』：**\nラオモトは懐から無造作に万札束を取り出し、君に放り投げる。\n**このPCの【名声：ソウカイヤ】は＋１され、さらに【万札】30を得る。**',
            8: '**『見事な働きであった。お前はこれで、ヤクザの品格も学んでくるがいい』：**\nラオモトがぽんぽんと手を叩くと、控えていた金髪オイランたちが「オキナワ旅行」と書かれた大型のボードを高々と掲げ、君に手渡す。\n**このPCの【名声：ソウカイヤ】は＋２され、さらにオキナワ旅券を１枚獲得する（【万札】10で売却してもよい）。**',
            9: '**『いい面構えをしている。ヤクザの目だ』：**\n死線を乗り越え、人間性を捨ててゆく中で、君はいつしか元モータルとしての壁を超えていた。\n**このPCの【名声：ソウカイヤ】は＋１され、さらに【カラテ】/【ニューロン】/【ワザマエ】のいずれかを１成長させされる。その能力値が６だった場合、『成長の壁（１）』を取り除き７となる。**',
            10: '**『ムハハハハハハ！　面白い！　貴様の無慈悲さはまるでカタナのようだ！』：**\nボスは君の働きぶりにご満悦だ。\n**このPCは【名声：ソウカイヤ】＋２、または【万札】50を得る（どちらか好きな方を選べる）。さらにD6を振り、出目が1-3ならば『ニンジャソウルの闇』までも得てしまう。**',
            11: '**『アッパレ！　好きな褒美を取らせよう！』：**\n今夜のラオモトは特に機嫌が良いようだ。\n**このPCの【名声：ソウカイヤ】は＋２される。さらに「NINJA SLAYER RPGプラグイン：リボルバー・アンド・ヌンチャク」から、レア度「*」かつ【万札】50までのアイテムを１個獲得できる（プラグインを導入していない場合は「キーボード・オブ・ゴールデン・エイジ」「マキモノ・オブ・シークレット・ニンジャアーツ」「ボンサイ・オブ・ダークネス」から選択すること）。**',
            12: '**『リー先生のラボへ行け。お前のニンジャソウルを確かめる必要がある』：**\nラオモト・カンはただならぬニンジャ存在感を感じ取った。もしかすると、君に憑依していたのは単なるレッサーニンジャソウルなどではなく、グレーター、あるいはアーチ級ソウルだったのかもしれない。正体が明かされるかどうかは不明だが、少なくとも、溢れ出すそのキリングオーラは周囲のソウカイニンジャたちから高いソンケイを勝ち取るだろう。\n**このPCの【ジツ】値が１上昇し、【名声：ソウカイヤ】が＋３される。また『NINJA SLAYER RPGプラグイン：ウェイ・オブ・ザ・リアルニンジャ』の表を使い、憑依ニンジャソウルの格と種類を鑑定すること（プラグインを導入しない場合、およびすでにこの結果を一度得ている場合は無視する）。**',
        },
    },
    サイバネ狂気判定: {
        dice: { 'a': '2d6' },
        data: {
            2: '**サイバネティクスへの狂信**\n**１段階目（重篤）：**余暇ごとに可能な限りサイバネ手術を行い、最低でも１個は組み込み総数を増やすようにしなければならない。能力値の上限に達し、それ以上の組み込みができない場合は、▷系のパーツを新たなものに換装しようとしなければならない。【万札】が不足している場合、ローンしてでも新たなものを組み込んだり換装しようとしたりする。これらの衝動を満たせなかった場合、極度のフラストレーションにより、次のシナリオは【体力】-１、【精神力】-１でスタートしなければならず、また旅行などによるリラクゼーション効果も得られない。加えて、シナリオ中にサイバネを破壊された場合、追加で【精神力】へのダメージを１受ける。\n**２段階目：**なし。同じ目が出たらダイスを振り直す。',
            3: '**LAN直結衝動**\n**１段階目（重篤）：**非戦闘時、直結可能な端子を見たら、どれだけ危険でも迷わずLAN直結してしまう（非戦闘時はケーブル装備必要なし）。それがハッキング可能なものだった場合、ハッキングを必ず試みなければならならない。生体LANを持つNPCに対してもこれが起こりうる（NM判断によりLAN直結戦闘が開始してしまう）。一度ハッキングや直結戦闘を行えば、その対象については満足を覚える。この衝動が起こるかどうかは常にNMが判断する。この衝動を振り切りたい場合は【精神力】を１消費しなければならない。\n**２段階目：**なし。同じ目が出たらダイスを振り直す。',
            4: '**獣化/黒い復讐心**\n**１段階目（中等度）：**戦闘中に１ダメージでも受けた場合、次の手番からその相手（敵味方問わず）に対して可能な限り接近し、近接攻撃を仕掛けなければならない（近接攻撃が届かなければ移動後に射撃やジツを使ってもよい。**行動優先度は「非移動の攻撃集中」＞「接近のための移動ののち近接攻撃」＞「接近のための移動ののちジツや遠隔武器による攻撃」となる）**。また、この敵に対する近接攻撃ダイスは＋１個される。別な敵から新たなダメージを受けた場合、攻撃目標をこの新たな相手に切り替えてもよい。この効果は戦闘が終了するか、その敵が戦闘不能になるか、あるいは自分の手番の開始時に【精神力】を１消費してこの衝動を振り払うまで持続する。\n**２段階目（重篤）：**上記に加え、火に対して原初的な恐怖を抱き始める。火炎や爆発による１以上のダメージを受けた場合、追加で【精神力】にもダメージ１を受ける。\n**３段階目：**なし。同じ目が出たらダイスを振り直す。',
            5: '**自我希薄化**\n**１段階目（軽度）：**自発的行動での『精神力成功』に必要な【精神力】が１増加する。\n**２段階目（中等度）：**自発的行動での『精神力成功』に必要な【精神力】が２増加する。また【精神力】が−１される。\n**３段階目（重篤）：**自発的行動での『精神力成功』が不可能となる。また【精神力】が−２される。',
            6: '**虚無衝動/強化肉体への過信**\n**１段階目（軽度）：**回避判定での『精神力成功』に必要な【精神力】が１増加する。\n**２段階目（中等度）：**回避判定での『精神力成功』に必要な【精神力】が２増加する。『サツバツ！』に対する回避の『精神力成功』が不可能になる。\n**３段階目（重篤）：**あらゆる回避判定での『精神力成功』が不可能となる。',
            7: '**狂戦士化/過剰戦闘衝動**\n**１段階目（軽度）：**戦闘中に近接攻撃によって1ダメージでも受けるか与えた場合、その戦闘が終わるまで【カラテ】判定のダイスが２個増え、回避ダイスが２個減る。\n**２段階目（中等度）：**戦闘中に近接攻撃によって1ダメージでも受けるか与えた場合、その戦闘が終わるまで【カラテ】判定のダイスが４個増え、回避ダイスが４個減る。\n**３段階目（重度）：**戦闘中に近接攻撃によって1ダメージでも受けるか与えた場合、その戦闘が終わるまで【カラテ】判定のダイスが６個増え、回避ダイスが６個減る。',
            8: '**薬物依存/バイオインゴット欠乏症**\n**１段階目（軽度）：**消費アイテムによる【体力】および【精神力】の回復量が−１される（最低値は回復量０）。ZBR蘇生は例外。\n**２段階目（中等度）：**消費アイテムによる【体力】および【精神力】の回復量が−２される（最低値は回復量０）。ZBR蘇生は例外。また【精神力】が−１される。\n**３段階目（重篤）：**消費アイテムによる【体力】および【精神力】の回復量が−３される（最低値は回復量０）。ZBR蘇生は例外。また【精神力】が−２される。',
            9: '**神経ノイズ/電子幻覚**\n**１段階目（軽度）：**このニンジャは【ワザマエ】−１の永続的ペナルティを受ける。また回避ダイスが−１個される。\n**２段階目（中等度）：**このニンジャは【ワザマエ】−２の永続的ペナルティを受ける。また回避ダイスが−２個される。\n**３段階目（重篤）：**このニンジャは【ワザマエ】−３の永続的ペナルティを受ける。また回避ダイスが−３個される。',
            10: '**残存記憶のゴースト**\n**１段階目（軽度）：**アトモスフィアがハード化した場合、回避ダイスが−１個され、以降戦闘終了まで１ターンごとに−１個ずつ増えてゆく。\n**２段階目（中等度）：**アトモスフィアがハード化した場合、回避ダイスが−２個され、以降戦闘終了まで１ターンごとに−２個ずつ増えてゆく。また【精神力】が−１される。\n**３段階目（重篤）：**アトモスフィアがハード化した場合、回避ダイスが−３個され、以降戦闘終了まで１ターンごとに−３個ずつ増えてゆく。また【精神力】が−２される。',
            11: '**自我崩壊/精神崩壊**\n**１段階目（軽度）：**このニンジャは【ニューロン】−１の永続的ペナルティを受ける。\n**２段階目（中等度）：**このニンジャは【ニューロン】−２の永続的ペナルティを受ける。\n**３段階目（重篤）：**このニンジャは【ニューロン】−４の永続的ペナルティを受ける。',
            12: '**狂気の中の真実**\n**１段階目（軽度）：**『●不屈の精神』を自動取得する（◉として持っている場合は代わりに【精神力】が＋１される）。\n**２段階目（中等度）：**１段階目に加え【精神力】が＋２される。【ニューロン】判定時にダイス＋２個。\n**３段階目（重篤）：**１段階目に加え【精神力】が＋３される。【ニューロン】判定時にダイス＋３個。',
        },
    },
    バイオサイバネ狂気判定: {
        dice: { 'a': '1d6' },
        data: {
            1: '**獣化/黒い復讐心**\n**１段階目（中等度）：**戦闘中に１ダメージでも受けた場合、次の手番からその相手（敵味方問わず）に対して可能な限り接近し、近接攻撃を仕掛けなければならない（近接攻撃が届かなければ移動後に射撃やジツを使ってもよい。**行動優先度は「非移動の攻撃集中」＞「接近のための移動ののち近接攻撃」＞「接近のための移動ののちジツや遠隔武器による攻撃」となる）**。また、この敵に対する近接攻撃ダイスは＋１個される。別な敵から新たなダメージを受けた場合、攻撃目標をこの新たな相手に切り替えてもよい。この効果は戦闘が終了するか、その敵が戦闘不能になるか、あるいは自分の手番の開始時に【精神力】を１消費してこの衝動を振り払うまで持続する。\n**２段階目（重篤）：**上記に加え、火に対して原初的な恐怖を抱き始める。火炎や爆発による１以上のダメージを受けた場合、追加で【精神力】にもダメージ１を受ける。\n**３段階目：**なし。同じ目が出たらダイスを振り直す。',
            2: '**自我希薄化**\n**１段階目（軽度）：**自発的行動での『精神力成功』に必要な【精神力】が１増加する。\n**２段階目（中等度）：**自発的行動での『精神力成功』に必要な【精神力】が２増加する。また【精神力】が−１される。\n**３段階目（重篤）：**自発的行動での『精神力成功』が不可能となる。また【精神力】が−２される。',
            3: '**虚無衝動/強化肉体への過信**\n**１段階目（軽度）：**回避判定での『精神力成功』に必要な【精神力】が１増加する。\n**２段階目（中等度）：**回避判定での『精神力成功』に必要な【精神力】が２増加する。『サツバツ！』に対する回避の『精神力成功』が不可能になる。\n**３段階目（重篤）：**あらゆる回避判定での『精神力成功』が不可能となる。',
            4: '**狂戦士化/過剰戦闘衝動**\n**１段階目（軽度）：**戦闘中に近接攻撃によって1ダメージでも受けるか与えた場合、その戦闘が終わるまで【カラテ】判定のダイスが２個増え、回避ダイスが２個減る。\n**２段階目（中等度）：**戦闘中に近接攻撃によって1ダメージでも受けるか与えた場合、その戦闘が終わるまで【カラテ】判定のダイスが４個増え、回避ダイスが４個減る。\n**３段階目（重度）：**戦闘中に近接攻撃によって1ダメージでも受けるか与えた場合、その戦闘が終わるまで【カラテ】判定のダイスが６個増え、回避ダイスが６個減る。',
            5: '**薬物依存/バイオインゴット欠乏症**\n**１段階目（軽度）：**消費アイテムによる【体力】および【精神力】の回復量が−１される（最低値は回復量０）。ZBR蘇生は例外。\n**２段階目（中等度）：**消費アイテムによる【体力】および【精神力】の回復量が−２される（最低値は回復量０）。ZBR蘇生は例外。また【精神力】が−１される。\n**３段階目（重篤）：**消費アイテムによる【体力】および【精神力】の回復量が−３される（最低値は回復量０）。ZBR蘇生は例外。また【精神力】が−２される。',
            6: '**自我崩壊/精神崩壊**\n**１段階目（軽度）：**このニンジャは【ニューロン】−１の永続的ペナルティを受ける。\n**２段階目（中等度）：**このニンジャは【ニューロン】−２の永続的ペナルティを受ける。\n**３段階目（重篤）：**このニンジャは【ニューロン】−４の永続的ペナルティを受ける。',
        },
    },
    ソウル鑑定: {
        dice: { 'a': '1d6' },
        data: {
            1: '**レッサー級ニンジャソウル**：このニンジャは今後いかなる方法を用いても素の【ジツ】値を４以上にはできない。\n【ジツ】値３（拡張サイバネの修を含まない素の値）の状態で『カルマロンダリング』を行い「レッサー級ソウル」と判定されてしまった場合、【ジツ】値を１上げる代わりに他の任意の能力値を２上げる（壁に到達しているならばそれを突破する）か、◉を２個獲得するか、もしくは能力値と◉を１ずつ得る。\n【ジツ】値０の状態でこの『カルマロンダリング』を行い、敢えて【ジツ】値０のレッサーとして生き続けることを選んだ場合、今回の【ジツ】値１上昇も起こらず、代わりに『アーチ級ルール導入時のレッサー級のメリット』を得る。\n\n**プラグイン環境でのレッサー級のメリット**：レッサー級ニンジャソウル憑依者は、通常のニンジャであれば【ジツ】値を得るようなタイミングで、代わりに◉スキルを得ることができ。また現在の◉スキル個数が２個以下の場合のみ、「*マキモノ・オブ・シークレット・ニンジャアーツ*」を使うことで、ジツの代わりに◉スキルを習得することができる。\n\n**アーチ級ルール導入時のレッサー級のメリット**：レッサー級ニンジャソウル憑依者と判明し、かつ【ジツ】値０として生きることを選んだPCは、その時点から◉スキルの最大基本スキルスロットが６個ではなく７個となる。加えて、能力値上限へのペナルティを調べたり、スキル習得コストを調べるために現在の所有◉スキル総数を数えるうえで、本来よりも１個少ない個数とみなすことができる（マキモノの使用時も含む）。なお、これはソウル鑑定ルールを導入し、かつアーチ級のPCが存在しうるようなキャンペグン環境で、各ソウル憑依者ごとの役割分担や特徴づけを可能な限り維持するためのルールだ。アーチ級憑依者のPCを許可しない環境ならば、このルールは使用しないほうが良いだろう（その場合は単純に一時的に◉スキルを１個減らせばよい）。',
            2: '**レッサー級ニンジャソウル**：このニンジャは今後いかなる方法を用いても素の【ジツ】値を４以上にはできない。\n【ジツ】値３（拡張サイバネの修を含まない素の値）の状態で『カルマロンダリング』を行い「レッサー級ソウル」と判定されてしまった場合、【ジツ】値を１上げる代わりに他の任意の能力値を２上げる（壁に到達しているならばそれを突破する）か、◉を２個獲得するか、もしくは能力値と◉を１ずつ得る。\n【ジツ】値０の状態でこの『カルマロンダリング』を行い、敢えて【ジツ】値０のレッサーとして生き続けることを選んだ場合、今回の【ジツ】値１上昇も起こらず、代わりに『アーチ級ルール導入時のレッサー級のメリット』を得る。\n\n**プラグイン環境でのレッサー級のメリット**：レッサー級ニンジャソウル憑依者は、通常のニンジャであれば【ジツ】値を得るようなタイミングで、代わりに◉スキルを得ることができ。また現在の◉スキル個数が２個以下の場合のみ、「*マキモノ・オブ・シークレット・ニンジャアーツ*」を使うことで、ジツの代わりに◉スキルを習得することができる。\n\n**アーチ級ルール導入時のレッサー級のメリット**：レッサー級ニンジャソウル憑依者と判明し、かつ【ジツ】値０として生きることを選んだPCは、その時点から◉スキルの最大基本スキルスロットが６個ではなく７個となる。加えて、能力値上限へのペナルティを調べたり、スキル習得コストを調べるために現在の所有◉スキル総数を数えるうえで、本来よりも１個少ない個数とみなすことができる（マキモノの使用時も含む）。なお、これはソウル鑑定ルールを導入し、かつアーチ級のPCが存在しうるようなキャンペグン環境で、各ソウル憑依者ごとの役割分担や特徴づけを可能な限り維持するためのルールだ。アーチ級憑依者のPCを許可しない環境ならば、このルールは使用しないほうが良いだろう（その場合は単純に一時的に◉スキルを１個減らせばよい）。',
            3: '**グレーター級ニンジャソウル**：基本的にプラグイン環境の成長ルールはグレーター級を想定したものになっているため、特に有利な点も不利な点もない。\n【ジツ】値６（拡張サイバネの修を含まない素の値）の状態で『カルマロンダリング』を行い「グレーター級ソウル」と判定された場合、【ジツ】値を１上げる代わりに他の任意の能力値を２上げる（壁に到達しているならばそれを突破する）か、◉を２個獲得するか、もしくは能力値と◉を１ずつ得る。',
            4: '**グレーター級ニンジャソウル**：基本的にプラグイン環境の成長ルールはグレーター級を想定したものになっているため、特に有利な点も不利な点もない。\n【ジツ】値６（拡張サイバネの修を含まない素の値）の状態で『カルマロンダリング』を行い「グレーター級ソウル」と判定された場合、【ジツ】値を１上げる代わりに他の任意の能力値を２上げる（壁に到達しているならばそれを突破する）か、◉を２個獲得するか、もしくは能力値と◉を１ずつ得る。',
            5: '**アーチ級ニンジャソウル**：アーチ級のルールが全てあてはまる。（詳細は該当記事を参照すること：https://diehardtales.com/n/nd317b184f328 ）\n【ジツ】値６（拡張サイバネの修を含まない素の値）の状態で『カルマロンダリング』を行い出目12を出し、かつアーチ級ソウルとなった場合、直ちに【ジツ】値７に到達できる。\n\n**※既に素の【ジツ】値が４以上（拡張サイバネの修正は除く）あって出目1～2が出た場合は、ダイスを振り直す。**',
            6: '**アーチ級ニンジャソウル**：アーチ級のルールが全てあてはまる。（詳細は該当記事を参照すること：https://diehardtales.com/n/nd317b184f328 ）\n【ジツ】値６（拡張サイバネの修を含まない素の値）の状態で『カルマロンダリング』を行い出目12を出し、かつアーチ級ソウルとなった場合、直ちに【ジツ】値７に到達できる。\n\n**※既に素の【ジツ】値が４以上（拡張サイバネの修正は除く）あって出目1～2が出た場合は、ダイスを振り直す。**',
        },
    },
    ソーマトリコール: {
        dice: { 'a': '2d6' },
        data: {
            2: '**邪悪なアーチ級ソウル憑依者として復活！**（『ニンジャソウルの闇』を追加で１個得て復活する）\n\nD3＋1ターン後にアーチ級ニンジャソウル憑依者として復活、復活時にそのPCの【体力】と【精神力】は初期値の半分（切り上げ）まで回復する。\nアーチルールの詳細は該当記事を参照すること：：https://diehardtales.com/n/nd317b184f328',
            3: '**爆発四散！**ナムアミダブツ…',
            4: '**爆発四散！**ナムアミダブツ…',
            5: '**爆発四散！**ナムアミダブツ…',
            6: '**爆発四散！**ナムアミダブツ…',
            7: '**爆発四散！**ナムアミダブツ…',
            8: '**爆発四散！**ナムアミダブツ…',
            9: '**爆発四散！**ナムアミダブツ…',
            10: '**爆発四散！**ナムアミダブツ…',
            11: '**爆発四散！**ナムアミダブツ…',
            12: '**アーチ級ソウル憑依者として復活！**\n\nD3＋1ターン後にアーチ級ニンジャソウル憑依者として復活、復活時にそのPCの【体力】と【精神力】は初期値の半分（切り上げ）まで回復する。\nアーチルールの詳細は該当記事を参照すること：：https://diehardtales.com/n/nd317b184f328',
        },
    },
    生い立ち: {
        dice: { 'a': '2d6' },
        data: {
            1: '**１１『○ジンクス』**：\n特定のジンクスやブツメツなどを気にする昔気質の伝統主義者や敬虔なブッダ信奉者、あるいはアンタイブディスト（反ブッダ主義者）などであろう。このPCはシナリオ開始時ごとにD6を振り、偶数なら【精神力】が+1、奇数なら【精神力】が-1される（これにより【精神力】が0未満になる場合は、代わりに【体力】を-1する）。この修正はそのシナリオの間のみ有効。',
            2: '**１２『○レッサー・ソンケイ』**：\nソンケイとは伝統的ヤクザたちが重んずるとされる精神的概念だ。それはヤクザ者にとっての武士道のようなものであり、仏教における功徳にも似ている。侠気に溢れた粋な行いを実践することでソンケイは磨かれて行き、やがてオーラのような存在感を放ち出す。クランの構成員たちは自然と、そのような高いソンケイを持つ者に従うようになるという。この者はヤクザ組織の叩き上げであり、ヤクザの流儀にも通じている（余裕があればかつてのヤクザクラン名を考えてもいいだろう）。このPCは『名声：ソウカイヤ』を最初から２持つ。',
            3: '**１３『○指名手配犯』**：\n「ここに来るまでに二人殺して来た」そう語るニンジャの服は赤い返り血に染まっていた。ニンジャソウルの闇に飲まれて組織から粛清される日も、そう遠くはないだろう。このPCはゲームスタート時点から【万札】５と【DKK】２を持つ。またシナリオ開始時に【DKK】が０だった場合、自動的に２まで上昇する。',
            4: '**１４『○信心深い』**：\n妙に信心深く、余暇のたびに宗教施設で真剣な懺悔や施しなどを行なったり、何らかの罪滅ぼしドネートをしている（あるいはそのような妄想かもしれない）。このPCは余暇開始時ごとに、【万札】を−１して、代わりに【DKK】を−１してもよい。これは余暇スロットを消費しない。',
            5: '**１５『○ピンハネ』**：\n裏社会で培ったストリートビジネスの知恵、持ち前の図太さ、もしくは経理の知識などを活かし、狡猾に上へのアガリをピンハネしている。このPCはシナリオクリアごとに【万札】を追加で１得る。加えて「モータルハンティング」時にも【万札】を追加で１得る。',
            6: '**１６『○ブラインドタッチ』**：\nこの者はホームポジジョンの構えに精通し、高速物理タイプができる。もとは物理タイピング原理主義系のハッカー、もしくはエスイーなどのタイピング労働者だろう。このPCはキーボードが使えるハッキング判定時にダイスを１個追加で振れる。生体LANのボーナスを使用できる場合は重複不可（物理か論理かどちらか片方を選ぶこと）。',
            7: '**２１『○錠前破り』**：\nこの者はかつてハック＆スラッシュ武装強盗団の一員として開錠役やトラップ排除役を担っていた。このキャラは物理および電子の解錠判定やトラップ解除判定でつねにダイスが＋１個される。加えて「モータルハンティング」時にも【万札】を追加で１得る。',
            8: '**２２『○言いくるめ』**：\nこの者は口達者で、出まかせによる言いくるめに秀でており、自らの機転とトークの力で何度も窮地を切り抜けてきた。あるいはハック＆スラッシュ武装強盗団でオイラン役をつとめ、色仕掛けや誘惑やハニートラップを得意としていた。このPCは、シナリオ内でNPCの説得や脅迫を試みて判定に失敗した場合、そのダイスを１回だけ振り直せる。加えて、このPCは「モータルハンティング」時に【万札】を追加で１得る。',
            9: '**２３『○実家のカネ』**：\n親の遺産か、退職金か、あるいは詐欺や銀行強盗などで得た金か……潤沢とまでは言えないが、この者の家にはいくらかの蓄えがあり、それを使いつぶしながら生きてきた。だがそれも底をつこうとしている。このPCは【万札】を他のPCよりも10多く所持してゲームを開始できる（買物ができるのはシナリオクリア後となる）。',
            10: '**２４『○電子戦争退役軍人』**：\n電子戦争とは残存IPアドレスをめぐって2004年頃から始まったメガコーポ同士の企業間戦争であり、第一世代の生体LAN直結技術や様々なサイバネ兵器をも生み出した。この者もかつて暗黒メガコーポの傭兵として戦い、その肉体にいくつもサイバネを埋め込んでいたが、電子戦争の終結とともにお払い箱となり、くすぶっていた。電子戦争の時代を考えると年齢は30から40以上が望ましいが、若く設定したい場合は単純にメガコーポの傭兵上がりとすれば良いだろう。このPCは「チャカ・ガン２挺と任意のグレネード１個」もしくは「▶︎生体LAN端子」を初期装備してゲームを開始する（「▶︎生体LAN端子」はタダで獲得でき、望むならばさらにローンで初期装備サイバネを購入してよい）。他に初期装備アイテムがあれば捨てること。',
            11: '**２５『○ガンマニア』**：\nこの者は重度のガンマニアであり、愛好する銃器を肌身離さず持ち歩き、チャンスさえあれば弾をバラまこうとする。このPCは『◉トリガーハッピー』のスキルと「チャカ・ガン１挺」を初期装備した状態でゲームをスタートできる（他に初期装備アイテムがあれば捨てること）。',
            12: '**２６『○下劣なパパラッチ』**：\n戦闘中かつ２ターン目以降の自分の手番で、このPCは『回避ダイス』２個と「その他の行動」を消費することにより、「撮影」を行ってもよい。「撮影」は【ワザマエ】で判定し、難易度はHARDである。これに成功した場合、このPCはシナリオ終了時に【万札】をD３得る。また撮影したシーンが極めて刺激的あるいはソウカイヤの利益となるような決定的映像だったとNMが判断する場合、D3ではなくD6+1の【万札】を得られる。',
            13: '**３１『○刀剣マニア』**：\nこの者は病的な刀剣収集マニアであり、戦利品と思しきカタナやダガーを（時には何本も）肌身離さず持ち歩いている。このPCは「カタナ」を２本初期装備した状態でゲームをスタートする（他の初期装備アイテムがあれば捨てること）。また鑑定眼にも優れているため、刀剣類をブラックマーケットに売却する際に【万札】を追加で１得られる。',
            14: '**３２『○ショドー十段』**：\n日本社会においては達筆であると上から一目置かれ、また下位の者からは敬意を得られやすく、ソーシャル面で大きなアドバンテージを得られる。各シナリオ終了後の評価タイムにおいて、このキャラはチームの報告書を自らのショドーによって提出したことにし、D6を振ってもよい。出目が６だった場合、チームの評価が１段階向上するが、出目が１だった場合は慢心による誤字を指摘され評価が１段階下がる（どちらの場合も評価リストの上限と下限を超えることはない）。',
            15: '**３３『○元ハッカーカルト』**：\nこの者はかつてペケロッパ・カルトなどの電子カルト教団に所属していた。永続的な【カラテ】−１と【ニューロン】＋１の修正を受ける。加えて、頭部防具として「サイバーサングラス」もしくは「▶︎生体LAN端子」を初期装備してゲームを開始してもよい（その場合、他の初期装備アイテムがあれば捨てること）。',
            16: '**３４『○スモトリ崩れ』**：\nこの者は２メートル近い見事な体躯を持ち、銃弾の一発や二発程度では致命傷とならない。かつてはリキシ・リーグを目指す屈強で高潔なスモトリであったが、膝を壊して引退し、やがて汚れ仕事や邪悪行為に手を染めるようになった。このPCは【体力】＋２、【脚力】−１の修正を永続的に受ける。他の暗黒プロスポーツ選手に読み替えてもよい。',
            17: '**３５『○アンタイブディズム・ブラックメタリスト』**：\nブディズム系聖職者のみをターゲットとした攻撃時に『近接攻撃ダイス』が＋１個される。またフランベルジュやグレートソードなどの『大型近接武器（ルールはノダチ）』を初期装備してゲームを開始する（他の初期装備アイテムがあれば捨てること）。また【DKK】を最初から１持っている。',
            18: '**３６『○元イタマエ』**：\nこの者はイタマエを志したことがあり、スシ製作知識だけでなく、ツキジ・マーケットなどとの古いコネクションも維持している。このPCは余暇中に買い物に行かずとも、シナリオ開始時に【万札】１を消費することで自分のためのオーガニック・スシを１個だけ獲得できる。',
            19: '**４１『○オイランドロイド偏愛』**：\nネコネコカワイイの狂信的ファン、すなわちNERDZであり、分解されたネコネコカワイイのレリックパーツを所有している。レリック枠として「ブードゥー/聖遺物」を初期装備した状態でゲームを開始する（他の初期装備アイテムがあれば捨てること）。',
            20: '**４２『○堕落マッポ』**：\nこの者はかつて堕落したマッポや暴力デッカーであったが、ついに行き過ぎた悪事が露見して公職から追放されてしまった。しかしかつてのコネやマッポ装備に関する知識は未だ健在である。このPCはNSPDに所属するNPCのみをターゲットとした攻撃時に、『近接攻撃ダイス』と『遠隔攻撃ダイス』がどちらも＋１個される。また、このPCは余暇中に買い物に行かずとも、シナリオ開始時に【万札】１を消費することで、自分用の「トロ粉末」を１個だけ獲得できる。',
            21: '**４３『○キング・オブ・アーケード』**：\nかつてはアーケードのゲームセンターに入り浸っており、禅TANKなどで反射神経を限界まで鍛え上げ、無慈悲なる狙撃手となった。このPCは永続的な【カラテ】−１と【ワザマエ】＋１の修正を受ける。',
            22: '**４４『○未覚醒のアーチ級ニンジャソウル憑依者』**：\nこのPCは「アーチ級ニンジャソウル憑依者」としてゲームを開始する。なお、ランダム決定時に【ジツ】値が０だった場合、この背景を得た時点で【ジツ】値は１になる。単発セッションで時間がない場合などは単純に『★★★不滅』を得るか、【ジツ】値＋１を得ること（スタート時の上限は３）。',
            23: '**４５『○サイバーゴス』**：\nこの者は身体のサイバネ置換に対して一切の躊躇がなく、また神経系バイパス手術への適性が高い。このPCは好きな「▷」系サイバネを１個埋め込んだ状態でゲームを開始できる。基部となる「▶︎」は通常どおり初期装備可能サイバネの中からローンによって選択する必要があるが、この生い立ちによる「▷」ぶんはタダで獲得できる。',
            24: '**４６『○元湾岸警備隊』**：\n湾岸警備隊はネオサイタマの湾岸部を守る海軍（ネイビー）めいた組織であるが、必要とあらば市街地や、キョート共和国との国境地帯などでも作戦行動に従事するため、様々な軍用武器の取り扱いに精通することとなる。このPCは「オムラ・アサルトライフル」とレリック枠の「湾岸警備隊制式アサルトハーネス」を装備した状態でゲームを開始する（他に初期装備アイテムがあれば捨てること）。',
            25: '**５１『○元ヒキャク・パルクール』**：\nヒキャクとはパルクール訓練を積んだメッセンジャーの事で、複雑に入り組んだ都市の物流を支えている。このPCは『◉常人の三倍の脚力』を持った状態でゲームを開始する（他に初期装備アイテムがあれば捨てること）。',
            26: '**５２『○危険生物ハンター』**：\nこの者は荒野部の出身であり、幼い頃から危険バイオ生物の脅威にさらされて生きてきた。このPCは「スダチカワフ・ショットガン」を初期装備してゲームを開始する（他に初期装備アイテムがあれば捨てること）。またこのPCはバイオ生物に対するあらゆる『遠隔攻撃ダイス』が＋１個される。',
            27: '**５３『○キラーマシーン教育』**：\n物心つく前からアサシンやヒットマンとしての教育を受けて育ったため、銃器の扱いには優れているが、感情や自己判断力が希薄化してしまっている。このPCは永続的な【ニューロン】−１と【ワザマエ】＋１の修正を受ける。またチャカ・ガン２挺を初期装備できる（他に初期装備アイテムがあれば捨てること）。',
            28: '**５４『○テッポダマ』**：\nこの者は小規模なギャング団やヤンク暴走族などのチームリーダーを務めた経験があり、凶悪さと無慈悲さで知られている。もしくはヤクザ組織の若きテッポダマであった。このPCはテッポダマ系◉スキルの中から『◉滅多斬り』『◉滅多打ち』『◉一瞬の勝機』『◉挑発』のいずれか１個を所持した状態でゲームを開始できる。',
            29: '**５５『○異端考古学者』**：\n学会から追放された異端の考古学者であり、精神に深い傷を負っているが、ニンジャ真実と向かい合う心構えができている。このPCは永続的な【ニューロン】−１の修正を受ける。各種マキモノを使用した際、出目１だったダイスを振り直せる（振り直し後も１だった場合は結果を受け入れるしかない）。またシナリオ中にニンジャ神話知識やニンジャ文明知識に関する【ニューロン】判定に失敗した場合、それを振り直せる。',
            30: '**５６『○サイバネ賞金稼ぎ』**：\nこの者は裏社会の賞金首情報だけでなく、違法改造サイバネパーツの市場価値について深い知識を持つ。シナリオ内で名前持ちの『重サイバネ』NPCを殺害した場合（このPCではなく仲間のPCが殺害した場合でも）、その死体から追加で【万札】を５得られる。',
            31: '**６１『○ローグハッカー』**：\n旧世紀のハードウェアや基板に対して深い知識を持つ。シナリオ内でハッキング可能または破壊可能なUNIXデッキを発見し、そのハッキングや破壊に成功した場合（このPCではなく仲間のPCがハッキングや破壊に成功した場合でも）、そのUNIXの残骸から【万札】３を得られる。また『*キーボード・オブ・ザ・ゴールデン・エイジ*』を初期装備している（他の初期装備アイテムがあれば捨てること）。',
            32: '**６２『○エンジニア崩れ』**：\n元エンジニアや職人、あるいはテックストリートチルドレンであり、ストリートに廃棄されたジャンク品の違法回収や分解などで糊口をしのいでいた。『*タカハシ・マスターツールキット*』を初期装備してゲームを開始する（他の初期装備アイテムがあれば捨てること）。',
            33: '**６３『○放火魔』**：\nこの者は火と爆発に対して異常なまでの執着を持ち、とりわけ、無力なモータルが炎の中で絶叫しながら死んでゆくのを見ることに興奮をおぼえる。このPCは「ヨロシ・デコンタミネイター型火炎放射器」を初期装備してゲームを開始する（他の初期装備アイテムがあれば捨てること）。またこのPCは【DKK】を最初から１持ってスタートする。',
            34: '**６４『○プロテインマニア』**：\nこの者は筋肉を過剰に鍛え上げることに対して病的なまでに執着しており、暇さえあれば腕立て伏せやダンベル運動、懸垂運動などを行っている。実用性よりも重厚な筋肉の鎧を生み出すことを重点しているためバランスが悪く、筋肉ダルマめいた外見で、身体制御はややおぼつかない。このPCは永続的な【カラテ】＋１と【ワザマエ】−１の修正を受ける。',
            35: '**６５『○拷問好き』**：\nこの者は弱者（特に無力なモータル）を虐げることが三度の飯より好きだ。このPCは『◉邪悪なサディスト』のスキルを持った状態でゲームをスタートできる。',
            36: '**６６『○生粋のソウカイヤクザ』**：\nソウカイヤクザからニンジャとなった者であり、ラオモトの侠気に惚れ込んでいる。このPCは『名声：ソウカイヤ』を最初から１持つ。また『◉マーク・オブ・ソウカイヤ』を持った状態でゲームを開始する。',
        },
    },

    /*
        test表 : {
            dice : { a : '1d6' ,  b : '1d6+1', c : '2d6' },
            data : {
                1:'test1',
                2:'test2',
                3:'test3',
                4:'test4',
                5:'test5',
                6:'test6',
                7:'test7',
                8:'test8',
                9:'test9',
                10:'test10',
                11:'test11',
                12:'test12',
            },
            returnDice : function(str = null) {
                if (str == null) {
                    return this.dice['a'];
                }
                str = str.toLowerCase();
                switch(str) {
                    case 'a':
                    case 'b':
                    case 'c':
                        return this.dice[str];
                    case 'd':
                    case 'd6':
                    case '1d6':
                        return this.dice['a'];
                    case 'd+1':
                    case 'd6+1':
                    case '1d6+1':
                        return this.dice['b'];
                    case '2d':
                    case '2d6':
                        return this.dice['c'];
                    default:
                        return '';
                }
            }
        },
    */
}