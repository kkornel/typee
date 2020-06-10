import React from 'react';
import { useForm } from 'react-hook-form';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Box,
  Button,
  Container,
  Icon,
  Typography,
} from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';

import {
  messageHandler,
  sendMessage,
  roomDataHandler,
} from '../utils/useSocket';

import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  chat: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    marginBottom: 40,
    flexGrow: 1,
    display: 'flex',
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  paperNoCenter: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  chat_sidebar: {
    height: '100vh',
    color: 'white',
    background: '#333744',
    width: '225px',
    overflowY: 'scroll',
    marginLeft: '100px',
  },
  lul: {
    display: 'flex',
    background: 'grey',
  },
  chat_main: {
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100vh',
    width: '100vh',
  },
  chat_messages: {
    flexGrow: '1',
    padding: '24px 24px 0 24px',
    overflowY: 'scroll',
  },
  compose: {
    display: 'flex',
    flexShrink: '0',
    // margin: '16px',
    padding: '24px',
  },
  compose_form: {
    display: 'flex',
    flexGrow: '1',
    border: '1px solid #eeeeee',
    padding: '8px 12px 8px 12px',
    borderRadius: '8px',
    background: '#C0C0C0',
    marginRight: '16px',
  },
  compose_input: {
    // border: '1px solid #eeeeee',
    width: '100%',
    // padding: '12px',
    margin: '0 16px 0 0',
    flexGrow: '1',
  },
  compose_button: {
    fontSize: '14px',
  },
  boxy: {
    display: 'inline-block',
  },
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
  message: {
    marginBottom: '16px',
  },
  message__name: {
    fontWeight: '600',
    fontSize: '14px',
    marginRight: '8px',
  },
  message__meta: {
    color: '#777',
    fontSize: '14px',
  },
  bubble: {
    border: '1px solid #000',
  },
}));

function Dashboard() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState(false);

  const { currentRoom } = useUser();
  const { user } = useAuth();

  const [roomData, setRoomData] = React.useState(null);

  React.useEffect(() => {
    messageHandler(onMessageReceived);
    roomDataHandler(onRoomData);
  }, []);

  const onRoomData = ({ users }) => {
    setRoomData(users);
  };

  const onMessageReceived = ({ text, username, createdAt, error }) => {
    setNewMessage(false);
    console.log(text, username, createdAt);
    messages.push({ text, username, createdAt });
    setMessages(messages);
    setNewMessage(true);
  };

  const onSubmit = ({ message }, event) => {
    sendMessage(message, currentRoom, user._id, submitCallback);
    console.log(event.target.elements.message);
    event.target.elements.message.value = '';
  };

  const submitCallback = (error) => {
    console.log(error);

    if (error) {
      return console.log(error);
    }

    console.log('Message delivered.');
  };

  return (
    <Box className={classes.chat}>
      <Grid container spacing={3}>
        <Grid item xs={2} className={classes.chat_sidebar}>
          <Box id="chat_sidebar">
            <Box>{currentRoom}</Box>
            <Box>{roomData && roomData.map((user) => user)}</Box>
          </Box>
        </Grid>
        <Grid item xs={8} className={classes.lul}>
          <Container id="chat_main" className={classes.chat_main}>
            <Box id="messages" className={classes.chat_messages}>
              {newMessage &&
                messages.map(({ text, username, createdAt }, index) => {
                  return (
                    <Box className={classes.bubble} key={index}>
                      <Avatar>KK</Avatar>
                      <div className={classes.message}>
                        <p>
                          <span className={classes.message__name}>
                            {username}
                          </span>
                          <span className={classes.message__meta}>
                            {createdAt}
                          </span>
                        </p>
                        <p>{text}</p>
                      </div>
                    </Box>
                  );
                })}
            </Box>
            <Box id="compose" className={classes.compose}>
              <form
                noValidate
                autoComplete="off"
                className={classes.compose_form}
                onSubmit={handleSubmit(onSubmit)}
                margin="dense"
              >
                <Input
                  autoFocus
                  required
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  id="message"
                  name="message"
                  label="message"
                  placeholder="Message"
                  // inputProps={{ 'aria-label': 'description' }}
                  inputRef={register}
                  className={classes.compose_input}
                />
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<Icon>send</Icon>}
                  className={classes.compose_button}
                >
                  Send
                </Button>
              </form>
            </Box>
          </Container>
        </Grid>
        {/* <Grid item xs={2} />
        <Grid item xs={12} />
        <Grid item xs={2}></Grid>
        <Grid item xs={8} />
        <Grid item xs={2}></Grid> */}
      </Grid>
    </Box>
  );
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="John Wick"></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: '10px' }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
              <ListItemText secondary="online" align="right"></ListItemText>
            </ListItem>
            <ListItem button key="Alice">
              <ListItemIcon>
                <Avatar
                  alt="Alice"
                  src="https://material-ui.com/static/images/avatar/3.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Alice">Alice</ListItemText>
            </ListItem>
            <ListItem button key="CindyBaker">
              <ListItemIcon>
                <Avatar
                  alt="Cindy Baker"
                  src="https://material-ui.com/static/images/avatar/2.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={9}>
          <List className={classes.messageArea}>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemIcon align="right">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://material-ui.com/static/images/avatar/1.jpg"
                    />
                  </ListItemIcon>
                  <ListItemText
                    align="right"
                    primary="Hey man, What's up ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="09:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="2">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="left"
                    primary="Hey, Iam Good! What about you ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="09:31"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          </List>
          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" aria-label="add">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
