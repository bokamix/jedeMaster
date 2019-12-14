import React, { useState, useEffect } from 'react';
import { loadState, saveState, remove, removeState } from '../../localStorage'
import moment from "moment";
let toDayIs = loadState("toDayIs")

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
    let { goal, isActive, startDate, endDate, challengeId } = loadState("goalItem")
    addChallengeLog(goal, isActive, startDate, endDate, challengeId)
  }

  const makeChallengeUnactive =()=> {
    let goalItem = loadState("goalItem")
    if(loadState("goalItem")){
    if(moment(toDayIs).diff(goalItem.endDate, 'days') > -1){
      goalItem.isActive = false
    }
    saveState("goalItem", goalItem)
  }
  }

  
  // addChallengeLog("Ćwiczenia Kegla", false,"2019-01-01T10:26:09.491Z","2019-01-20T10:26:09.491Z", 1 )
  


  getAllChallenges()
  makeChallengeUnactive()
  return (
    <div>{console.log(challengesLogs)}
      {/* <button onClick={ChangeElement}></button> */}
    </div>
  );
}  