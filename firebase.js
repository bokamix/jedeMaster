import { loadState, saveState } from "./src/localStorage"
const lazyApp = import('firebase/app')
const lazyDatabase = import('firebase/database')
let user = loadState('gotrue.user')

export let config = {
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


export const loadFromFire =(_calback)=>{
  console.log("load From Fire")
  Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
    database = getFirebase(firebase).database()
    if(user){
      database.ref(user.id).on('value', (snapshot) => {
        const val = snapshot.val();
        saveState("challengesLogs", val.challengesLogs)
        saveState("dayLogs", val.dayLogs)
        saveState("goalItem", val.goalItem)
        saveState("listOfCheckTask", val.listOfCheckTask)
        saveState("listOfResonsArray", val.listOfResonsArray)
        saveState("progress", val.progress)
         _calback()
      })
      console.log("wczytanie bezy")
    }else{
      console.log("Zaloguj się bo nie wczytam do bazy")
      _calback()
    }
  })
}

export const saveToFire =()=>{
  Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
    database = getFirebase(firebase).database()
    let data = {
      challengesLogs:loadState("challengesLogs"),
      dayLogs:loadState("dayLogs"),
      goalItem:loadState("goalItem"),
      listOfCheckTask:loadState("listOfCheckTask"),
      listOfResonsArray:loadState("listOfResonsArray"),
      progress:loadState("progress")
    }
    if(user){
      database.ref(`${user.id}`).set(data);
      console.log("Zapis do bazy")
    }else{
      console.log("nie mogę wysłać danych, moze się zaloguj")
    }
  })
}

