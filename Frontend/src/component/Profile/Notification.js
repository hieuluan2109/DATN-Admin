import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 300,
    height: "100%",
    marginLeft: "5%",
    background: "#FFFF",
    overflow: 'auto',
    position: 'relative',
    height: '70vh',
    behavior: 'smooth',
    block: 'start',
    overflow: 'auto'
  },
  inline: {
    display: 'inline',
  },
  formInfo: {
    marginTop: "10%",
    marginRight: "6%",
    marginLeft: "6%",
    height: "70vh",
    background: "white",
  },
}));

export default function AlignItemsList() {
  const classes = useStyles();

  return (
    // <div styles={{ height: '500px', overflowY: 'scroll' }} >
    <form>
    <Paper elevation={3} className={classes.formInfo} >
      <List className={classes.root}>
        <ListItem alignItems="flex-start" >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
      </Paper>
      </form>
    // </div>
  );
}