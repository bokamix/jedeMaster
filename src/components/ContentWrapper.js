import React, { useEffect } from "react";
import styled from "styled-components";
import { loadState, saveState } from '../localStorage'
import CheckboxListSecondary from "../components/CheckboxListSecondary";
import ListOfResons from "../components/ListOfResons";
import GoalForm from "./GoalForm";
import moment from "moment";
import ChallengeLogs from './Challengs/ChallengeLogs'
import { getDaysLeft, changeDay } from "./DateManipulation"
import { CircularProgressbarWithChildren, CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import DoneIcon from "../images/check_circle-24px.svg"
import UnDoneIcon from "../images/remove_circle-24px.svg"
import CheckboxWrapper from "./Checkbox/CheckboxesWrapper"

// import LogsContainer from "../app/logs/components/LogsContainer"
// import LogsForm from "../app/logs/components/LogsForm"
// import CanbanCard from "./CanbanCard"
let toDayIs = loadState("toDayIs")
const MainWrapper = styled.div`
  margin: 0 auto;
  @media only screen and (min-width: 900px) {
    width: 800px;
  }
`;
const Paper = styled.div`
 background: #202334;
 padding: 20px;
 margin: 10px;
 border-radius: 20px;
 width: 95%;
 box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
 display: flex;
 flex-wrap: wrap;
 align-items: center;
`

const StartButton = styled.div`
  display: flex;
  justify-content: flex-end;
  width:200px;
  border-radius:20px;
  padding:5px 10px;
  margin: 0 auto;
  margin-bottom: 70px;
  background: #202334;
  padding: 10px 35px;
`;
const MainTitle = styled.h2`
  text-align: center;
`;

const PrograsWrapper = styled.div`
display:flex;
flex-wrap: wrap;
justify-content:center;
`

const Container = styled.div`
  margin:20px;
  display:flex;
  flex-wrap:wrap;
`
const CircleWrapper = styled.div`
  @media only screen and (min-width: 900px) {
    width:290px;
  }
  width:180px;
  margin:0 auto;
  h2{
    font-size:40px;
    margin-top:15px;
  }
`
const Icons = styled.img`
  width: 40px;
  height:40px;
  padding:5px;
`
const lastLogIsToday = () => {
  if (loadState("dayLogs")) {
    let listOfCheckTaskWork = loadState("dayLogs");
    let today = toDayIs
    let lastElement = listOfCheckTaskWork[listOfCheckTaskWork.length - 1];
    let isSame = moment(lastElement.date).isSame(moment(today), 'day')
    return isSame
  }
}

const resetChecklist = () => {
  if (loadState("listOfCheckTask")) {
    let listOfCheckTaskWork = loadState("listOfCheckTask");
    listOfCheckTaskWork.forEach((item) => {
      item.done = false
    })
    saveState("listOfCheckTask", listOfCheckTaskWork);
  }
}
const addLog = (day, logValue) => {
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
const sortLogItems = () => {
  let dayLogsWork = []
  if (loadState("dayLogs")) {
    dayLogsWork = loadState("dayLogs");
    dayLogsWork.sort((a, b) => (a.date > b.date) ? 1 : -1)
    saveState("dayLogs", dayLogsWork)
  }
}
sortLogItems()
const isTodayDone = () => {
  if (loadState("dayLogs")) {
    let dayLogsWork = loadState("dayLogs");
    let lastElement = dayLogsWork[dayLogsWork.length - 1];
    if (lastElement.isDone == true) {
      return true
    } else return false
  }
}


const getCheckActivity = () => {
  if (lastLogIsToday()) {
  }
  else { resetChecklist() }
}
getCheckActivity()

const setGoalStatus = () => {
  if (loadState("goalItem")) {
    let goalInfo = loadState("goalItem");
    let goalStatus = goalInfo.isActive
    return goalStatus
  }
}


const howManyInCycle = () => {
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

const isLastLogToday = () => {
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
const loadProgress = () => {
  if (loadState("progress")) {
    return loadState("progress")
  } else {
    return 0
  }
}
/////////////////////////////////////////////// Start App ////////////////////////////////////////
//////////////////////////////////////// ////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function ContentWrapper() {
  const [active, setActive] = React.useState(setGoalStatus());
  const [dayDone, setdayDone] = React.useState(isTodayDone())
  const [logList, setLogList] = React.useState()
  const [progress, setProgress] = React.useState(loadProgress())
  const [dayLeft, setDayLeft] = React.useState(getDaysLeft())
  const percentage = progress;
  const makeProgress = () => {
    if (progress === 100) {
    } else {
      setProgress(progress + 20)
      let x = progress + 20
      saveState("progress", x)
      if(x === 100){
        console.log('wygrane')
      }
    }
  }
  const makeRegress = () => {
    if (progress === 0) {
    } else {
      setProgress(progress - 20)
      let x = progress - 20
      saveState("progress", x)

    }
  }
  // localStorage.clear();

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

  const startChallenge = () => {
    let startDate = toDayIs;
    let endDate = changeDay(14)
    goalItem.startDate = startDate
    goalItem.endDate = endDate
    goalItem.isActive = true;
    setActive(true)
    goalItem.challengeId = goalItem.challengeId + 1
    saveState("goalItem", goalItem);
  };

  let newChecked = [];
  let listOfCheckTask;
  const getListOfCheck = () => {
    if (!loadState("listOfCheckTask")) {
      listOfCheckTask = [
        {
          item: "Pościeliłem rano łóżko",
          done: false,
          lastActivity: "2019-11-05T10:26:09.491Z"
        },
        {
          item: "Zrobiłem ćwiczenia",
          done: false,
          lastActivity: "2019-11-05T10:26:09.491Z"
        },
        {
          item: "Nie piłem alkoholu",
          done: false,
          lastActivity: "2019-11-05T10:26:09.491Z"
        },
        {
          item: "Nie jadłem słodyczy",
          done: false,
          lastActivity: "2019-11-05T10:26:09.491Z"
        },
        {
          item: "Uczę się 15 min angielskiego",
          done: false,
          lastActivity: "2019-11-05T10:26:09.491Z"
        }
      ];
      saveState("listOfCheckTask", listOfCheckTask);
    } else {
      listOfCheckTask = loadState("listOfCheckTask");
      listOfCheckTask.forEach((element, number) => {

        if (element.done == true) {
          newChecked.push(number);
        }
      })
    }

  }
  getListOfCheck()

  const getItemFromLog = (day) => {
    let dayLogsWork = []
    if (loadState("dayLogs")) {
      dayLogsWork = loadState("dayLogs");
      let result = dayLogsWork.find(({ date }) => date === day);
      if (result) {
      }
    }
  }

  const removeItemFromLog = (day) => {
    let dayLogsWork = []
    if (loadState("dayLogs")) {
      dayLogsWork = loadState("dayLogs");
      dayLogsWork.forEach((item) => {
      })
      dayLogsWork.splice(dayLogsWork.findIndex(item => item.date == `${day}`), 1)
      saveState("dayLogs", dayLogsWork)
    }
  }

  const checkItemDone = () => {
    listOfCheckTask = loadState("listOfCheckTask");
    let dayLogsWork = loadState("dayLogs");
    let result = listOfCheckTask.find(({ done }) => done == false );
    if (result) {
      let elementToChange = dayLogsWork[dayLogsWork.length - 1]
      elementToChange.isDone = false
      saveState("dayLogs", dayLogsWork)
      setdayDone(false)
    }
    else {
      let elementToChange = dayLogsWork[dayLogsWork.length - 1]
      elementToChange.isDone = true
      saveState("dayLogs", dayLogsWork)
      setdayDone(true)
    }
  }

  const showProgresIcons = () => {
    if (loadState("dayLogs")) {
      let dayLogsWork = loadState("dayLogs");
      dayLogsWork.pop()
      dayLogsWork.reverse()
      if(dayLogsWork.length<7){
      return dayLogsWork.map((item, num) => {
        return <span key={num}>{item.isDone == false ? <Icons src={UnDoneIcon} /> : <Icons src={DoneIcon} />}</span>
      })}else{
          let firstWeek = dayLogsWork.slice(0, 6)
          return firstWeek.map((item, num) => {
            return <span key={num}>{item.isDone == false ? <Icons src={UnDoneIcon} /> : <Icons src={DoneIcon} />}</span>
          })
       }
      }
    }
  return (
    <MainWrapper>
      {/* <button onClick={()=>changeDay(1, true)}>Day+</button>
      <button onClick={()=>changeDay(-1, true)}>Day-</button> */}
      <div >
        <Container>
        <Paper>
            <CircleWrapper>
              <CircularProgressbarWithChildren 
                value={percentage} 
                circleRatio={0.75}
                strokeWidth={4}
                  styles={buildStyles({
                  rotation: 1 / 2 + 1 / 8,
                  strokeLinecap: "butt",
                  pathColor:"#65f5ff80",
                  trailColor: "#242f3e"
                })} >
                <div style={{ width: "80%" }}>
                  <CircularProgressbarWithChildren
                    value={ 14 - dayLeft }
                    maxValue={14}
                    circleRatio={0.75}
                    strokeWidth={2}
                    styles={buildStyles({
                      trailColor: "transparent",
                      rotation: 1 / 2 + 1 / 8,
                      pathColor: "green",
                    })}
                  >
                    <h2>{ progress }%</h2>
                    <p>{ dayLeft } day left</p>
                  </CircularProgressbarWithChildren>  
                </div>
              </CircularProgressbarWithChildren>
            </CircleWrapper>
            <div>
              <h3>Co muszę robić codziennie?</h3>
              <CheckboxWrapper makeRegress={makeRegress} makeProgress={makeProgress} checkItemDone={checkItemDone}/>
            </div>
          </Paper>
          <Paper >
            {active ? <h3>Zostało {getDaysLeft()} dni</h3> : ``}
            <p>Zrobiłeś {howManyInCycle()} dni z rzędu.</p>
            <PrograsWrapper>{dayDone == false ? <Icons src={UnDoneIcon} /> : <Icons src={DoneIcon} />}{showProgresIcons()}</PrograsWrapper>
          </Paper>
          <Paper>
            <h3>Twój cel</h3>
            <GoalForm />
          </Paper>
          <Paper>
            <ListOfResons />
          </Paper>
          {/* <CanbanCard /> */}
          {!active ? (
            <StartButton onClick={startChallenge} >
              Rozpocznij 90 dniowe wyzwanie
            </StartButton>
          ) : (
              ``
            )}
        </Container>
      </div>
      {/* < LogsContainer/> */}
      <ChallengeLogs />
    </MainWrapper>
  );
}
