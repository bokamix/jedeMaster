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


let goalItem;
const getGoal = () => {
  if (!loadState("goalItem")) {
    goalItem = {
      goal: "Podstawowe nawyki",
      isActive: false,
      startDate: "2019-11-05T10:26:09.491Z",
      endDate: "2019-12-08T10:26:09.491Z",
      challengeId: 1,
    };
    saveState("goalItem", goalItem);
  } else {
    goalItem = loadState("goalItem");
  }
}
getGoal()


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

export const getDaysLeft =()=>{/// validation
    let goalItem = loadState("goalItem")
    if(goalItem){
      let endDay = goalItem.endDate;
      let daysLeft = -(moment(toDayIs).diff(endDay, "days"));
      if(daysLeft < 0){
        return 0
      }else{
        return daysLeft
      }
    }
   
}
