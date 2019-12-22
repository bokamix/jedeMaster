import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MenuPanel from "../components/Menu/MenuPanel";
import ContentWrapper from "../components/ContentWrapper"
// import AboutChallenge from "../components/AboutChallenge"
import { loadState } from '../localStorage'


const IndexPage = () => {
  const [firstTime, setFirstTime] = React.useState(loadState('goalItem'))
   
  const setHandle =()=>{
    setFirstTime(true)
  }
return(
  <Layout>
    <SEO title="Home" />
       <MenuPanel /><ContentWrapper />
  </Layout>
  )
}

export default IndexPage
