import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import EditTextInput from "./EditTextInput";
import moment from "moment";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function CheckboxListSecondary({ CheckItems, checkItemDone }) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(CheckItems);
  const [open, setOpen] = React.useState(false);
  let listOfCheckTask;
  if (!window.localStorage.getItem("listOfCheckTask")) {
    listOfCheckTask = [
      { item: "Pościeliłem rano łóżko", done: "false", lastActivity:"2019-11-05T10:26:09.491Z", },
      { item: "Zrobiłem ćwiczenia", done: "false", lastActivity:"2019-11-05T10:26:09.491Z", },
      { item: "Nie piłem alkoholu", done: "false", lastActivity:"2019-11-05T10:26:09.491Z", },
      { item: "Nie jadłem słodyczy", done: "false", lastActivity:"2019-11-05T10:26:09.491Z", }
      
    ];
    window.localStorage.setItem(
      "listOfCheckTask",
      JSON.stringify(listOfCheckTask)
    );
  } else {
    listOfCheckTask = JSON.parse(
      window.localStorage.getItem("listOfCheckTask")
    );
  }
  const syncFunction = () => {
    window.localStorage.setItem(
      "listOfCheckTask",
      JSON.stringify(listOfCheckTask)
    );
  };



  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = e => {
    setOpen(false);
    let ItemId = e.target.id.replace("InputNumber", "");
    listOfCheckTask[ItemId].item = e.target.value;
    syncFunction();
  };

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    //  =  currentIndex .... -1 zaznaczanie, 0 odznaczanie

    if (currentIndex === -1) {
      listOfCheckTask[value].done = "true";
      listOfCheckTask[value].lastActivity = moment() 
    } else {
      listOfCheckTask[value].done = "false";     
    }
    window.localStorage.setItem(
      "listOfCheckTask",
      JSON.stringify(listOfCheckTask)
    );

    setChecked(newChecked);
    checkItemDone()
  };


  return (
    <List dense className={classes.root}>
      {listOfCheckTask.map((element, value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem key={value} button onDoubleClick={handleOpen} >
            {open ? (
              <EditTextInput
                inputValue={element.item}
                saveChanges={handleClose}
                itemNumber={value}
              />
            ) : (
              <>
              <EditIcon onClick={handleOpen}/>
                <ListItemText id={labelId} primary={`${element.item}`} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(value)}
                    checked={checked.indexOf(value) !== -1}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemSecondaryAction>
              </>
            )}
          </ListItem>
        );
      })}
    </List>
  );
}
