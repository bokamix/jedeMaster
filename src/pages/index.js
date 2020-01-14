import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MenuPanel from "../components/Menu/MenuPanel";
import ContentWrapper from "../components/ContentWrapper"
// import AboutChallenge from "../components/AboutChallenge"
import { loadState } from '../localStorage'
import FirstTimeUser from "../components/FirstTimeOnApp/FirstTimeUser"
import  "../../firebase"
const setHandle =()=>{
  if(loadState('listOfResonsArray')){
   return(false)
  }else{
    return(true)
  }
}
const IndexPage = () => {
  const [firstTime, setFirstTime] = React.useState(setHandle())
  // useEffect(() => {
  //   document.body.addEventListener('click', console.log('klik klik klik XD'));
  // })


  const setHandleFalse =()=>{
    setFirstTime(false)
  }
return(
  <Layout>
    <SEO title="Home" />
       {firstTime ? <FirstTimeUser setStart={setHandleFalse} /> : <>
       <MenuPanel /><ContentWrapper />
       </>}
  </Layout>
  )
}

export default IndexPage
