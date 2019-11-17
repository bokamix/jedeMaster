import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
 
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
 
  inputMultiline:{
    color:'#fffff'
  },
  root:{
    color:'#fffff'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    color: "#ffffffc4",    
  },
  formControl:{
    color:'#fffff'
  },
  input:{
    color:'#fffff'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1), 
    color:'#fffff'
  
  },
}));

export default function EditTextInput({inputValue, saveChanges, itemNumber}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(`${inputValue}`);
  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">    
        <TextField
          id={`${itemNumber}`}
          label="Type something"
          multiline
          color="primary"
          onBlur={saveChanges}
          rowsMax="4"
          value={value}
          onChange={handleChange}
          className={classes.textField}
          margin="normal"
        /> 
    </form>
  );
}