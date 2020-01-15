import React from "react";
import EditTextInput from "./EditTextInput";
import styled from "styled-components";
import { loadState, saveState } from '../localStorage'
import { saveToFire, loadFromFire } from "../../firebase"

const TitleWrapper = styled.div`
display:flex;
align-items:center;
justify-content:space-around;
`


export default function ListOfResons() {
  const [open, setOpen] = React.useState(false);

  ///////////////// Local Storage
  let listOfResonsArray
  if(!loadState('listOfResonsArray')){    
    listOfResonsArray = ["A", "B", "C", "D", "E", "F"];
    saveState('listOfResonsArray',listOfResonsArray);
  }
   else{
    listOfResonsArray = loadState('listOfResonsArray');
   }
  ///////////////// Local Storage Day




  ///////////////// Local Storage

  const syncFunction = () =>{
    saveState('listOfResonsArray',listOfResonsArray);
  }
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = e => {
    setOpen(false);  
    let ItemId = e.target.id.replace('InputNumber','');
    listOfResonsArray[ItemId] = e.target.value
    syncFunction()
    saveToFire()
  };

  const listItems = listOfResonsArray.map((item, num) => (
    <ul  key={`Item${num}`} >
      {open ? (
        <EditTextInput inputValue={item} saveChanges={handleClose} itemNumber={num}/>
      ) : (
        <>
          <li>{item}</li>
        </>
      )}
    </ul>
  ));

  return (
    <>
      <TitleWrapper><h3>Dlaczego chcesz to zrobić?</h3><span><p onClick={() => handleOpen()}>Edit</p></span></TitleWrapper>
      <div component="nav"  aria-label="contacts">
        {listItems}
      </div>
    </>
  );
}
