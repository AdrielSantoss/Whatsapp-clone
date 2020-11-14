const firebase = require('firebase')
require('firebase/firestore')

export default class Firebase{
    constructor(){
        this._config = {
            apiKey: "AIzaSyAO6lUHrQvjh7pF45aCuXbXD5II2SXxMGI",
            authDomain: "whatssap-clone-ff60b.firebaseapp.com",
            databaseURL: "https://whatssap-clone-ff60b.firebaseio.com",
            projectId: "whatssap-clone-ff60b",
            storageBucket: "whatssap-clone-ff60b.appspot.com",
            messagingSenderId: "277299119343",
            appId: "1:277299119343:web:39852fd063d59d1184071a",
            measurementId: "G-41RH94XNHH"
        }
        this.init()
    }

    init(){

        if(!this.initialized){
            firebase.initializeApp(this._config)

            firebase.firestore().settings({
                timestampsInSnapshots: true
            })

            this.initialized = true
        }
    }

    static db(){
        return firebase.firestore()
    }

    static hd(){
        return firebase.storage()
    }

    initAuth(){
        return new Promise((s, f)=>{

            let provider = new firebase.auth.GoogleAuthProvider()
            firebase.auth().signInWithPopup(provider).then(result=>{
                let token = result.credential.accessToken
                let user = result.user

                s(user, token)

            }).catch(err=>{
                f(err)
            })
        })
    }
}