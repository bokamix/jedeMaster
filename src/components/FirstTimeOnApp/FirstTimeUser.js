import React from "react";
import styled from "styled-components";
import { loadState, saveState } from '../../localStorage'

export default function DayLogAccordion() {
  const [open, setOpen] = React.useState(false);

  const installDefaultData =()=>{
    if (!loadState("goalItem")) {
      let goalItem = {
        goal: "Podstawowe nawyki",
        isActive: false,
        startDate: "2019-11-05T10:26:09.491Z",
        endDate: "2019-12-08T10:26:09.491Z",
        challengeId: 1,
      };
      saveState("goalItem", goalItem);}

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

    
  }





  return (
    <div>
        <h2>Jesteś pierwszy raz w aplikacji JedeMaster</h2>
        <p>Żeby przejść dalej musisz odpowiedzieć na następujące pytania lub wybrać gotowy challange, którego chcesz się podjąć</p>
        <ul>
            <li>1. Ćwiczenia</li>
            <li>2. Nawyki finansowe</li>
            <li>3. Wyjście z przegrywu</li>
            <li>4. Dieta</li>
            <li>5. Rozwój mózgu</li>
        </ul>
        <button onCLick={installDefaultData}>Zacznij!</button>
    </div>
  );
}
