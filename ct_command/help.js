const HelpMessage = {
'all' : 
`
この機能を使用すると、ニンジャスレイヤーTRPGなどにおいて、自分の好きなダイスロール表を登録することができます。
ダイスロール表を登録することで、作成したチャンネル内において、「 **/nd (作った表名)** 」で好きなときにダイスロールし、結果を表示できるようになります。
表の登録に使用するコマンドは「 **/ct (コマンド名),(引数)** 」で実行されます。コマンド名は半角英字（大小いずれも可）です。
詳細は各コマンドのヘルプを確認してください。「 **/ct help,(ヘルプを見たいコマンド)** 」で各コマンドの詳細を表示します。

**◆コマンド一覧◆**
\`\`\`
createTable ...テーブルを登録します。
updateDice ...ダイスロールするダイス面・数を更新します。
updateData ...出目ごとの結果を登録・更新します。
updateTableName ...テーブル名を変更します。
addPermission ...任意のユーザーに対して、テーブルの編集権限を付与します。
deleteDice ...ダイスロールのショートカットを削除します。
deleteData ...出目ごとの結果を削除します。
deleteTable ...指定したテーブルを削除します。
deletePermission ...付与したテーブルの編集権限を削除します。
checkTableList ...このチャンネルで使用できるダイスロール表を表示します。
checkTableData ...指定したテーブルのダイスと、出目ごとの結果一覧を表示します。
help ...ヘルプを表示します。
publishTable ...指定したテーブルをbotを導入している全サーバーで使えるよう、公開します。
\`\`\`
`,
'addpermission' : 
`
\`/ct addPermission,(テーブル名),(ユーザID),[t or f]\`
\`例： /ct addPermission,トヨスダンジョン,xxxxxxxxxxxxxx\`

\`\`\`
引数：
    (テーブル名) ...登録したいテーブル名。**半角英数字不可**、日本語可。全角４文字以上。
    (ユーザID) ...許可を与えるユーザのID。半角数字のみ。
    [t or f] ...省略可。公開済みテーブルを参照する場合はt、チャンネル内のテーブルを参照する場合はf。デフォルトはf
\`\`\`
作成済みのテーブルを限定的に編集する権限を与えます。
ユーザIDは Discord の「開発者モード」をONにした後、ユーザを右クリック、「IDをコピー」を選択することで入手できます。
（開発者モードについては別途検索してください。）
このコマンドで与えられる編集権限は以下のとおりです。
・テーブルのダイスロール変更（ updateDice , deleteDice ）
・テーブルのデータ変更（ updateData , deleteData ）
テーブル自体の変更や削除、およびパーミッションの変更はできません。
addPermissionなどの上位操作は「bot管理者」「サーバー管理者」「テーブル作成者」のみ与えられ、変更できません。
コマンド：publishTable で公開されたテーブルについて更新する場合は、末尾に "t" のフラグを付けてください。
`,

'checktabledata' : 
`
\`/ct checkTableData,(テーブル名),[t or f]\`
\`例： /ct checkTableData,トヨスダンジョン\`

\`\`\`
引数：
    (テーブル名) ...確認したいテーブル名。**半角英数字不可**、日本語可。全角４文字以上。
    [t or f] ...省略可。公開済みテーブルを参照する場合はt、チャンネル内のテーブルを参照する場合はf。デフォルトはf
\`\`\`
指定したテーブル内のダイスロールとデータを全て表示します。
コマンド：publishTable で公開されたテーブルについて更新する場合は、末尾に "t" のフラグを付けてください。
`,

'checktablelist' : 
`
\`/ct checkTableList\`
\`例： /ct checkTableList\`

\`\`\`
引数：
    なし
\`\`\`
このテーブルで使用可能なテーブル名の一覧と、各テーブルのダイスロールを表示します。
表示されるテーブルは「公開済みテーブル」および「チャンネル内のテーブル」です。
`,

'createtable' : 
`
\`/ct createTable,(テーブル名)\`
\`例： /ct createTable,トヨスダンジョン\`

\`\`\`
引数：
    (テーブル名) ...登録したいテーブル名。**半角英数字不可**、日本語可。全角４文字以上。
\`\`\`
発言したチャンネルで使用できるテーブルを登録します。
既に登録済みの同名のテーブルが有る場合、",',#などの特殊文字を使用している場合はエラーとなります。
また「！,!,表,・」の４文字は自動的に取り除かれます。
これらは表記揺れとして対応し、実際にダイスロールする際にはこれらの文字を使用しても正しいテーブルを参照します。
`,

'deletedice' : 
`
\`/ct deleteDice,(テーブル名),(ショートカット名),[t or f]\`
\`例： /ct deleteDice,トヨスダンジョン,b\`

\`\`\`
引数：
    (テーブル名) ...編集対象のテーブル名。**半角英数字不可**、日本語可。全角４文字以上。
    (ショートカット名) ...ダイスのショートカット名。英数字、日本語可。一部対応できない文字有り。また"a"の削除は不可。
    [t or f] ...省略可。公開済みテーブルを参照する場合はt、チャンネル内のテーブルを参照する場合はf。デフォルトはf
\`\`\`
作成済みのテーブルにあるダイスロールから、指定したショートカット名のダイスを削除します。
ただし、デフォルトダイスである ショートカット名："a" は削除できません。
変更したい場合は updateDice を使用してください。
コマンド：publishTable で公開されたテーブルについて更新する場合は、末尾に "t" のフラグを付けてください。
`,

'deletedata' : 
`
\`/ct deleteData,(テーブル名),(出目番号),[t or f]\`
\`例： /ct deleteData,トヨスダンジョン,36\`

\`\`\`
引数：
    (テーブル名) ...編集対象のテーブル名。**半角英数字不可**、日本語可。全角４文字以上。
    (出目番号) ...ダイスロールの結果に対応する番号。半角数字のみ。
    [t or f] ...省略可。公開済みテーブルを参照する場合はt、チャンネル内のテーブルを参照する場合はf。デフォルトはf
\`\`\`
作成済みのテーブルにあるデータから、指定した出目番号のデータを削除します。
コマンド：publishTable で公開されたテーブルについて更新する場合は、末尾に "t" のフラグを付けてください。
`,

'deletepermission' : 
`
\`/ct deletePermission,(テーブル名),(ユーザID),[t or f]\`
\`例： /ct deletePermission,トヨスダンジョン,xxxxxxxxxxxxxx\`

\`\`\`
引数：
    (テーブル名) ...編集対象のテーブル名。**半角英数字不可**、日本語可。全角４文字以上。
    (ユーザID) ...編集権限を除去するユーザID。半角数字のみ。
    [t or f] ...省略可。公開済みテーブルを参照する場合はt、チャンネル内のテーブルを参照する場合はf。デフォルトはf
\`\`\`
作成済みのテーブルから、指定したユーザIDの編集権限を解除します。
ただし、「bot管理者」「サーバ管理者」「テーブル作成者」の権限は削除できません。
またこのコマンドは addPermission で権限を付与されたユーザでは実行できません。
`,

'deletetable' : 
`
\`/ct deleteTable,(テーブル名)\`
\`例： /ct deleteTable,トヨスダンジョン\`

\`\`\`
引数：
    (テーブル名) ...削除するテーブル名。**半角英数字不可**、日本語可。全角４文字以上。
\`\`\`
指定した名前のテーブルを削除します。
この操作はチャンネル内のテーブルに限り、「bot管理者」「サーバ管理者」「テーブル作成者」が実施できます。

**公開済みのテーブルは削除できません。**
万が一、公開後に削除を希望する場合は「bot管理者」：くりーむ へ連絡してください。
`,

'help' : 
`
\`/ct help\`
\`例： /ct help\`

\`\`\`
引数：
    なし
\`\`\`
ヘルプを表示します。
コマンドの一覧を見る場合などにご利用ください。
`,


'publishtable' : 
`
\`/ct publishTable,(テーブル名)\`
\`例： /ct publishTable,トヨスダンジョン\`

\`\`\`
引数：
    (テーブル名) ...登録したいテーブル名。**半角英数字不可**、日本語可。全角４文字以上。
\`\`\`
指定したチャンネル内のテーブルを、全サーバーで使用できるように公開します。
登録したダイスが取りうる値全てに対応する結果データが登録されている必要があります。
また、既に公開済みテーブルに同名のテーブルがあった場合は登録できません。
コマンド：updateTableName で名称を変更し、再度実行してください。
このコマンドは「bot管理者」「サーバ管理者」「テーブル作成者」のみ実行できます。

**一度公開されたテーブルを再度、チャンネル内に限定することはできません。**
公開前にデータに不備がないか、チェックしてからご利用ください。
`,

'updatedata' : 
`
\`/ct updateData,(テーブル名),(出目番号),(結果文字列),[t or f]\`
\`例： /ct updateData,トヨスダンジョン,36,**「ドーモ、ニンジャスレイヤーです」**\\nニンジャスレイヤーが出現！\\nｎターン生き残らないと逃げ切れないぞ！\\nn=2+(現在の階数/5)(端数切り上げ)\`

\`\`\`
引数：
    (テーブル名) ...編集対象のテーブル名。**半角英数字不可**、日本語可。全角４文字以上。
    (出目番号) ...ダイスロールの結果に対応する番号。半角数字のみ。
    (結果文字列) ...ダイスロールの出目に対応し、表示する結果。英数字、日本語可。
    [t or f] ...省略可。公開済みテーブルを参照する場合はt、チャンネル内のテーブルを参照する場合はf。デフォルトはf
\`\`\`
作成済みのテーブルにある出目ごとのを更新、追加します。
ダイスロールで取りうる値に対応したデータを、このコマンドを使って全て登録してください。
登録する際の結果文字列は Discord の装飾で用いるMarkdownが使用できます。詳細は別途検索してください。
また、改行する際は改行位置を「\\n」で置換し、コマンド内に改行を入れないようにします。
コマンド：publishTable で公開されたテーブルについて更新する場合は、末尾に "t" のフラグを付けてください。
`,

'updatedice' : 
`
\`/ct updateDice,(テーブル名),(ショートカット名),(ダイス文字列),[t or f]\`
\`例： /ct updateDice,トヨスダンジョン,a,1d36\`

\`\`\`
引数：
    (テーブル名) ...編集対象のテーブル名。**半角英数字不可**、日本語可。全角４文字以上。
    (ショートカット名) ...ダイスのショートカット名。英数字、日本語可。一部対応できない文字有り。
    (ダイス文字列) ...表を参照した時のダイスロール。 ndm(+/- x or ndm)で表記する。例：1d6 , 3d6-3 , 4d6+3d10-5d6+32
    [t or f] ...省略可。公開済みテーブルを参照する場合はt、チャンネル内のテーブルを参照する場合はf。デフォルトはf
\`\`\`
作成済みのテーブルにあるダイスロールを更新、追加します。
デフォルトダイスとして「"a" : "1d6"」が登録されています。「 /nd カルマロンダリング 」のような、１つの表に複数の
ダイスロールが発生する場合、新しいショートカット名とダイス文字列の組み合わせで登録してください。
ショートカット名："a"を更新すると、ショートカットを省略した時のデフォルトとして機能します。
コマンド：publishTable で公開されたテーブルについて更新する場合は、末尾に "t" のフラグを付けてください。
なお、いわゆる「D66」(2ダイスの出目を十の位と一の位に見立てる振り方)など、特殊なダイスロールには対応していません。
出目の数に応じて 1d36 など、別のダイスロールで代用してください。
`,
'updatetablename' : 
`
\`/ct updateTableName,(旧テーブル名),(新テーブル名),[t or f]\`
\`例： /ct updateTableName,トヨスダンジョン,新トヨスダンジョン\`

\`\`\`
引数：
    (旧テーブル名) ...変更前のテーブル名。**半角英数字不可**、日本語可。全角４文字以上。
    (新テーブル名) ...変更後のテーブル名。**半角英数字不可**、日本語可。全角４文字以上。
    [t or f] ...省略可。公開済みテーブルを参照する場合はt、チャンネル内のテーブルを参照する場合はf。デフォルトはf
\`\`\`
作成済みのテーブル名を変更します。
変更後に名前が重複する場合はエラーとなります。
コマンド：publishTable で公開されたテーブルについて更新する場合は、末尾に "t" のフラグを付けてください。
`,

}

exports.run = function(message,data) {
    let help = HelpMessage[data.help];
    if (!help) help = HelpMessage['all'] + '\n\n（指定したコマンドはありません。上記から再度見たいコマンドを探してください。）'
    const result = { result: true, message : help };
    return result;
}
exports.check = function() {
    //チェックすることはない
    return;
}
exports.adjust = function(array) {
    const object = {};
    if (array[1]) object.help = array[1].toLowerCase();
    else object.help = 'all';

    return object;
}