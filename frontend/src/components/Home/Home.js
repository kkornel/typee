import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import RoundedLinkButton from '../ui/buttons/RoundedLinkButton';

import '../../css/home.css';

export default function Home() {
  const classes = useStyles();

  const typedSpan = React.useRef(null);
  const cursorSpan = React.useRef(null);

  const title = 'typee';
  const content = ' your place to ';

  const textArray = ['chat...', 'talk...', 'TYPE!'];
  const typingDelay = 200;
  const erasingDelay = 100;
  const newTextDelay = 2000;

  let txtArrIdx = 0;
  let charIdx = 0;

  let timerId1;
  let timerId2;

  // TODO: Extract to be reusable
  function type() {
    if (charIdx < textArray[txtArrIdx].length) {
      if (!cursorSpan.current.classList.contains('typing')) {
        cursorSpan.current.classList.add('typing');
      }
      typedSpan.current.textContent += textArray[txtArrIdx].charAt(charIdx);
      charIdx++;
      timerId1 = setTimeout(type, typingDelay);
    } else {
      cursorSpan.current.classList.remove('typing');
      timerId2 = setTimeout(erase, newTextDelay);
    }
  }

  // TODO: Extract to be reusable
  function erase() {
    if (charIdx > 0) {
      if (!cursorSpan.current.classList.contains('typing')) {
        cursorSpan.current.classList.add('typing');
      }
      typedSpan.current.textContent = textArray[txtArrIdx].substring(
        0,
        charIdx - 1
      );
      charIdx--;
      timerId2 = setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.current.classList.remove('typing');
      txtArrIdx++;
      if (txtArrIdx >= textArray.length) {
        txtArrIdx = 0;
      }
      timerId1 = setTimeout(type, typingDelay + 1100);
    }
  }

  React.useEffect(() => {
    document.title = title;
    const id = setTimeout(type, newTextDelay + 250);
    return () => {
      clearTimeout(id);
    };
  }, [type]);

  React.useEffect(() => {
    return () => {
      clearTimeout(timerId1);
      clearTimeout(timerId2);
    };
  }, [timerId1, timerId2]);

  return (
    <Box className="container">
      {/* Solution with  position: fixed for blue stripe*/}
      {/* <Box className={classes.banner}>
        <Box className="blue-stripe"></Box>

        <Box className={classes.imageBox}>
          <img
            className={classes.image}
            width="650"
            height="400"
            src="https://i.imgur.com/g7HnVSh.gif"
            alt="It is supposed to show very important image, but it doesn't :("
          />
        </Box>
      </Box> */}

      {/* Solution with flex boxes */}
      <Box className={classes.boxRow}>
        <Box className={classes.boxColumn}>
          <Box className={classes.boxLighterBlue}></Box>
          <Box className={classes.boxDarkerBlue}></Box>
        </Box>
        <Box className={classes.imageBox}>
          <img
            className={classes.image}
            width="650"
            height="400"
            src="https://i.imgur.com/g7HnVSh.gif"
            alt="It is supposed to show very important gif, but it doesn't :("
          />
        </Box>
        <Box className={classes.boxColumn}>
          <Box className={classes.boxLighterBlue}></Box>
          <Box className={classes.boxDarkerBlue}></Box>
        </Box>
      </Box>

      <Box component="p">
        <Box component="span" className="typed-title">
          {title}
        </Box>
        <Box component="span" className="typed-content">
          {content}
        </Box>
        <Box component="span" className="typed-text" ref={typedSpan}></Box>
        <Box component="span" className="cursor" ref={cursorSpan}>
          &nbsp;
        </Box>
      </Box>

      <Box className={classes.buttons}>
        <RoundedLinkButton to="/sign-in" cls={classes.buttonDark}>
          Log in
        </RoundedLinkButton>
        <RoundedLinkButton to="/sign-up" cls={classes.buttonWhite}>
          Join us!
        </RoundedLinkButton>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  boxRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  boxColumn: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  boxLighterBlue: {
    background: theme.palette.blueLight,
    height: '324px',
  },
  boxDarkerBlue: {
    background: theme.palette.blueDark,
    height: '76px',
  },
  buttons: {
    marginTop: '148px',
    display: 'flex',
    marginBottom: '100px',
  },
  buttonWhite: {
    background: 'white',
    color: theme.palette.appBarBackground,
    '&:hover': {
      color: theme.palette.purple,
      boxShadow: `0 2px 15px ${theme.palette.purple}`,
    },
  },
  buttonDark: {
    marginRight: '64px',
    background: theme.palette.appBarBackground,
    color: 'white',
    '&:hover': {
      background: theme.palette.backgroundPrimary,
      boxShadow: '0 2px 15px white',
    },
  },
  banner: {
    background: theme.palette.blueLight,
    width: '100%',
  },
  image: {
    // For position fixed solution
    // position: 'absolute',
    // marginLeft: 'auto',

    // For flex boxes solution
    display: 'flex',
    maxWidth: '100%',
    minWidth: '455px',
  },
  imageBox: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '400px',
    zIndex: 2,
  },
}));
