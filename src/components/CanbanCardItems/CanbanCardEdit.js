import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
 
 root:{
    color:'black',   
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1), 
    color:'black',    
  },
  label:{
    color:'black',    
  },
  container:{
    '&$focusVisible': {
      color: "red",
    },
  }

}));

export default function CanbanCardEdit({inputValue, handleClose, itemNumber}) {
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
          label="Type Somthings"
          multiline
          onBlur={handleClose}
          rowsMax="4"
          value={value}
          onChange={handleChange}
          className={classes.textField}
          margin="normal"
          InputProps={{
            className: classes.root,
        }}
        InputLabelProps={{
          className:classes.label,
        }}
   
        /> 
    </form>
  );
}