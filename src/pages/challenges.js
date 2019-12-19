import React from "react"
import AboutChallenge from "../components/AboutChallenge"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MenuPanel from "../components/Menu/MenuPanel";
const SecondPage = () => (
  <Layout>
    <SEO title="About Challanges" />
    <MenuPanel /><AboutChallenge />
  </Layout>
)

export default SecondPage
