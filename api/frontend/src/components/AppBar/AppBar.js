import React ,{Suspense} from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Drawer from '@material-ui/core/Drawer';
import './AppBar.css'
import ListItemText from '@material-ui/core/ListItemText';
import Skeleton from '@material-ui/lab/Skeleton';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import HomeIcon from '@material-ui/icons/Home';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import Tooltip from '@material-ui/core/Tooltip';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { LinearProgress } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {isMobile} from 'react-device-detect';
import './AppBar.css'
import AppsIcon from '@material-ui/icons/Apps';
import EventIcon from '@material-ui/icons/Event';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import PollIcon from '@material-ui/icons/Poll';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import { useSelector } from 'react-redux'
import { NavDropdown } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { Row, Col } from 'react-bootstrap';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import { renderRoutes } from 'react-router-config';
import Link from '@material-ui/core/Link';
import Search from './Search'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import FontSizeChanger from 'react-font-size-changer';

  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      marginTop: "60px",
      elevation: 0,
      borderRight: 'none'
    },
    drawerClose: {
      marginTop: "60px",
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
      borderRight: 'none'
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      paddingTop: theme.spacing(0),
      paddingLeft: theme.spacing(3),
    },
    contentShift: {
      marginLeft: 0,
    },
    itemActiveItem: {
      color: '#4fc3f7',
    },
  }));


