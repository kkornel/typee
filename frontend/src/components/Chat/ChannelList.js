import React from 'react';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

// TODO: unique keys
export default function ({ channels, handleAddClick }) {
  const classes = useStyles();
  const theme = mainTheme();

  const onAddClick = () => {
    handleAddClick();
  };

  console.log('&&& ChannelList RE-RENDER');

  return (
    <Box className={classNames(classes.channelsList, theme.backgroundTertiary)}>
      {['Channel 1', 'Channel 2', 'Channel 3'].map((channelName) => {
        return (
          <Box className={classes.channel} key={channelName}>
            <Tooltip title={channelName}>
              <IconButton
                aria-label={channelName}
                className={classes.channelIcon}
              >
                <Avatar className={classes.channelIconAvatar}>
                  {channelName[0]}
                  {channelName[channelName.length - 1]}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        );
      })}
      <Divider className={classes.divider} />
      <Box className={classes.channelAddBox}>
        <Tooltip title="Add channel">
          <IconButton
            aria-label="add"
            className={classes.channelAddIcon}
            onClick={onAddClick}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

const mainTheme = makeStyles((theme) => ({
  backgroundTertiary: {
    backgroundColor: '#202225',
  },
}));

const useStyles = makeStyles((theme) => ({
  divider: {
    background: 'hsla(0,0%,100%,0.06)',
    height: '4px',
  },
  channelsList: {
    // background: 'green',
    // background: '#202225',

    maxHeight: 'calc(100vh - 64px) !important',
    overflowX: 'hidden',
    height: '100%',
    // width: '60px',
    // overflowY: 'scroll',
  },
  channel: {},
  channelIcon: {
    // width: '48px',
    // height: '48px',
    // margin: '3px 3px 3px 3px',
    // background: 'white',
    // background: '#36393f',
    padding: '8px',
  },
  channelIconAvatar: {
    width: '48px',
    height: '48px',
    color: '#dcddde',
    backgroundColor: '#36393f',
    // margin: '3px 3px 3px 3px',
    '&:hover': {
      backgroundColor: '#7289da',
      color: '#fff',
    },
  },
  channelAddBox: {
    padding: '8px',
  },
  channelAddIcon: {
    width: '48px',
    height: '48px',
    // margin: '3px 3px 3px 3px',
    // background: 'white',
    background: '#36393f',
    color: '#43b581',
    '&:hover': {
      background: '#43b581',
      color: '#fff',
    },
    // padding: 0,
    // margin: 0,
  },
}));
