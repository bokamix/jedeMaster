import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";


const Card = styled.div`
    width:100%;
`
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "white"
  }
}));




export default function CanbanCard() {
  const classes = useStyles();
  const [active, setActive] = React.useState(false);


const EditCard =(e)=>{
    console.log('wywołąnie')
}



  return ( 
              <Paper className={classes.paper}>
                <Card onClick={EditCard}> <h3>Aniołki</h3></Card>
                <Card onClick={EditCard}> <h3>Diabełki</h3></Card>
              </Paper>         
  );
}
