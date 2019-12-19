import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MenuPanel from "../components/Menu/MenuPanel";
import MigrationPanel from "../components/migration/MigrationPanel"
const Migration = () => (
  <Layout>
    <SEO title="Migration" />
    <MenuPanel /><MigrationPanel/>
  </Layout>
)

export default Migration
