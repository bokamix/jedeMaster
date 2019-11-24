import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
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
    textAlign: "center",
    color: "black"
  }
}));

export default function CanbanCard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("treść");
  const handleClose = e => {
    setOpen(false);
    let ItemId = e.target.id.replace("InputNumber", "");
    let z  = e.target.value;
    setInputValue(z)
  };
  const EditCard = e => {
    setOpen(true);
  };



  // const handleClose = e => {

  //   syncFunction();
  // };

  return (
    <Paper className={classes.paper}>
      {!open ? (
        <>         
          <Card onClick={EditCard}>           
            {inputValue}
          </Card>
        </>
      ) : (
        <>
         <CanbanCardEdit handleClose={handleClose}/>
        </>
      )}      
    </Paper>
  );
}
