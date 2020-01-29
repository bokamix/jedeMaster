import React, { useEffect, useState } from "react"
import { saveToFire, loadFromFire } from "../../firebase"
import  "../../firebase"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MenuPanel from "../components/Menu/MenuPanel";
import ContentWrapper from "../components/ContentWrapper"
// import AboutChallenge from "../components/AboutChallenge"
import { loadState } from '../localStorage'
import FirstTimeUser from "../components/FirstTimeOnApp/FirstTimeUser"
import {getCheckActivity, isLastLogToday } from "../components/InitialFunctions"
import ModalWrapper from "../components/ModalWithData/ModalWrapper"



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
  const [firstTime, setFirstTime] = React.useState(setHandle())
  const [aplication, reloadAplication] = useState(false)
  useEffect(() => {
    initNetlifyIdentity();
    console.log("iniet Net... End")
    loadFromFire().then(
      loadApp()
    )
  },[])


  const loadApp =()=>{
    console.log("asyn")
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
    <ModalWrapper />
    {/* <button onClick={()=>saveToFire()}>Save</button>
    <button onClick={()=>{loadFromFire()}}>Load</button> */}
       {firstTime ? <FirstTimeUser setStart={setHandleFalse} /> : <>
      {aplication ? <><MenuPanel /><ContentWrapper /></> : null}
       </>}
  </Layout>
  )
}

export default IndexPage