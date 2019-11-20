import actions from './actions'

const fetchLogs = () => {
  if(window.localStorage.getItem("dayLogs")){
    let dayLogs = JSON.parse(window.localStorage.getItem("dayLogs"));
    return dayLogs
  }
  else return []
  
}

export const getAllLogs = () =>
   (dispatch) => {
    const logs =  fetchLogs()
    logs.map(log => dispatch(actions.add(log)))
  }


