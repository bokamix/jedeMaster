import React, { useState } from 'react';
import styled from "styled-components"
import { navigate } from "gatsby-link"
import { loadState } from "../../localStorage"
const FormWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  margin-top: 20px;
  position: relative;
  span {
    display: block;
    cursor: pointer;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 20px;
    right: 20px;
  }
  div {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
  }
`
let dayLogs = loadState("dayLogs")
let listOfResonsArray = loadState('listOfResonsArray')
let goalItem =loadState('goalItem')
let challengesLogs = loadState('challengesLogs')
let listOfCheckTask = loadState('listOfCheckTask')
let dataTo = {dayLogs: dayLogs, listOfCheckTask: listOfCheckTask, goalItem:goalItem, challengesLogs:challengesLogs, listOfResonsArray:listOfResonsArray}
dataTo = JSON.stringify(dataTo);


function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}
export default function ContactForm() {
  const [state, setState] = useState({})

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value  })
  }
  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error))
  }

  return (
      <FormWrapper>
        <div>
          <h1>Pobierz dane</h1>
          <form
            name="Json"
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="bot-field" onChange={handleChange} />
              </label>
            </p>
              <label>
                Twój adres e-mail:
                <br />
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                />
              </label>
              <select
                  name="dataJson[]"
                  multiple
                  required
                  onChange={handleChange}
                >
                  <option value={dataTo}>All data</option>
                </select>
            <button  type="submit">
              <p>Złóż zamówienie</p>
            </button>
          </form>
        </div>
      </FormWrapper>
  )
}