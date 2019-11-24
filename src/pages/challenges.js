import React from "react"
import { Link } from "gatsby"
import AboutChallenge from "../components/AboutChallenge"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MenuPanel from "../components/MenuPanel";
const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <MenuPanel /><AboutChallenge />
  </Layout>
)

export default SecondPage
