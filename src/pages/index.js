import React, { useEffect, useState } from "react"
import { saveToFire, loadFromFire } from "../../firebase"
import  "../../firebase"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MenuPanel from "../components/Menu/MenuPanel";
import ContentWrapper from "../components/ContentWrapper"
import { loadState, saveState } from '../localStorage'
import FirstTimeUser from "../components/FirstTimeOnApp/FirstTimeUser"
import {getCheckActivity, isLastLogToday } from "../components/InitialFunctions"
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

const IndexPage = () => {
  const [firstTime, setFirstTime] = useState(setHandle())
  const [aplication, reloadAplication] = useState(false)

  const getDataFromDatabase =() =>{
    if(user){
       database.ref(user.id).on('value', (snapshot) => {
         const val = snapshot.val();
         saveState("challengesLogs", val.challengesLogs)
         saveState("dayLogs", val.dayLogs)
         saveState("goalItem", val.goalItem)
         saveState("listOfCheckTask", val.listOfCheckTask)
         saveState("listOfResonsArray", val.listOfResonsArray)
         saveState("progress", val.progress)
         
      console.log('load App in index')
      loadApp()
       })
     }else{
       console.log("Zaloguj się bo nie wczytam do bazy")
       
      console.log('load App in index')
      loadApp()
     }
 }




  useEffect(() => {
      initNetlifyIdentity();

    function loadFromFire(){

        Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
          return database = getFirebase(firebase).database()
         
        }).then(database => {
        console.log("database", database)
        getDataFromDatabase()
        
        })
  }

      loadFromFire()


  },[])


  

  
  const loadApp =()=>{
    console.log("LoadApp")
    getCheckActivity()
    isLastLogToday()
    reloadAplication(true)
  }

  const setHandleFalse =()=>{
    setFirstTime(false)
  }

return(
  <Layout>
    <SEO title="Home" />
    {/* <button onClick={()=>saveToFire()}>Save</button>
    <button onClick={()=>{loadFromFire()}}>Load</button> */}
       {firstTime ? <FirstTimeUser setStart={setHandleFalse} /> : <>
       <MenuPanel /> {aplication ? <ContentWrapper /> : null}
       </>}
  </Layout>
  )
}

export default IndexPage