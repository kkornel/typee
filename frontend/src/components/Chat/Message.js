import React from 'react';

import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

import ArrowTooltip from './ArrowTooltip';
import UserInfoDialog from './UserInfoDialog';

export default function Message({ message }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const gifRegex = /((<gif>)(.*)(<\/gif>))/;
  const timeFormat = 'h:mm A';
  const dateFormat = 'DD/MM/YY | h:mm A';
  const longDateFormat = 'dddd, MMMM D, YYYY h:mm A';

  const processMsg = (text) => {
    const matches = text.match(gifRegex);
    if (matches) {
      return <img src={matches[3]} style={{ marginTop: '4px' }} />;
    }
    return text;
  };

  const processDate = (createdAt) => {
    const date = moment(createdAt);
    const diffHours = moment().diff(date, 'hours');
    if (diffHours < 24) {
      return `Today at ${date.format(timeFormat)}`;
    } else if (diffHours < 48 && diffHours >= 24) {
      return `Yesterday at ${date.format(timeFormat)}`;
    }
    return date.format(dateFormat);
  };

  const onUserClick = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <Box className={classes.messagesListItem}>
      <IconButton
        className={classes.messagesListUserIconButton}
        onClick={onUserClick}
      >
        {message.author.avatarURL ? (
          <Avatar
            className={classes.messagesListItemAvatar}
            src={message.author.avatarURL}
          />
        ) : (
          <Avatar className={classes.messagesListItemAvatar}>
            {message.author.username[0]}
            {message.author.username[1]}
          </Avatar>
        )}
      </IconButton>
      <Box>
        <Box className={classes.messagesListItemInfo}>
          <Box
            className={classes.messagesListItemUsername}
            onClick={onUserClick}
          >
            {message.author.username}
          </Box>
          <ArrowTooltip
            title={moment(message.createdAt).format(longDateFormat)}
            small="true"
            placement="top"
          >
            <Box className={classes.messagesListItemDate}>
              {processDate(message.createdAt)}
            </Box>
          </ArrowTooltip>
        </Box>
        <Box className={classes.flexDivider}></Box>
        <Box className={classes.messagesListItemContent}>
          {processMsg(message.text)}
        </Box>
      </Box>
      <UserInfoDialog
        user={message.author}
        handleDialogClose={handleDialogClose}
        open={open}
      />
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  flexDivider: {
    width: '100%',
  },
  messagesListItem: {
    position: 'relative',
    display: 'flex',
    marginTop: '16px',
    paddingTop: '2px',
    paddingRight: '48px',
    paddingBottom: '2px',
    minHeight: '44px',
    minWidth: '0px',
    maxWidth: '100%',
    wordWrap: 'break-word',
    background: theme.palette.backgroundPrimary,
    '&:hover': {
      background: theme.palette.itemOnHover,
    },
  },
  messagesListItemAvatar: {
    marginRight: '16px',
    marginLeft: '16px',
  },
  messagesListUserIconButton: {
    padding: 0,
    width: '40px',
    height: '40px',
    marginRight: '16px',
    marginLeft: '16px',
    marginTop: '4px',
  },
  messagesListItemInfo: {
    display: 'flex',
    width: '100%',
    lineHeight: '22px',
    minHeight: '22px',
    alignItems: 'baseline',
    whiteSpace: 'break-spaces',
  },
  messagesListItemUsername: {
    color: theme.palette.headerPrimary,
    marginRight: '4px',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '22px',
    verticalAlign: 'baseline',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  messagesListItemDate: {
    marginLeft: '4px',
    height: '20px',
    lineHeight: '22px',
    fontSize: '12px',
    fontWeight: 500,
    verticalAlign: 'baseline',
    fontFamily: 'Roboto',
    color: theme.palette.textMuted,
  },
  messagesListItemContent: {
    display: 'table',
    tableLayout: 'fixed',
    width: '100%',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '22px',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    whiteSpace: 'break-spaces',
    color: theme.palette.textNormal,
  },
}));
