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
import ResetDataModal from './ResetDataModal'
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "gatsby"
import CustomLinkWrapper from "./CustomLinks/CustomLinkWrapper"
const MenuEventLisinerRight = styled.div`
@media only screen and (min-width: 600px) {
position:absolute;
right:0;
top:0;
width:100px;
height:100%;}
`
const MobileMenuIcon = styled.div`
@media only screen and (max-width: 599px) {
  position:fixed;
  bottom:30px;
  left:30px;
  z-index:999;
  display:block;
  background:#39bbb3;
  padding:5px 10px;
}
display:none;
`



const MenuEventLisinerLeft = styled.div`

@media only screen and (min-width: 600px) {
position:absolute;
left:0;
top:0;
width:100px;
height:100%;}
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
  const [openModal, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };



  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const resetAllDataInLocalStorage = () =>{
    setOpen(true);
  }
  
  const doReset = () =>{
    localStorage.clear();
    setOpen(false);
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
      <Link to="/"  activeClassName="active__menu__item" ><ListItem button>
            <ListItemIcon><GolfCourseIcon/></ListItemIcon>
          <ListItemText primary="Wyzwanie" />
          </ListItem></Link>
          {/* <Link to="/notes"   activeClassName="active__menu__item" > <ListItem button>
            <ListItemIcon><GolfCourseIcon/></ListItemIcon>
       <ListItemText primary="Notes" />
          </ListItem></Link> */}
          <Link to="/challenges"   activeClassName="active__menu__item" > <ListItem button>
            <ListItemIcon><GolfCourseIcon/></ListItemIcon>
       <ListItemText primary="Chalanges Info" />
          </ListItem></Link>
          
          <Link to="/aboutapp"   activeClassName="active__menu__item" >  <ListItem button>
            <ListItemIcon><GolfCourseIcon/></ListItemIcon>
          <ListItemText primary="O aplikacji" />
          </ListItem> </Link>       
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
      <CustomLinkWrapper/>
      <MenuEventLisinerRight onClick={toggleDrawer('right', true)}/>
      <MenuEventLisinerLeft onClick={toggleDrawer('left', true)}/>
      <ResetDataModal clearData={doReset} open={openModal} handleClose={handleClose}/>
      <MobileMenuIcon><span>< MenuIcon onClick={toggleDrawer('right', true)} /></span></MobileMenuIcon>
      </>
  );
}