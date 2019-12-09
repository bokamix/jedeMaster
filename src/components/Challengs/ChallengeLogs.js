import React, { useState, useEffect } from 'react';
import { loadState, saveState, remove, removeState } from '../../localStorage'
import moment from "moment";

export default function ChallengesLogs() {
  useEffect(() => {
    addActiveLog()
  });
  let challengesLogs = []
  const getAllChallenges = () => {
    if (loadState("challengesLogs")) {
      challengesLogs = loadState("challengesLogs")
    }
  }

  const addChallengeLog = (goal, isActive, startDate, endDate, challengeId) => {
    let logToAdd = {
      goal,
      isActive,
      startDate,
      endDate,
      challengeId,
    }
    if (challengesLogs.find(x => x.challengeId === challengeId)) {
    } else {
      challengesLogs.push(logToAdd)
      saveState("challengesLogs", challengesLogs)
    }
  }
  const addActiveLog = () => {
    let { goal, isActive, startDate, endDate, challengeId} = loadState("goalItem")
    addChallengeLog(goal, isActive, startDate, endDate, challengeId)
    console.log(endDate)
    console.log(moment().diff(endDate, 'days'))
  }

  const makeChallengeUnactive =()=> {
    let { goal, isActive, startDate, endDate, challengeId} = loadState("goalItem")
    if(moment().diff(endDate, 'days') > -1){
      isActive = false
    }
    let goalItem = {goal, isActive, startDate, endDate}
    saveState("goalItem", goalItem)
  }

  
  addChallengeLog("Ćwiczenia Kegla", false,"2019-01-01T10:26:09.491Z","2019-01-20T10:26:09.491Z", 1 )
  addChallengeLog("Ćwiczenia Mostki", false,"2019-02-01T10:26:09.491Z","2019-02-20T10:26:09.491Z", 2 )
  addChallengeLog("Ćwiczenia Moqdsdstki", false,"2019-03-01T10:26:09.491Z","2019-03-20T10:26:09.491Z", 3 )

 const ChangeElement =()=>{
  let logToAdd = {
        goal: "Kotki",
        isActive: false,
        startDate: "2019-11-05T10:26:09.491Z",
        endDate: "2019-12-04T10:26:09.491Z",
        challengeId: 15,
  }
  saveState("goalItem", logToAdd)

}
  getAllChallenges()
  makeChallengeUnactive()
  return (
    <div>{console.log(challengesLogs)}
      {/* <button onClick={ChangeElement}></button> */}
    </div>
  );
}  