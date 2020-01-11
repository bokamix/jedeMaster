import * as firebase from 'firebase';
import {loadState} from '../localStorage'

const config = {
  apiKey: "AIzaSyA9lIuGZqAubyiIW3195jJpIziCaiWlR2Q",
  authDomain: "jedesteam.firebaseapp.com",
  databaseURL: "https://jedesteam.firebaseio.com",
  projectId: "jedesteam",
  storageBucket: "jedesteam.appspot.com",
  messagingSenderId: "596250103240"
};
firebase.initializeApp(config);

const database = firebase.database();

export const saveToFirebase =(data)=>{
  database.ref().set(data);
}


