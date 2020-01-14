import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MenuPanel from "../components/Menu/MenuPanel";
import  "../../firebase"


const NetlifyIdentity = () => {


return(
  <Layout>
    <SEO title="Home" />
    
    <MenuPanel />
  </Layout>
  )
}

export default NetlifyIdentity
