import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { loadState } from "../localStorage"
import { getFirebase } from "../../firebase"

let netlifyIdentity

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
let database
const NetlifyIdentity = () => {
  useEffect(() => {
    initNetlifyIdentity();
    console.log("iniet Net... End")


    const lazyApp = import('firebase/app')
    const lazyDatabase = import('firebase/database')
    Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
      database = getFirebase(firebase).database()
      let data = {
        dada: "Repairt net duka blat",
      }
    })
  });
let itemNumber=0
const saveToFirebase =()=>{
  itemNumber++
  let data = {
    dada: `${itemNumber}`,
  }
  let id= loadState('gotrue.user.id')
  if(id){
    database.ref(`${id}`).set(data);
  }
  console.log(itemNumber)
}

  return(
    <Layout>
      <SEO title="Home" />
      <h1>Witaj w panelu logowania</h1>
      <h2 onClick={()=>openNetlifyModal()}>Login</h2>
      <button onClick={saveToFirebase}>Zapisz dane</button>
      <p>
        Mozesz stworzyć konto, dzięki czemu twoje dane będą przechowywane w chmurze Google.
        Po zalogowaniu się na innym urządzeniu twoje dane się zsynchronizują. 
        Mozesz tez trzymać dane lokalnie, przez co są one dostępne tylko na danym urządzaniu.

      </p>{console.log(loadState('gotrue.user.id'))}
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout> 
  )
}
export default NetlifyIdentity