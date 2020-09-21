import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import '../../home.css';

export default function BodyContainer(props) {
  const classes = useStyles();

  const typedTextSpan = React.useRef(null);
  const cursorSpan = React.useRef(null);
  console.log('ss', cursorSpan);

  const textArray = ['talk...', 'chat...', 'TYPE!'];
  const typingDelay = 200;
  const erasingDelay = 100;
  const newTextDelay = 2000; // Delay between current and next text
  let textArrayIndex = 0;
  let charIndex = 0;

  let lel1;
  let lel2;

  React.useEffect(() => {
    const id = setTimeout(type, newTextDelay + 250);
    return () => {
      clearTimeout(id);
      clearTimeout(lel1);
      clearTimeout(lel2);
    };
  }, []);

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if (!cursorSpan.current.classList.contains('typing')) {
        cursorSpan.current.classList.add('typing');
      }
      typedTextSpan.current.textContent += textArray[textArrayIndex].charAt(
        charIndex
      );
      charIndex++;
      lel1 = setTimeout(type, typingDelay);
    } else {
      cursorSpan.current.classList.remove('typing');
      lel2 = setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if (!cursorSpan.current.classList.contains('typing')) {
        cursorSpan.current.classList.add('typing');
      }
      typedTextSpan.current.textContent = textArray[textArrayIndex].substring(
        0,
        charIndex - 1
      );
      charIndex--;
      lel2 = setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.current.classList.remove('typing');
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) {
        textArrayIndex = 0;
      }
      lel1 = setTimeout(type, typingDelay + 1100);
    }
  }

  return (
    <Box>
      <div className="container">
        <Box className={classes.mainBox4}>
          <div className="c">sadas</div>

          <Box className={classes.mainBox2}>
            <img
              className={classes.mainBox3}
              width="650"
              height="400"
              src="https://cdn.dribbble.com/users/1579322/screenshots/6587273/blue_boy_typing_nothought.gif"
            />
          </Box>
        </Box>

        <p>
          <span className="typed-title">typee</span>{' '}
          <span className="typed-placeholder">your place to </span>
          <span className="typed-text" ref={typedTextSpan}></span>
          <span className="cursor" ref={cursorSpan}>
            &nbsp;
          </span>
        </p>
      </div>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  mainBox4: {
    background: '#d9e8ff',
    width: '100%',
    // marginLeft: 'auto',
  },
  mainBox3: {
    // position: 'absolute',
    // marginLeft: 'auto',
  },
  mainBox2: {
    position: 'relative',
    width: '100%',
    height: '400px',
    // background: '#a4bcda',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  container: {
    paddingTop: '32px',
  },
  mainBox: {
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 16px 24px 16px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px 0 #000',
    color: theme.palette.textMuted,
    background: theme.palette.backgroundPrimary,
  },
}));
