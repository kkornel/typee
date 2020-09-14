import React from 'react';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

import ArrowTooltip from '../../ArrowTooltip';
import InteractiveDangerButton from '../../buttons/InteractiveDangerButton';

export default function ParticipantListItem({ user, onRemoveClick }) {
  const classes = useStyles();

  return (
    <Box className={classes.usersListItem}>
      <Box className={classes.usersListItemInner}>
        <Box className={classes.usersListItemInnerAvatar}>
          <Box className={classes.usersListItemInnerAvatarWrapper}>
            <ArrowTooltip title={user.username}>
              {user.avatarUrl ? (
                <Avatar
                  className={classes.usersListItemInnerAvatarImg}
                  src={user.avatarUrl}
                />
              ) : (
                <Avatar className={classes.usersListItemInnerAvatarWrapper}>
                  {user.username[0]}
                  {user.username[1]}
                </Avatar>
              )}
            </ArrowTooltip>
          </Box>
        </Box>
        <Box
          className={classNames(
            classes.usersListItemContent,
            classes.contentOverflow
          )}
        >
          <Box className={classes.usersListItemContentName}>
            <Box
              className={classNames(
                classes.usersListItemContentNameInner,
                classes.contentOverflow
              )}
            >
              <span
                className={classNames(
                  classes.usersListItemContentNameInnerSpan,
                  classes.contentOverflow
                )}
              >
                {user.username}
              </span>
            </Box>
          </Box>
        </Box>
        <InteractiveDangerButton
          onClick={() => onRemoveClick(user._id)}
          style={{ height: '28px' }}
        >
          Remove
        </InteractiveDangerButton>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  usersListItem: {
    marginTop: '8px',
    position: 'relative',
    display: 'block',
    maxWidth: '100%',
    padding: '1px 0',
    outline: '0',
    borderRadius: '4px',
    border: `1px solid ${theme.palette.backgroundAccent}`,
    boxSizing: 'border-box',
    color: theme.palette.channelsDefault,
  },
  usersListItemInner: {
    display: 'flex',
    alignItems: 'center',
    height: '42px',
    padding: '0 8px',
    margin: '0',
    outline: '0',
    borderRadius: '4px',
  },
  usersListItemInnerAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '0 0 auto',
    width: '32px',
    height: '32px',
    marginRight: '12px',
    outline: '0',
  },
  usersListItemInnerAvatarWrapper: {
    position: 'relative',
    width: '32px',
    height: '32px',
    outline: '0',
    borderRadius: '50%',
    fontSize: '16px',
  },
  usersListItemInnerAvatarImg: {
    position: 'absolute',
    display: 'block',
    height: '100%',
    width: 'auto',
  },
  usersListItemContent: {
    minWidth: '0',
    flex: '1 1 auto',
    outline: '0',
  },
  usersListItemContentName: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    outline: '0',
  },
  usersListItemContentNameInner: {
    flex: '0 1 auto',
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: '500',
    // fontWeight: 'bold',
    outline: '0',
  },
  usersListItemContentNameInnerSpan: {
    display: 'block',
    outline: '0',
    // fontFamily: 'Roboto',
    color: theme.palette.textNormal,
  },
  contentOverflow: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  offline: {
    opacity: '0.3',
    '&:hover': {
      opacity: '1',
    },
  },
}));
