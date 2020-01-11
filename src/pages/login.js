import React, { Component } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { loadState } from "../localStorage"
import { getFirebase } from "../../firebase"
function initNetlifyIdentity() {
  console.log("initNetlifyIdentity called.")
  const script = document.createElement("script");

  script.src = "https://identity.netlify.com/v1/netlify-identity-widget.js"
  script.async = true;
  
  document.body.appendChild(script);
}
let netlifyIdentity

class NetlifyIdentity extends Component {
  componentDidMount() {
    netlifyIdentity = window.netlifyIdentity;
    initNetlifyIdentity();
    const lazyApp = import('firebase/app')
    const lazyDatabase = import('firebase/database')
  
    Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
      const database = getFirebase(firebase).database()
      let data = {
        dada: "duka blat",
      }
      database.ref().set(data);
    })
  }

  

  render() {
    
    return(<div></div>)
  }
}
const IndexPage = () => {
  function openNetlifyModal() {
    if(netlifyIdentity){
      netlifyIdentity.open();
    }
    else
      console.log('netlifyIdentity not defined')
  }
  return(
    <Layout>
      <NetlifyIdentity />
      <SEO title="Home" />
      <h1>Hi people</h1>
      <h2 onClick={() => { openNetlifyModal() }}>Login</h2>
      <p>Welcome to your new Gatsby site.</p>

      <p>Now go build something great.</p>{console.log(loadState('gotrue.user'))}
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout> 
  )
}

export default IndexPage