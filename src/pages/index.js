import React, { useEffect } from "react"
import  "../../firebase"
import { useAsync } from 'react-async';
import { loadState, saveState } from "../localStorage"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MenuPanel from "../components/Menu/MenuPanel";
import ContentWrapper from "../components/ContentWrapper"
// import AboutChallenge from "../components/AboutChallenge"
import FirstTimeUser from "../components/FirstTimeOnApp/FirstTimeUser"
import {getCheckActivity, isLastLogToday } from "../components/InitialFunctions"
let user = loadState('gotrue.user')
user = "sdads"
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
 const getFirebase = firebase => {
  if (firebaseInstance) {
    return firebaseInstance
  }
  firebase.initializeApp(config)
  firebaseInstance = firebase
  return firebase
}
let database;



const loadApp =()=>{
  console.log("asyn")
  getCheckActivity()
  isLastLogToday()
  return true
}

function initNetlifyIdentity() {
  console.log("initNetlifyIdentity called.")
  const script = document.createElement("script");
  script.src = "https://identity.netlify.com/v1/netlify-identity-widget.js"
  script.async = true;
  document.body.appendChild(script);
}

export function openNetlifyModal() {
  const netlifyIdentity = window.netlifyIdentity;

  if(netlifyIdentity)
    netlifyIdentity.open();
  else
    console.log('netlifyIdentity not defined')
}


const setHandle =()=>{
  if(loadState('listOfResonsArray')){
   return(false)
  }else{
    return(true)
  }
}


const loadFromFire = async () =>{
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
        return(
          <>
              <MenuPanel /><ContentWrapper />
          </>
        )
      })
      console.log("wczytanie bezy")
    }else{
      console.log("Zaloguj się bo nie wczytam do bazy")
      return(
        <>
            <MenuPanel /><ContentWrapper />
        </>
      )
    }
  })
}



const IndexPage = () => {
  const { data, error, isLoading } = useAsync({ promiseFn: loadFromFire })
  useEffect(() => {
    initNetlifyIdentity();
    console.log("iniet Net... End")})
    if (isLoading) return "Loading..."
    if (error) return `Something went wrong: ${error.message}`
    if (data)

    console.log(data)
return(
  <Layout>
    <SEO title="Home" />
    {/* <button onClick={()=>saveToFire()}>Save</button>
    <button onClick={()=>{loadFromFire()}}>Load</button> */}
       
   
  </Layout>
  )
}

export default IndexPage
