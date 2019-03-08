exports.help =
"\n◆「天狗ダイス」ヘルプ◆\n" +
"\n" +
"◆計算式◆\n" +
"/nd 1d6	６面ダイスを１つ振ります。「ndm」と表記すれば好きな面数、数のダイスを振れます。\n" +
"/nd d      1d6と等価。「ダイス数１」と「６面ダイスの指定」は省略できます。\n" +
"/nd 2d6+2	足し算、引き算に対応しています。振ったダイスの出目と、固定値を全て合算します。\n" +
"/nd 3d6+3d6	ダイス同士の足し算も可。それぞれ独立して3d6を振ります。\n" +
"\n" +
"◆比較式◆\n" +
"/nd 5d6>=3	６面ダイス５つの出目のうち、３以上を「成功数」として数えます。\n" +
"/nd 3d6>=4+2d6<=3	足し算、引き算も可。評価式は =,!=,<,>,<=,>= に対応しています。\n" +
"\n" +
"◆比較式 Appendix◆\n" +
"/nd 3d6>=5[>=6]	[]で評価式をくくると、同じ3d6の結果に対して>=5と>=6の二つを独立して評価、表示します。\n" +
"/nd 3d6>=2[>=3][>=4*2]	[]は連続して繋げられます。さらに＊（数字）を付けると、カウント時の倍率も指定できます。\n" +
"\n" +
"◆比較式 Appendixショートカット◆  ※忍殺TRPG対応\n" +
"/nd 5d6>=4[s]	ショートカットは4種類あります。\n" +
"[s]or[s6]	…サツバツ！カウント\n" +
"[s5]			…『肉体破壊』用サツバツ！カウント\n" +
"[j]				…ジツ拡張サイバネ導入時のジツ暴走ファンブルカウント\n" +
"[l]                …LAN直結攻撃時、出目６数カウント\n" +
"\n" +
"◆ダイス表記ショートカット◆  ※忍殺TRPG対応\n" +
"/nd n4,3,3	難易度NORMALで4d6、3d6、3d6を評価します。難易度指定は k,e,n,h,u の５種類\n" +
"/nd n4,3[s]	比較式 Appendixも対応。各ダイスロールに対してAppendixを付与して評価します。\n" +
"\n" +
"◆その他◆\n" +
"/nd wasshoi9	DKK9でWasshoi!判定。「wasshoi」の後ろに評価で使うDKK値をつけてください。\n" +
"/nd n5,6[s5]#ヘンゲ連続攻撃	「#」の後ろにコメントを付けることもできます。\n" +
"\n" +
"より詳細な説明書は以下のページで！\n" +
"https://note.mu/kooreme/n/ncec59ad4ca8d\n" +
"\n" +
"◆天狗 is Watching You...";