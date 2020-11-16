    /** https://firebase.google.com/docs/web/setup?hl=pt-br#aplicativos-node.js*/
    import firebase from "firebase";
     // Add the Firebase services that you want to use
    import "firebase/auth";
    import "firebase/firestore";
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
            };
            this.init();
        }
        init(){
            if(!window.initializedFirebase){
                firebase.initializeApp(this._config)
                firebase.firestore().settings({
                    timestampsInSnapshots: true
                })
                window.initializedFirebase = true
            }
        }
            
        static db(){
            return firebase.firestore();
        }
        static hd(){
            return firebase.storage();
        }
        initAuth(){
            return new Promise((s,f)=>{
                let provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(provider)
                .then(result =>{
                    let token = result.credential.accessToken;
                    let user = result.user;
                    s({
                        user:user,
                        token:token
                    });
                })
                .catch(err=>{
                    f(err);
                }); 
            });
        }
    }