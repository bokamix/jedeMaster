import { loadState } from "./src/localStorage"
const lazyApp = import('firebase/app')
const lazyDatabase = import('firebase/database')

let config = {
  apiKey: process.env.GATSBY__FIREBASE_API_KEY,
  authDomain: process.env.GATSBY__FIREBASE_AUTH_DOMAIN,
  databaseURL: "https://jedesteam.firebaseio.com",
  projectId: process.env.GATSBY__FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY__FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY__FIREBASE_MESSAGING_SENDER_ID
}

let firebaseInstance
export const getFirebase = firebase => {
  if (firebaseInstance) {
    return firebaseInstance
  }
  firebase.initializeApp(config)
  firebaseInstance = firebase
  return firebase
}
let database;
Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
  database = getFirebase(firebase).database()
  let data = {
    dada: "Repairt net duka blat",
  }
})
let itemNumber=0
export const saveToFirebase =()=>{
  itemNumber++
  let data = {
    dada: `${itemNumber}`,
  }
  let user = loadState('gotrue.user')
  if(user){
    database.ref(`${user.id}`).set(data);
  }
  console.log(itemNumber)
  // console.log(user.id)
  console.log(user)
if(user){
  database.ref().on('value', (snapshot) => {
    const val = snapshot.val();
    console.log(val);
  })
}
  
}

