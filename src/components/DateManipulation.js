import { loadState, saveState, removeState } from '../localStorage'
import moment from "moment";

  let toDayIs
const letTodayIs =()=>{
if(loadState("toDayIs")){
  toDayIs = loadState("toDayIs")
}else{
  toDayIs = moment()
}}
letTodayIs()


saveState("toDayIs", toDayIs)

let isDeveloper = loadState("isDeveloper")
const onDeveloperMod =()=>{
  if(isDeveloper){
  removeState("isDeveloper")
  }else{
    isDeveloper = true
    saveState("isDeveloper", isDeveloper)
  }
}

export const changeDay =(numberOfDay, saveToStorage)=>{
    console.log(numberOfDay)
    let toDayIsChange = moment(toDayIs).add(numberOfDay, "days")
    console.log(toDayIsChange)
    if(saveToStorage){
      saveState("toDayIs", toDayIsChange)
      letTodayIs()
    }
    else{
      return toDayIsChange
    }
}

export const getDaysLeft =()=>{
    let goalItem = loadState("goalItem")
    let endDay = goalItem.endDate;
    let daysLeft = -(moment(toDayIs).diff(endDay, "days"));
    return daysLeft
}
