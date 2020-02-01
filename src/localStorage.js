export const loadState = (item) => {
  try {
    const serializedState = localStorage.getItem(`${item}`);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}; 

export const saveState = (item, itemToAdd) => {
  try {
    localStorage.setItem(`${item}`, JSON.stringify(itemToAdd))
  } catch (err) {
  }
}; 

export const removeState = (item) => {
  try {
    localStorage.removeItem(item)
  } catch (err){

  }
};

////
////Local storage default data



