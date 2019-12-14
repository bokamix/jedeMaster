import React, { useEffect } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import CheckboxListSecondary from "../components/CheckboxListSecondary";
import ListOfResons from "../components/ListOfResons";
import NavigationIcon from "@material-ui/icons/Navigation";
import Fab from "@material-ui/core/Fab";
import GoalForm from "./GoalForm";
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import moment from "moment";
import Container from "@material-ui/core/Container";
import { loadState, saveState } from '../localStorage'
import ChallengeLogs from './Challengs/ChallengeLogs'
import { getDaysLeft, changeDay } from "./DateManipulation"
// import LogsContainer from "../app/logs/components/LogsContainer"
// import LogsForm from "../app/logs/components/LogsForm"
// import CanbanCard from "./CanbanCard"
let toDayIs = loadState("toDayIs")
const MainWrapper = styled.div`
  margin: 0 auto;
  margin-top: 100px;
  @media only screen and (min-width: 900px) {
    width: 800px;
  }
`;
const Paper = styled.div`
 background: #202334;
 padding:30px;
 border-radius: 20px;
`

const StartButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 50px;
  margin-top: 40px;
`;
const MainTitle = styled.h2`
  text-align: center;
`;

const PrograsWrapper = styled.div`
display:flex;
flex-wrap: wrap;
justify-content:center;
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
      item.done = "false"
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
    isDone: `${logValue}`
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
    if (lastElement.isDone === "true") {
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
      if (item.isDone === "true") {
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
      for (i = 1; i < diffValue; i++) {
        let dayToAddd = moment(toDayIs).subtract(i, 'days')
        addLog(dayToAddd, "false")
      }


    }
    else if (diffValue === 1) {
      resetChecklist()


    }

    if (!isTodayValue) {
      addLog(toDayIs, "false")
    }

  }
  else {
    addLog(toDayIs, "false")
  }
}

isLastLogToday()
/////////////////////////////////////////////// Start App ////////////////////////////////////////
//////////////////////////////////////// ////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function ContentWrapper() {
  const [active, setActive] = React.useState(setGoalStatus());
  const [dayDone, setdayDone] = React.useState(isTodayDone())
  const [logList, setLogList] = React.useState()

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
    goalItem.challengeId =  goalItem.challengeId + 1
    saveState("goalItem", goalItem);
  };

  let newChecked = [];
  let listOfCheckTask;
  const getListOfCheck = () => {
    if (!loadState("listOfCheckTask")) {
      listOfCheckTask = [
        {
          item: "Pościeliłem rano łóżko",
          done: "false",
          lastActivity: "2019-11-05T10:26:09.491Z"
        },
        {
          item: "Zrobiłem ćwiczenia",
          done: "false",
          lastActivity: "2019-11-05T10:26:09.491Z"
        },
        {
          item: "Nie piłem alkoholu",
          done: "false",
          lastActivity: "2019-11-05T10:26:09.491Z"
        },
        {
          item: "Nie jadłem słodyczy",
          done: "false",
          lastActivity: "2019-11-05T10:26:09.491Z"
        },
        {
          item: "Uczę się 15 min angielskiego",
          done: "false",
          lastActivity: "2019-11-05T10:26:09.491Z"
        }
      ];
      saveState("listOfCheckTask", listOfCheckTask);
    } else {
      listOfCheckTask = loadState("listOfCheckTask");
      listOfCheckTask.forEach((element, number) => {

        if (element.done === "true") {
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
      dayLogsWork.splice(dayLogsWork.findIndex(item => item.date === `${day}`), 1)
      saveState("dayLogs", dayLogsWork)
    }
  }

  const checkItemDone = () => {
    listOfCheckTask = loadState("listOfCheckTask");
    let dayLogsWork = loadState("dayLogs");
    let result = listOfCheckTask.find(({ done }) => done === "false");
    if (result) {
      let elementToChange = dayLogsWork[dayLogsWork.length - 1]
      elementToChange.isDone = "false"
      saveState("dayLogs", dayLogsWork)
      setdayDone(false)
    }
    else {
      let elementToChange = dayLogsWork[dayLogsWork.length - 1]
      elementToChange.isDone = "true"
      saveState("dayLogs", dayLogsWork)
      setdayDone(true)
    }
  }

  const showProgresIcons = () => {
    if (loadState("dayLogs")) {
      let dayLogsWork = loadState("dayLogs");
      dayLogsWork.pop()
      dayLogsWork.reverse()
      return dayLogsWork.map((item, num) => {
        return <span key={num}>{item.isDone === "false" ? <ClearIcon /> : < DoneIcon />}</span>

      })
    }
  }



  return (
    <MainWrapper>
      <MainTitle>JedeStym</MainTitle>
      <button onClick={()=>changeDay(1, true)}>Day+</button>
      <button onClick={()=>changeDay(-1, true)}>Day-</button>
      <div >
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper >
                <h3>Twój cel</h3>
                <GoalForm />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper >
                {active ? <h3>Zostało {getDaysLeft()} dni</h3> : ``}
                <p>Zrobiłeś {howManyInCycle()} dni z rzędu.</p>
              </Paper>
              <Paper  >
                <PrograsWrapper>{dayDone === false ? <ClearIcon /> : < DoneIcon />}{showProgresIcons()}</PrograsWrapper>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper >
                <h3>Co muszę robić codziennie?</h3>
                <CheckboxListSecondary CheckItems={newChecked} checkItemDone={checkItemDone} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper>
                <ListOfResons />
              </Paper>
            </Grid>
          </Grid>
          {/* <CanbanCard /> */}
          {!active ? (
            <StartButton>
              <Fab
                onClick={startChallenge}
                variant="extended"
                aria-label="like"
               
              >
                <NavigationIcon />
                Rozpocznij 90 dniowe wyzwanie
              </Fab>
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
