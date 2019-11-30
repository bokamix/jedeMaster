import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from "styled-components";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CanbanCard from "./CanbanCard"

const MainWrapper = styled.div`
width:70%;
margin: 0 auto;
margin-top:100px;
`

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function AboutChallenge() {
  const classes = useStyles();

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <Paper className={classes.paper}><CanbanCard/></Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}><CanbanCard/></Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}><CanbanCard/></Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <MainWrapper className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </MainWrapper>
  );
}