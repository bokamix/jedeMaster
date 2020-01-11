import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MenuPanel from "../components/Menu/MenuPanel";
import ContentWrapper from "../components/ContentWrapper"
// import AboutChallenge from "../components/AboutChallenge"
import { loadState } from '../localStorage'
import FirstTimeUser from "../components/FirstTimeOnApp/FirstTimeUser"

const IndexPage = () => {
  const [firstTime, setFirstTime] = React.useState(loadState('goalItem'))
   
  const setHandle =()=>{
    if(loadState('listOfResonsArray')){
      setFirstTime(true)
    }else{
      setFirstTime(false)
    }
    setHandle()
  }
return(
  <Layout>
    <SEO title="Home" />
       {/* {firstTime ? <FirstTimeUser /> : <>
       <MenuPanel /><ContentWrapper />
       </>} */}
       <MenuPanel /><ContentWrapper />

  </Layout>
  )
}

export default IndexPage
