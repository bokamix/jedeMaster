import { loadState, saveState } from '../localStorage'
import moment from "moment";

let toDayIs = loadState("toDayIs")

//// Is new day?  return true false, need : dayLogs, get thame from localstorage, need toDayIs  from local storage////
export const lastLogIsToday = () => {
  if (loadState("dayLogs")) {
    let listOfCheckTaskWork = loadState("dayLogs");
    let today = toDayIs
    let lastElement = listOfCheckTaskWork[listOfCheckTaskWork.length - 1];
    let isSame = moment(lastElement.date).isSame(moment(today), 'day')
    return isSame
  }
}
////////////

////////
//Reset checkList, load listOfCheckTask from 
export const resetChecklist = () => {
  if (loadState("listOfCheckTask")) {
    let listOfCheckTaskWork = loadState("listOfCheckTask");
    listOfCheckTaskWork.forEach((item) => {
      item.done = false
    })
    saveState("listOfCheckTask", listOfCheckTaskWork);
  }
}


//////
export const addLog = (day, logValue) => {
  let dayLogsWork = []
  if (loadState("dayLogs")) {
    dayLogsWork = loadState("dayLogs");
  }
  let dayToAdd = {
    date: day,
    isDone: logValue
  }
  dayLogsWork.push(dayToAdd)
  saveState("dayLogs", dayLogsWork)
  sortLogItems()
}
export const sortLogItems = () => {
  let dayLogsWork = []
  if (loadState("dayLogs")) {
    dayLogsWork = loadState("dayLogs");
    dayLogsWork.sort((a, b) => (a.date > b.date) ? 1 : -1)
    saveState("dayLogs", dayLogsWork)
  }
}
sortLogItems()
export const isTodayDone = () => {
  if (loadState("dayLogs")) {
    let dayLogsWork = loadState("dayLogs");
    let lastElement = dayLogsWork[dayLogsWork.length - 1];
    if (lastElement.isDone == true) {
      return true
    } else return false
  }
}


export const getCheckActivity = () => {
  if (lastLogIsToday()) {
  }
  else { resetChecklist() }
}
getCheckActivity()

export const setGoalStatus = () => {
  if (loadState("goalItem")) {
    let goalInfo = loadState("goalItem");
    let goalStatus = goalInfo.isActive
    return goalStatus
  }
}


export const howManyInCycle = () => {
  if (loadState("dayLogs")) {
    let dayLogsWork = loadState("dayLogs");
    dayLogsWork.pop()
    let i = 0;
    dayLogsWork.forEach((item) => {
      if (item.isDone == true) {
        i++;
      }
      else { i = 0; }
    })
    return i
  }
}

export const isLastLogToday = () => {
  sortLogItems();
  let dayLogsWork = []
  if (loadState("dayLogs")) {

    dayLogsWork = loadState("dayLogs");
    let lastElement = dayLogsWork[dayLogsWork.length - 1];
    let todayDate = toDayIs
    let isTodayValue = moment(lastElement.date).isSame(moment(todayDate), 'day')

    let todayA = moment(todayDate)
    let lastElementW = moment(lastElement.date)
    let diffValue = todayA.diff(lastElementW, "day")
    if (diffValue > 1) {
      let i;
      saveState("progress", 0)
      for (i = 1; i < diffValue; i++) {
        let dayToAddd = moment(toDayIs).subtract(i, 'days')
        addLog(dayToAddd, false)
      }


    }
    else if (diffValue === 1) {
      resetChecklist()
      saveState("progress", 0)


    }

    if (!isTodayValue) {
      addLog(toDayIs, false)
    }

  }
  else {
    addLog(toDayIs, false)
  }
}

isLastLogToday()
export const loadProgress = () => {
  if (loadState("progress")) {
    return loadState("progress")
  } else {
    return 0
  }
}

let goalItem;
export const getGoal = () => {
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
  return goalItem
}



// const getItemFromLog = (day) => {
//     let dayLogsWork = []
//     if (loadState("dayLogs")) {
//       dayLogsWork = loadState("dayLogs");
//       let result = dayLogsWork.find(({ date }) => date === day);
//       if (result) {
//       }
//     }
//   }

  // const removeItemFromLog = (day) => {
  //   let dayLogsWork = []
  //   if (loadState("dayLogs")) {
  //     dayLogsWork = loadState("dayLogs");
  //     dayLogsWork.forEach((item) => {
  //     })
  //     dayLogsWork.splice(dayLogsWork.findIndex(item => item.date == `${day}`), 1)
  //     saveState("dayLogs", dayLogsWork)
  //   }
  // }