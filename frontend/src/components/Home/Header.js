import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMeteor, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

import '../../home.css';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';

import { useAuth } from '../../context/AuthContext';
import { useAsync } from '../../utils/useAsync';

export default function Header() {
  const classes = useStyles();
  const { execute } = useAsync();
  const { user, logout, logoutAll } = useAuth();

  const onLogout = async () => {
    await execute(logout());
  };

  const onLogoutAll = async () => {
    await execute(logoutAll());
  };

  return (
    <AppBar className={classes.appBar}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <Container maxWidth="md" className={classes.container}>
          {/* <Container maxWidth="sm" className={classes.root}> */}
          <Link to="/" className={classes.homeLink}>
            <Box className={classes.leftSection}>
              {/* <Box>
                <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                  <image
                    href="https://svgur.com/i/Pru.svg"
                    // href="https://svgur.com/i/Prj.svg"
                    width="32"
                    height="32"
                  />
                </svg>
              </Box> */}
              {/* <FontAwesomeIcon icon={faMeteor} className={classes.icon} /> */}
              {/* <SvgIcon classes={{ root: classes.icon }}> */}
              {/* <path d="M16.7855,17.97432a4.7287,4.7287,0,0,1-1.61437.34575,1.75537,1.75537,0,0,1-1.92505-1.97215v-6.226h4.01646V7.0946H13.26117V2H10.331a.15657.15657,0,0,0-.14333.1493A6.11958,6.11958,0,0,1,6.25252,7.5386V10.122H8.27671v6.53565c0,2.23667,1.65047,5.41529,6.00756,5.34112a5.33685,5.33685,0,0,0,3.46321-1.17141l-.962-2.853" /> */}
              {/* <path
                  fill="#6563ff"
                  d="M16.7855,17.97432a4.7287,4.7287,0,0,1-1.61437.34575,1.75537,1.75537,0,0,1-1.92505-1.97215V11h4.01646V7.0946H13.26117V2H10.331a.15657.15657,0,0,0-.14333.1493A6.11958,6.11958,0,0,1,6.25252,7.5386V11.122H8.27671v5.53565c0,2.23667,1.65047,5.41529,6.00756,5.34112a5.33685,5.33685,0,0,0,3.46321-1.17141l-.962-2.853"
                  data-name="Brand Logos"
                /> */}
              {/* <path
                  d="M80.3,82c-0.3,0-0.6,0-0.9-0.1l-16.7-4.5l-0.3,0.1c-4,1.6-8.2,2.4-12.5,2.4c-4.3,0-8.5-0.8-12.5-2.4   l-0.3-0.1l-16.7,4.5C20.3,82,20,82,19.7,82l0,0c-1,0-1.9-0.5-2.5-1.3c-0.6-0.8-0.8-1.8-0.5-2.8l4.3-16l-0.2-0.3   c-1.8-4-2.8-8.2-2.8-12.6c0-17.1,14.4-31,32-31c17.6,0,32,13.9,32,31c0,4.4-0.9,8.6-2.8,12.6l-0.2,0.3l4.3,16c0.3,1,0.1,2-0.5,2.8   C82.2,81.5,81.3,82,80.3,82z M50,41.2c-6.1,0-11,4.8-11,10.8c0,5.9,4.9,10.8,11,10.8S61,57.9,61,52C61,46.1,56.1,41.2,50,41.2z"
                  fill="#8989E5"
                /> */}
              {/* </SvgIcon> */}
              {/* <Box className={classes.icon}>
                
                <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                  <image
                    href="https://www.flaticon.com/svg/static/icons/svg/84/84553.svg"
                    height="24"
                    width="24"
                  />
                </svg>
              </Box> */}
              {/* <Box style={{ color: 'white', marginRight: '10px' }}>
                <img
                  src="https://i.imgur.com/FTxcwKO.png"
                  width="32"
                  height="32"
                />
              </Box> */}

              <Typography variant="h6" className={classes.title}>
                typee
              </Typography>
            </Box>
          </Link>

          <Box className={classes.rightSection}>
            <Link to="/sign-in" className={classes.link}>
              Sign In
            </Link>
            <Link to="/sign-up" className={classes.link}>
              Sign Up
            </Link>
            <Link to="/about" className={classes.link}>
              About
            </Link>
            {/* <Button component={Link} to="/sign-in" color="inherit">
            Sign In
          </Button>
          <Button component={Link} to="/sign-up" color="inherit">
            Sign Up
          </Button>
          <Button component={Link} to="/password-reset" color="inherit">
            Reset
          </Button>
          <Button component={Link} to="/password-reset-new" color="inherit">
            New
          </Button> */}
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'static',
    backgroundColor: theme.palette.appBarBackground,
    // backgroundColor: theme.palette.purpleAlt,
    // backgroundColor: theme.palette.purpleAlt2,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  homeLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
  },
  rightSection: {
    display: 'flex',
  },
  title: {
    fontFamily: 'Montserrat',
    letterSpacing: '0.1rem',
    fontWeight: 700,
  },
  icon: {
    marginRight: '10px',
    color: theme.palette.purple,
  },
  link: {
    color: theme.palette.headerPrimary,
    padding: '10px 20px',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
    fontSize: '16px',
    lineHeight: '140%',
    fontWeight: 600,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));
