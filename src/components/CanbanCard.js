import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import CanbanCardEdit from "./CanbanCardItems/CanbanCardEdit"
const Card = styled.div`
  width: 100%;
`;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    textAlign: "center",
    color: "#ffffffc4",
    background: '#171926'
  }
}));

export default function CanbanCard({data}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openTitle, setOpenTitle] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(data.subtitle);
  const [titleValue, setTitleValue] = React.useState(data.title)

console.log(data)
  const handleClose = e => {
    setOpen(false);
    let ItemId = e.target.id.replace("InputNumber", "");
    let z  = e.target.value;
    setInputValue(z)
  };
  const EditCard = e => {
    setOpen(true);
  };

  const handleCloseTitle = e => {
    setOpenTitle(false);
    let ItemId = e.target.id.replace("InputNumber", "");
    let z  = e.target.value;
    setTitleValue(z)
  };
  const EditTitle = e => {
    setOpenTitle(true);
  };



  // const handleClose = e => {

  //   syncFunction();
  // };
console.log(data.date)
  return (
    <><Paper className={classes.paper}>  
    {!openTitle ? (
        <> 
          <h2 onClick={EditTitle}>{titleValue}</h2>
          <p>{data.date}</p>
        </>
      ) : (
        <>
         <CanbanCardEdit inputValue={titleValue} handleClose={handleCloseTitle}/>
        </>
      )}  
      </Paper>
    <Paper className={classes.paper}>
      {!open ? (
        <>         
          <Card onClick={EditCard}>           
            {inputValue}
          </Card>
        </>
      ) : (
        <>
         <CanbanCardEdit inputValue={inputValue} handleClose={handleClose}/>
        </>
      )}      
    </Paper></>
  );
}
