import React, { useState, useEffect } from "react"
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

function openNetlifyModal() {
  const netlifyIdentity = window.netlifyIdentity;

  if(netlifyIdentity)
    netlifyIdentity.open();
  else
    console.log('netlifyIdentity not defined')
}

//////
const NetlifyIdentity = () => {
    useEffect(() => {
    initNetlifyIdentity();
    console.log("iniet Net... End")})


   

  return(
    <Layout>
      <SEO title="Home" />
      <h1>Witaj w panelu logowania</h1>
      <h2 onClick={()=>openNetlifyModal()}>Login</h2>
      <p>
        Mozesz stworzyć konto, dzięki czemu twoje dane będą przechowywane w chmurze Google.
        Po zalogowaniu się na innym urządzeniu twoje dane się zsynchronizują. 
        Mozesz tez trzymać dane lokalnie, przez co są one dostępne tylko na danym urządzaniu.
      </p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout> 
  )
}
export default NetlifyIdentity