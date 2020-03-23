import React from "react"
import AboutChallenge from "../components/PagesComponents/ChallengesPage/AboutChallenge"
import Layout from "../components/PagesComponents/Common/layout"
import SEO from "../components/PagesComponents/Common/seo"
import MenuPanel from "../components/PagesComponents/Common/Menu/MenuPanel";
import Radar from "./Radar"
const SecondPage = () => (
  <Layout>
    <SEO title="About Challanges" />
    <MenuPanel /><AboutChallenge />
    <Radar/>
  </Layout>
)

export default SecondPage

