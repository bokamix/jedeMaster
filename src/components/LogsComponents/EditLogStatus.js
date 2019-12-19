import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withTheme } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 50,
  },
}));

export default function GroupedSelect({inputValue, saveChanges}) {
  const classes = useStyles();
  return (
    <div>
        <Select native defaultValue={inputValue} onChange={saveChanges}>
            <option value={true}>true</option>
            <option value={false}>false</option>
        </Select>
    </div>
  );
}
