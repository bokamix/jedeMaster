import React from 'react';


export default function EditTextInput({inputValue, saveChanges, itemNumber}) {
  const [value, setValue] = React.useState(`${inputValue}`);
  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
        <input
          id={`${itemNumber}`}
          multiline
          onBlur={saveChanges}
          value={value}
          onChange={handleChange}
        /> 
  );
}