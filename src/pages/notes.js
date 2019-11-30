import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MenuPanel from "../components/MenuPanel";
import NotesWrapper from "../components/NotesWrapper"
const Notes = () => (
  <Layout>
    <SEO title="Notes" />
    <MenuPanel />
    <NotesWrapper />
  </Layout>
)

export default Notes
