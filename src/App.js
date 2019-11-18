import React from "react";
import "./index.css";
import "./App.css";
import MenuPanel from "./components/MenuPanel";

import ContentWrapper from "./components/ContentWrapper"
class App extends React.Component {
  state = {};

  render() {
    return (
      <>
      <MenuPanel />
        <ContentWrapper />
      </>
    );
  }
}

export default App;
