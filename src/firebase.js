import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDtXmIoYN7ziycMQP5XxfFXHh-cifrgwuw",
  authDomain: "full-stack-banking.firebaseapp.com",
  databaseURL: "https://full-stack-banking-default-rtdb.firebaseio.com",
  projectId: "full-stack-banking",
  storageBucket: "full-stack-banking.appspot.com",
  messagingSenderId: "669062531424",
  appId: "1:669062531424:web:d8cb0de9825bffb195f605"
};

firebase.initializeApp(firebaseConfig);



export const db = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(provider);
    const user = res.user;
    const userRef = db.collection("users");
    const result =  await userRef.where('uid', '==', user.uid).get();
    if (result.empty) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        amount: 100,
      });
    }
  } catch (err) {
    alert(err.message);
  }
};

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    alert(err.message);
  }
};

export const registerWithEmailAndPassword = async (name, email, password,amount) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      amount,
    });
  } catch (err) {
    alert(err.message);
  }
};

export const logout = () => {
   auth.signOut();
}


