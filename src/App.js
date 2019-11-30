import React from "react";
import "./index.css";
import "./App.css";
import MenuPanel from "./components/MenuPanel";
import ContentWrapper from "./components/ContentWrapper"
import NewUserPage from "./components/NewUserPage"
import AboutChallenge from "./components/AboutChallenge"

const isDataExist = () =>{
  if(JSON.parse(window.localStorage.getItem("goalItem"))){
      return true
    }
    else return false
    
}

const App =()=> { 
  const [firstTime, setFirstTime] = React.useState(isDataExist())
   
  const setHandle =()=>{
    setFirstTime(true)
  }
  
  return (
      <>    
     
      {firstTime ? 
      <> <MenuPanel /><ContentWrapper />
      </> :
       <NewUserPage setHandle={setHandle} />      
    //  <><MenuPanel /><AboutChallenge /> </>
       }

      </>
    );
  
}

export default App;
