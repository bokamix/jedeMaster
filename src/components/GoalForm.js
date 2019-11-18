import React from "react";
import EditTextInput from "./EditTextInput";
import EditIcon from '@material-ui/icons/Edit';

export default function GoalForm() {
  let goalItem
  if(!window.localStorage.getItem('goalItem')){    
    goalItem = 	{goal:"Wyjście z przegrywu",date:"05-11-2019"};
    window.localStorage.setItem('goalItem', JSON.stringify(goalItem));
  }
   else{
    goalItem = JSON.parse(window.localStorage.getItem('goalItem'));
   }

  const syncFunction = () =>{
    window.localStorage.setItem('goalItem', JSON.stringify(goalItem));
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
      <h2>{goalItem.goal}</h2><span><EditIcon onClick={handleOpen}/></span>
      </> }



    </>
  );
}
