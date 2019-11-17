import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person'; 
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import LayersClearIcon from '@material-ui/icons/LayersClear';
import styled from "styled-components";
import { height } from '@material-ui/system';
const MenuEventLisinerRight = styled.div`
position:absolute;
right:0;
top:0;
width:200px;
height:100%;
`
const MenuEventLisinerLeft = styled.div`
position:absolute;
left:0;
top:0;
width:200px;
height:100%;
`


const useStyles = makeStyles({
  root:{
    background:"black"
  },
  list: {
    width: 250,
    color: "#ffffffc4",
    background: '#202334',
    height: '100%'
    },
  fullList: {    
    width: 'auto', 
    background: 'black' 
  },
 
});

export default function MenuPanel() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const resetAllDataInLocalStorage = () =>{
    window.localStorage.clear();
  
  }
  

  const sideList = side => (
    <div
    
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List >
        {['Twój profil'].map((text, index) => (
         
     <ListItem button key={text}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
       
        <ListItem button>
            <ListItemIcon><GolfCourseIcon/></ListItemIcon>
            <ListItemText primary="Wyzwanie" />
          </ListItem>
          <ListItem button onClick={resetAllDataInLocalStorage}>
            <ListItemIcon><LayersClearIcon/></ListItemIcon>
            <ListItemText primary="Resetuj wszystkie dane" />
          </ListItem>
          
      </List>
    </div>
  );

  const fullList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
    <div>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
      <Drawer anchor="top" open={state.top} onClose={toggleDrawer('top', false)}>
        {fullList('top')}
      </Drawer>
      <Drawer anchor="bottom" open={state.bottom} onClose={toggleDrawer('bottom', false)}>
        {fullList('bottom')}
      </Drawer>
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
        {sideList('right')}
      </Drawer>
    
    </div>
      <MenuEventLisinerRight onClick={toggleDrawer('right', true)}/>
      <MenuEventLisinerLeft onClick={toggleDrawer('left', true)}/>
      </>
  );
}