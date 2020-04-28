import React from "react";
import EditTextInput from "../Common/EditTextInput";
import { loadState, saveState } from '../../../localStorage'
import { saveToFire } from "../../../../firebase"

export default function GoalForm() {
  let goalItem
  if(!loadState('goalItem')){    
    goalItem = 	{goal:"Wyjście z przegrywu",date:"05-11-2019"};
    saveState('goalItem',goalItem);
  }
   else{
    goalItem = loadState('goalItem');
   }

  const syncFunction = () =>{
    saveState('goalItem',goalItem);
    saveToFire()
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = e => {
    setOpen(false); 
    goalItem.goal = e.target.value
    syncFunction()
  };

  return (
    <>
      {open  ? <EditTextInput inputValue={goalItem.goal} saveChanges={handleClose} /> : <>
      <h2>{goalItem.goal}</h2><span><p onClick={handleOpen}>Edit</p></span>
      </> }



    </>
  );
}
