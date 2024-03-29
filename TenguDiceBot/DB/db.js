const admin = require('firebase-admin')

if (global.process.env.FIREBASE_PKEY) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId : global.process.env.FIREBASE_PROJECT_ID,
            privateKey :global. process.env.FIREBASE_PKEY.replace(/\\n/g, '\n'),
            clientEmail : global.process.env.FIREBASE_CLIENT_EMAIL,
        }),
        databaseURL: "https://tengu-dicebot.firebaseio.com"
    });
}
else {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        databaseURL: "https://tengu-dicebot.firebaseio.com",
        projectId : global.process.env.FIREBASE_PROJECT_ID
    });
}

class DB {
    constructor() {
        this.db = admin.firestore();
        //db_wrapperにて使用。削除データのフラグ付け
        this.delete = admin.firestore.FieldValue.delete();
    }

    async getData(collectionName,channelID,fieldPath = null) {
        let data;
        let promise = this.db.collection(collectionName)
        .doc(channelID)
        .get()
        .then((snapshot) => {
            //console.log("db.collection.doc.get.then() called");
            if(snapshot.empty) throw new Error('DB : チャンネルIDなし')
            //console.log("fieldPath = " + fieldPath);
            if(fieldPath == null || fieldPath == "") return snapshot.data();
            return snapshot.get(fieldPath);
            
        })
        .catch(() => {
            console.error('DB : snapshot cannot get');
            return null;
        });

        data = await promise;
        return data;
    }

    async setData(collectionName,channelID,data) {
        let promise = this.db.collection(collectionName)
        .doc(channelID)
        .set(data,{merge : true})
        .then(() => true)
        .catch(() => {
            console.error('DB : Failure setData');
            return null;
        });
        let result = await promise;
        return result;
    }

    async deleteChannel(collectionName,channelID) {
        let promise = this.db.collection(collectionName)
        .doc(channelID)
        .delete()
        .then(()=> true)
        .catch(() => {
            console.error('DB : Failure DeleteChannel');
            return null;
        });
        let result = await promise;

        return result;
    }
}

module.exports.DB = new DB();