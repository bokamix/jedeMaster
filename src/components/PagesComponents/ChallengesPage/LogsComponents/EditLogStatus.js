import React from 'react';


export default function GroupedSelect({inputValue, saveChanges}) {
  return (
    <div>
        <select native defaultValue={inputValue} onChange={saveChanges}>
            <option value={true}>true</option>
            <option value={false}>false</option>
        </select>
    </div>
  );
}
