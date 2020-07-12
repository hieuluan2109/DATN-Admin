import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuItem from '@material-ui/core/MenuItem';
// import Search from './Search'
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import SettingsIcon from '@material-ui/icons/Settings';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import LayersIcon from '@material-ui/icons/Layers';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import BugReportIcon from '@material-ui/icons/BugReport';
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
  // NavLink,
  // useRouteMatch,
  // useParams
} from "react-router-dom";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    position:'relative',
    background:"#3f51b5",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    paddingRight:40,
    flexShrink: 0
  },
  drawerPaper: {
    background:"#ececec",
    width: drawerWidth
  },
  drawerHeader: {
    // display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  title:{
    paddingTop:10,
    paddingLeft:40,
    color:'black',
    fontWeight:'bold'
  },
  icons:{

    top:0,
    position:"absolute",
   left:'70%'
  },
  settingicon:{
    position:"relative",
    marginLeft:20,
  },
  Menu:{
    cursor:'pointer',
    display:'inline',
   
    fontSize:17,
    paddingLeft: '5%',
  },
  report:{
    position:"absolute",
    fontSize:17,
    alignItems:'center',
    left:"20%",
    top:'1%',
    color:'black',
    marginTop:5
  },
  iconMenu:{
    position:'absolute',
   marginTop:'-2px',
   marginLeft:-25
  }

}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

 

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
       <Link to="/profile">
      <MenuItem onClick={handleMenuClose}>
         Your Account
      </MenuItem>
      </Link>
      <MenuItem onClick={handleMenuClose}>Sign out</MenuItem>
      <MenuItem onClick={handleMenuClose}>Change password</MenuItem>
    </Menu>
  );
  return (
    <div className={classes.root}>
       
          <Typography className={classes.title} variant="h6" noWrap>
            Testing Project
          </Typography>
          {/* <div>
          <Search />
          </div> */}
            <IconButton className={classes.report} size="small">
                Report  <BugReportIcon />

            </IconButton>
           
          <div className={classes.grow} />
          <div className={classes.icons}>
            <IconButton aria-label="show 1 new mails" color="inherit">
              <Badge badgeContent={1} color="secondary">
                <MailIcon/>
              </Badge>
            </IconButton>
            <IconButton aria-label="show 1 new notifications" color="inherit">
              <Badge badgeContent={1} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton size="small"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
               <Avatar alt="Luân mập" src="/static/images/avatar/1.jpg" />Luân
               <KeyboardArrowDownIcon />
            </IconButton>
          
          <IconButton color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.hide)} 
            >
              <SettingsIcon />
          </IconButton>
          </div>
          <div className={classes.sectionMobile} />
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}>
       
         <ul>
                <li  className={classes.Menu}><Link to='/admin' style={{textDecoration:'none',color:'white'}}><HomeIcon className={classes.iconMenu}/>TRANG CHỦ</Link></li>
                <li  className={classes.Menu}> <Link to='/users' style={{textDecoration:'none',color:'white'}}> <PersonIcon className={classes.iconMenu}/>NGƯỜI DÙNG</Link></li>
                <li  className={classes.Menu}> <QuestionAnswerIcon className={classes.iconMenu}/>CÂU HỎI</li>
                <li  className={classes.Menu}> <LayersIcon className={classes.iconMenu}/>CHỦ ĐỀ</li>
                <li  className={classes.Menu}> <ImportContactsIcon className={classes.iconMenu}/>BÀI KIỂM TRA</li>
          </ul>
        {/* <Toolbar>
             
        </Toolbar> */}
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Người Dùng', 'Câu Hỏi', 'Chủ Đề', 'Bài Kiểm Tra'].map((text, index) => (
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
      </Drawer>
      {renderMenu}

    </div>
  );
}
