import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import EditTextInput from "./EditTextInput";
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 300,
    backgroundColor: '#202334'
    
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

export default function ListOfResons() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  ///////////////// Local Storage
  let listOfResonsArray
  if(!window.localStorage.getItem('listOfResonsArray')){    
    listOfResonsArray = ["A", "B", "C"];
    window.localStorage.setItem('listOfResonsArray', JSON.stringify(listOfResonsArray));
  }
   else{
    listOfResonsArray = JSON.parse(window.localStorage.getItem('listOfResonsArray'));
   }
  ///////////////// Local Storage Day




  ///////////////// Local Storage

  const syncFunction = () =>{
    window.localStorage.setItem('listOfResonsArray', JSON.stringify(listOfResonsArray));
  }
  

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = e => {
    setOpen(false);  
    let ItemId = e.target.id.replace('InputNumber','');
    listOfResonsArray[ItemId] = e.target.value
    syncFunction()

  };

  const listItems = listOfResonsArray.map((item, num) => (
    <ListItem button key={`Item${num}`} onDoubleClick={() => handleOpen()} >
      {open ? (
        <EditTextInput inputValue={item} saveChanges={handleClose} itemNumber={num}/>
      ) : (
        <>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary={item} />
          <EditIcon onClick={() => handleOpen()}/>
        </>
      )}
    </ListItem>
  ));

  return (
    <>
      <List component="nav" className={classes.root} aria-label="contacts">
        {listItems}
      </List>
    </>
  );
}
