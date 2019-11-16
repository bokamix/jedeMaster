import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  
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