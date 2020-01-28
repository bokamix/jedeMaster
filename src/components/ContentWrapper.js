import React, { useEffect } from "react";
import styled from "styled-components";
import { loadState, saveState } from '../localStorage'
import ListOfResons from "../components/ListOfResons";
import GoalForm from "./GoalForm";
import ChallengeLogs from './Challengs/ChallengeLogs'
import { getDaysLeft, changeDay } from "./DateManipulation"
import { CircularProgressbarWithChildren, CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import DoneIcon from "../images/check_circle-24px.svg"
import UnDoneIcon from "../images/remove_circle-24px.svg"
import CheckboxWrapper from "./Checkbox/CheckboxesWrapper"
import {getGoal, isTodayDone, setGoalStatus,howManyInCycle, loadProgress } from "../components/InitialFunctions"
import { device } from './Composition/Breakpoints';
import iconChecklist from '../images/assignment-24px.svg'

let toDayIs = loadState("toDayIs")
// import LogsContainer from "../app/logs/components/LogsContainer"
// import LogsForm from "../app/logs/components/LogsForm"
// import CanbanCard from "./CanbanCard"
const MainWrapper = styled.div`
  margin: 0 auto;
  @media only screen and (min-width: 900px) {
    width: 800px;
  }
`;
const Paper = styled.div`
 background: #2023348f;
 padding: 20px;
 margin: 10px;
 border-radius: 20px;
 width: 95%;
 box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
 display: flex;
 flex-wrap: wrap;
 align-items: center;
 &:last-of-type {
  margin-bottom: 76px;
}
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

const PrograsWrapper = styled.div`
display:flex;
flex-wrap: wrap;
justify-content:center;
width:100%;
`

const Container = styled.div`
  margin: 0px;
  display:flex;
  flex-wrap:wrap;
  @media ${device.laptop} {
    margin:20px;
  }
`
const CircleWrapper = styled.div`
  @media only screen and (min-width: 900px) {
    width:290px;
  }
  width:180px;
  margin:0 auto;
  h2{
    font-size:30px;
    margin: 0;
    margin-top:15px;
  }
`
const Icons = styled.img`
  width: 40px;
  height:40px;
  padding:5px;
`

const ChecklistShow = styled.button`
  position: absolute;
  top:100px;
  right:30px;
  border: none;
  background: transparent;
  color:white;
  font-weight:800;
`

///////// end style/ /////
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
  const [resons, showResons] = React.useState(false)
  const [checklist, showChecklist] = React.useState(false)

  const percentage = progress; /// Progress bar
  let goalItem = getGoal()
  
  ///Make progress get progress from
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

  //// Make regres
  const makeRegress = () => {
    if (progress === 0) {
    } else {
      setProgress(progress - 20)
      let x = progress - 20
      saveState("progress", x)

    }
  }
  

///start chalange
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

  
//// Check Item is Done
  let listOfCheckTask = []
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


  //// Show progress icon
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
        <ChecklistShow onClick={()=>showChecklist(!checklist)}><img  src={iconChecklist} alt="Checklist" /></ChecklistShow>
        <Container>
        {checklist ? <Paper>
        <GoalForm />
        <PrograsWrapper>{dayDone == false ? <Icons src={UnDoneIcon} /> : <Icons src={DoneIcon} />}{showProgresIcons()}</PrograsWrapper>
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
                    <p>Seria {howManyInCycle()}</p>
                  </CircularProgressbarWithChildren>  
                </div>
              </CircularProgressbarWithChildren>
            </CircleWrapper>
            <div>
              <CheckboxWrapper makeRegress={makeRegress} makeProgress={makeProgress} checkItemDone={checkItemDone}/>
               <button onClick={()=>showResons(!resons)}>{resons ? "Schowaj powody" : "Pokaz powody"}</button>
            </div>
          </Paper> : null}
          {resons ? 
            <Paper>
              <ListOfResons />
            </Paper> 
          : null}
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
