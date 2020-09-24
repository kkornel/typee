import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

export default function DevLog(props) {
  const classes = useStyles();

  React.useEffect(() => {
    document.title = 'About | dev log';
  }, []);

  return (
    <Box className={classes.body}>
      <Container maxWidth="lg" className={classes.container}>
        <Box className={classes.box}>
          <p>typee is chat application created only for learning purposes. </p>{' '}
          <br />
          <p>
            I wanted to expand my knowledge of JavaScript programming, by
            creating more advanced project than before. I had a lot of ideas,
            from video streaming service, through Survey App, to Medical
            Appointment organizer, but they all where very similar to my other
            projects. At this point I have realized that I have never worked
            with Web Sockets, so the choice so now simple - create Real Time
            Chat Application.
          </p>
          <br />
          <p>
            As my goal I've decided to recreate one of the most popular chat
            application in the world - Discord. The apperace of typee is
            congenial to Discord's, because I very like the design of that
            service. <br />
            Present version of the typee has only the most basic
            functionalities, which alow to communicate with others in real time.
          </p>
          <br />
          <p>
            typee offers: <br />- creating account with email and password
            <br /> - joining in using personal Google Account <br />- setting up
            unique username and avatar <br />- creating, managing, deleteing
            rooms
            <br /> - sending messages, emotes and gifs to rooms
            <br />
          </p>
          Things you can expect in the nearest updates: - adding friends, -
          sending private messages, - sharing files in room, creating private
          rooms and generate invitation link Things planned to be done some day:
          - allow users to create channel bots that will listen for specific
          commands - give user room permissions, e.g. moderator By crating this
          project I've learnt a lot. There is a list of technologies that were
          and are used in this application Frontend is made in React framework.
          As I main design library is Material UI. At the begginig i was using
          Redux library to store some application context, but after a while I
          noticed it's downsides and switch to the React Context system. As a
          backend, there is a NodeJS server running an Express libray. For the
          websockets I chose socketio.
        </Box>
      </Container>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  body: {
    background: 'white',
    overflowX: 'hidden',
    height: 'calc(100vh - 48px)',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'stretch',
  },
  box: {
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
}));