export default function MiniDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    function loginNav() {
      history.push("/account/login");
    }
    const [Avataropen, AvatarsetOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
      AvatarsetOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      AvatarsetOpen(false);
    };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        AvatarsetOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(Avataropen);
    React.useEffect(() => {
      if (prevOpen.current === true && Avataropen === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = Avataropen;
    }, [Avataropen]);
  
    const loc = props.location.pathname;
    const categories = [
      {
        id: 'Apps',
        children: [
          { id: 'Home', icon: <HomeIcon /> ,to: '/', },
          { id: 'Blog', icon: <AppsIcon /> ,to: '/blog', },
          { id: 'Calender', icon: <EventIcon /> ,to: '/calender', },
        ],
      },
      {
        id: 'Videos',
        children: [
          { id: 'Library', icon: <VideoLibraryIcon /> ,to: '/no', },
          { id: 'Trending Videos', icon: <WhatshotIcon /> ,to: '/trending', },
          { id: 'Recent Videos', icon: <MusicVideoIcon /> ,to: '/recent', },
          { id: 'Popular Saints', icon: <PollIcon /> ,to: '/no', },
          { id: 'Mother Mary', icon: <ViewQuiltIcon /> ,to: '/no', },
        ],
      },
    ];
    function handleNav(){
      console.log('clicked')
      history.push("/settings");
    }
    let history = useHistory();

    const store = useSelector(state => state)
    const { route } = props;
    console.log(props)

    const StyledMenuItem = withStyles((theme) => ({
      root: {
        '&:focus': {
          backgroundColor: theme.palette.primary.main,
          '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: theme.palette.common.white,
          },
        },
      },
    }))(MenuItem);
    let cusCon;

    if(store.auth.isAuthenticated){
      cusCon = (
        <div style={{ width: '-webkit-fill-available'  }}>
                <div style={{ cursor: 'pointer' }}>
                  {store.youtube.isLoading?
                  <Skeleton variant="circle" width={35} height={35}  animation={false} style={{ backgroundColor: 'rgba(0, 0, 0, 0.14)' , float: 'right'}}/>
                  :
                  <Avatar 
                
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                style={{ height: '35px',  width:  '35px' , float: "right", marginRight: '20px' }}>{store.auth.user?store.auth.user.first_name.slice(0,1).toUpperCase():""}</Avatar>
                  }
              <Popper open={Avataropen} anchorEl={anchorRef.current} role={undefined}  disablePortal style={{ marginRight: '20px' }}>
                {({  placement }) => (
                  <Grow
                    
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <Card style={{ background: '#ffffff',  boxShadow: 'none', width: '280px' }}>
                            <CardContent style={{  }}>
                              <Row>
                                <Col xs={3}>
                                  <Avatar style={{ height: '40px',  width:  '40px'  }}>{store.auth.user?store.auth.user.first_name.slice(0,1).toUpperCase():""}</Avatar>
                                </Col>
                                <Col xs={9}>
                                  <Typography style={{  alignContent: 'right', justifyContent: 'right', display: 'flex'  }} variant="h6" noWrap>
                                      {store.auth.user?store.auth.user.first_name+store.auth.user.last_name:"UserName"}
                                  </Typography> 
                                  <Typography style={{ color: '#333333',  fontSize: '11px' , alignContent: 'right', justifyContent: 'right', display: 'flex'  }} variant="h6" noWrap>
                                      {store.auth.user?store.auth.user.email:"Email"}
                                  </Typography> 
                                </Col>
                              </Row>
                            </CardContent>
                            <Divider />
                            <StyledMenuItem  onClick={handleNav}>
                              <ListItemIcon>
                                <SettingsIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary="Account Settings" />
                            </StyledMenuItem>
                          </Card>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
            <div style={{ cursor: 'pointer' }}>
                  {store.youtube.isLoading?
                  <Skeleton variant="circle" width={35} height={35}  animation={false} style={{ backgroundColor: 'rgba(0, 0, 0, 0.14)' , float: 'right', marginRight: '30px'}}/>
                  :
                    <NotificationsIcon style={{ color: '#bdbdbd', float: 'right', width: '25px', height: '36px', marginRight: '30px', textAlign: 'justify'}}/> 
                  }
              <Popper open={Avataropen} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{ marginRight: '20px' }}>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <Card style={{ background: '#ffffff',  boxShadow: 'none', width: '280px' }}>
                            <CardContent style={{  }}>
                              <Row>
                                <Col xs={3}>
                                  <Avatar style={{ height: '40px',  width:  '40px'  }}>{store.auth.user?store.auth.user.first_name.slice(0,1).toUpperCase():""}</Avatar>
                                </Col>
                                <Col xs={9}>
                                  <Typography style={{  alignContent: 'right', justifyContent: 'right', display: 'flex'  }} variant="h6" noWrap>
                                      {store.auth.user?store.auth.user.first_name+store.auth.user.last_name:"UserName"}
                                  </Typography> 
                                  <Typography style={{ color: '#333333',  fontSize: '11px' , alignContent: 'right', justifyContent: 'right', display: 'flex'  }} variant="h6" noWrap>
                                      {store.auth.user?store.auth.user.email:"Email"}
                                  </Typography> 
                                </Col>
                              </Row>
                            </CardContent>
                            <Divider />
                            <StyledMenuItem  onClick={handleNav}>
                              <ListItemIcon>
                                <SettingsIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary="Account Settings" />
                            </StyledMenuItem>
                          </Card>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
      </div>
      )
    }
    else{
        cusCon = (
          <Button color="primary" variant="outlined"  onClick ={loginNav}>Signin</Button>
        )
    }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
            <CssBaseline />
            <AppBar
              position="fixed"
              style={{ borderBottomRightRadius: '0' }}
              elevation={0}
            >
                 <Toolbar style={{ backgroundColor: '#ffffff'}} >
                    <IconButton
                      color="#606060"
                      aria-label="open drawer"
                      anchor='left'
                      onClick={open?handleDrawerClose:handleDrawerOpen}>
                      <MenuIcon />
                      
                    </IconButton>
                    <img src="http://punithargal.org/images/logo-alt-1.png" style={{ height: '30px', width: '30px' }}/>
                      <Search />
                  {cusCon}
                  </Toolbar>
            </AppBar>
          <Drawer
              variant="permanent"
              elevation={0}
              className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              })}
              classes={{
                paper: clsx({
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
                }),
              }}
            > 
          {categories.map(({ id, children }) => (
            <React.Fragment key={id}>
              <ListItem className={classes.categoryHeader} >
                <ListItemText
                  classes={{
                    primary: classes.categoryHeaderPrimary,
                  }}
                >
                  {id}
                </ListItemText>
              </ListItem>
              {children.map(({ id: childId, to , icon, active }) => (
                <Link href={to} style={{ textDecoration: 'none', color: 'currentColor' }} >
                <ListItem
                  key={childId}
                  button
                  style={{ backgroundColor: loc===to? '#eeeeee' :"" }}
                >
                  <ListItemIcon className={classes.itemIcon}  style={{ color: loc===to? '#3f8f88' :"" }}>{icon}</ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary,
                    }}
                  >
                    {childId}
                  </ListItemText>
                </ListItem>
                </Link>
              ))}
  
              <Divider className={classes.divider} />
            </React.Fragment>
          ))}
            </Drawer>
                <main className={clsx(classes.content, {[classes.contentShift]: open})}  style={{ backgroundColor: "#fafafa", minHeight: '-webkit-fill-available' }} >
                      <div className={classes.toolbar} />
                      <Suspense fallback={<LinearProgress />} >
                        {renderRoutes(route.routes, {"DrawerStateOpen":open} )}
                      </Suspense> 
                </main>               
        </React.Fragment>
        
      ))}
    </div>
  );
}
