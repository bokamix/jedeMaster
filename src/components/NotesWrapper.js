import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CanbanCard from '../components/CanbanCard'
import { loadState, saveState } from '../localStorage'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },

  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    textAlign: "center",
    color: "#ffffffc4",
    background: '#202334'
  }
}));

export default function NotesWrapper() {
  const classes = useStyles();


let firstNote
if(!loadState('notes')){
  firstNote =[{ title: "deepEqual" , subtitle:"cośtam", date:"2019-02-12"},{ title: "Druga" , subtitle:"Notatka Druga",date:"2019-02-12"} ];
  saveState("notes", firstNote)
}else{
  firstNote = loadState('notes');
}


  return (
    <div className={classes.root}>   
        {firstNote.map((item,num)=>{
      return<Paper key={num} className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>     
          </Grid>
          <Grid item xs>
          <CanbanCard data={item}/> 
          </Grid>
        </Grid>
      </Paper>
    })}
    </div>
  );
}  