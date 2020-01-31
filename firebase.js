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

  return firebase
}
let database;


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

