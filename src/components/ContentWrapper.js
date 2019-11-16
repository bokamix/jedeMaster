import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CheckboxListSecondary from "../components/CheckboxListSecondary";
import ListOfResons from "../components/ListOfResons";
import NavigationIcon from "@material-ui/icons/Navigation";
import Fab from "@material-ui/core/Fab";
import GoalForm from "./GoalForm";
import moment from "moment";
import Container from "@material-ui/core/Container";
import MenuPanel from "./MenuPanel";
import LogsContainer from "../app/logs/components/LogsContainer"
import LogsForm from "../app/logs/components/LogsForm"

const MainWrapper = styled.div`
  margin: 0 auto;
  margin-top: 100px;
  @media only screen and (min-width: 900px) {
    width: 800px;
  }
`;
const StartButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 50px;
  margin-top: 40px;
`;
const MainTitle = styled.h2`
  text-align: center;
`;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));
////////////////////////////////////////
const lastLogIsToday = () =>{
  let listOfCheckTaskWork = JSON.parse(window.localStorage.getItem("dayLogs"));
  let today = moment().toISOString();
  let lastElement = listOfCheckTaskWork[listOfCheckTaskWork.length - 1]; 
  let isSame = moment(lastElement.date).isSame(moment(today), 'day') 
  return isSame
}

const resetChecklist = () =>{
  let listOfCheckTaskWork = JSON.parse(window.localStorage.getItem("listOfCheckTask"));
  listOfCheckTaskWork.forEach((item)=>{
    item.done = "false"   
  })
  window.localStorage.setItem("listOfCheckTask",JSON.stringify(listOfCheckTaskWork));
  
}


const getCheckActivity =()=>{
  if(lastLogIsToday()){
  }
  else{resetChecklist()}
}




getCheckActivity()

export default function ContentWrapper() {
  const classes = useStyles();
  const [active, setActive] = React.useState(false);

  // window.localStorage.clear();
  let goalItem;
  if (!window.localStorage.getItem("goalItem")) {
    goalItem = {
      goal: "Podstawowe nawyki",
      startDate: "2019-11-05T10:26:09.491Z",
      endDate: "2020-01-04T10:26:09.491Z"
    };
    window.localStorage.setItem("goalItem", JSON.stringify(goalItem));
  } else {
    goalItem = JSON.parse(window.localStorage.getItem("goalItem"));
  }
  useEffect(() => {     
    isLastLogToday()
});

  let newChecked = [];
  let listOfCheckTask;
  const getListOfCheck =()=>{ 
    if (!window.localStorage.getItem("listOfCheckTask")) {
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
        }
      ];
      window.localStorage.setItem(
        "listOfCheckTask",
        JSON.stringify(listOfCheckTask)
      );
    } else {
      listOfCheckTask = JSON.parse(
        window.localStorage.getItem("listOfCheckTask")
      );
      ///Add Check Element From Local Storage
      listOfCheckTask.forEach((element, number) => {
        
        if (element.done === "true") {
          newChecked.push(number);
        }})
    }
  
  }
  getListOfCheck()
  



  const startChallenge = () => {
    let startDate = moment(); //.format('DD-MM-YYYY');
    let endDate = moment();
    endDate.add(14, "days");
    goalItem.startDate = startDate.toISOString();
    goalItem.endDate = endDate.toISOString();
    goalItem.isActive = true;
    setActive(true);
    window.localStorage.setItem("goalItem", JSON.stringify(goalItem));
  };

//// Init Last Active Day



//////////////
//////// Init day logs


  let endDay = goalItem.endDate;
  let daysLeft = -(moment().diff(endDay, "days") - 1);
 ////////////////////////////////////////////////////////////////////
 ////             Main Functions

 const sortLogItems = () => {
  let dayLogsWork = []
  if(window.localStorage.getItem("dayLogs")){
    dayLogsWork = JSON.parse(window.localStorage.getItem("dayLogs"));
    dayLogsWork.sort((a, b) => (a.date > b.date) ? 1 : -1)
    window.localStorage.setItem("dayLogs", JSON.stringify(dayLogsWork))
    console.log(`przesortowano`)
  }
  else{console.log(`nie ma nic w logach`)}
}



const addLog = (day, logValue) =>{
  let dayLogsWork = []
  if(window.localStorage.getItem("dayLogs")){
    dayLogsWork = JSON.parse(window.localStorage.getItem("dayLogs"));
  }
  let dayToAdd = {
    date: day,
    isDone: `${logValue}`
  }
  dayLogsWork.push(dayToAdd)
  window.localStorage.setItem("dayLogs", JSON.stringify(dayLogsWork))
  sortLogItems()
}
// addLog(moment().toISOString(),"false")



const getItemFromLog = (day) =>{
  let dayLogsWork = []
  if(window.localStorage.getItem("dayLogs")){
    dayLogsWork = JSON.parse(window.localStorage.getItem("dayLogs"));
    let result = dayLogsWork.find(({date}) => date === day);
      if(result){
        console.log(result, "getItemDFromLog remove")
      }
      else{
        console.log(result, "nie znaleziono tego obiektu")
      }
    
  }
  else{console.log(`nie ma nic w logach`)}
}

const removeItemFromLog = (day) =>{
  let dayLogsWork = []
  if(window.localStorage.getItem("dayLogs")){

    dayLogsWork = JSON.parse(window.localStorage.getItem("dayLogs"));
    dayLogsWork.forEach((item)=>{
      console.log(item.date)
    })    
    dayLogsWork.splice(dayLogsWork.findIndex(item => item.date === `${day}`), 1)
    window.localStorage.setItem("dayLogs", JSON.stringify(dayLogsWork))

  }
  else{console.log(`nie ma nic w logach`)}
}


const isLastLogToday =()=>{
  console.log(`isLastLogToday`)
  sortLogItems();
  let dayLogsWork = []
  if(window.localStorage.getItem("dayLogs")){

   dayLogsWork = JSON.parse(window.localStorage.getItem("dayLogs"));
    let lastElement = dayLogsWork[dayLogsWork.length - 1];
    let todayDate = moment().toISOString()
    let isTodayValue = moment(lastElement.date).isSame(moment(todayDate), 'day')    

    let todayA = moment(todayDate)
    let lastElementW = moment(lastElement.date)
    let diffValue = todayA.diff(lastElementW, "day")    
    if(diffValue > 1)
    {
      let i;
          for (i = 1; i < diffValue; i++) {
           let dayToAddd = moment().subtract(i, 'days').toISOString()           
           addLog(dayToAddd, "false")
        }


    }
    else if (diffValue === 1){
   resetChecklist() 
    
    
    }

    if(!isTodayValue){
      addLog(moment().toISOString(),"false")
      console.log(`dodanie dzisiaj`)
    } 
     
  }
  else{
    console.log(`nie ma nic w logach dodaje dzisiaj`)
    addLog(moment().toISOString(),"false")
  }  
}







/// Funkcja która sprawdza czy isnieje log i pobiera go jeśli nie to zwraca wartość

const checkItemDone = () => {
  listOfCheckTask = JSON.parse(window.localStorage.getItem("listOfCheckTask"));
  let dayLogsWork = JSON.parse(window.localStorage.getItem("dayLogs"));
    let result = listOfCheckTask.find(({done}) => done === "false");
      if(result){       
        let elementToChange = dayLogsWork[dayLogsWork.length - 1]
        console.log("niektóre są false") 
        elementToChange.isDone = "false"
        window.localStorage.setItem("dayLogs", JSON.stringify(dayLogsWork))
      }
      else {
        let elementToChange = dayLogsWork[dayLogsWork.length - 1]
        elementToChange.isDone = "true"
        window.localStorage.setItem("dayLogs", JSON.stringify(dayLogsWork))
      }      
}





// list.sort((a, b) => (a.color > b.color) ? 1 : -1)
  ////////////////////////////////////
  return (
    <MainWrapper>   
      {/* <button onClick={()=>isLastLogToday()}>Is Last like today</button>
      <button onClick={()=>sortLogItems()}>sort</button> */}
     
            <MainTitle>JedeStym</MainTitle>
      <div className={classes.root}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <h3>Twój cel</h3>
                <GoalForm />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                {active ? <h3>Zostało {daysLeft} dni</h3> : ``}
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <h3>Co muszę robić codziennie?</h3>
                <CheckboxListSecondary CheckItems={newChecked} checkItemDone={checkItemDone} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <h3>Dlaczego chcesz to zrobić?</h3>
                <ListOfResons />
              </Paper>
            </Grid>
            {/* <Grid item xs>
           <Paper xs={1} className={classes.paper}><h3>Zostało 3 dni do końca okresu 2 tygodniowego</h3></Paper>
        </Grid> */}
          </Grid>
          {!active ? (
            <StartButton>
              <Fab
                onClick={startChallenge}
                variant="extended"
                aria-label="like"
                className={classes.fab}
              >
                <NavigationIcon className={classes.extendedIcon} />
                Rozpocznij 90 dniowe wyzwanie
              </Fab>
            </StartButton>
          ) : (
              ``
            )}   <MenuPanel />
        </Container>
      </div>

      
    </MainWrapper>
  );
}
