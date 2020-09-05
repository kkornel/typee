import React from 'react';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

import ArrowTooltip from '../../ui/ArrowTooltip';

export default function UserListItem({ user }) {
  const classes = useStyles();

  return (
    <Box
      className={classNames(
        classes.usersListItem,
        user.online ? '' : classes.offline
      )}
    >
      <Box className={classes.usersListItemInner}>
        <Box className={classes.usersListItemInnerAvatar}>
          <Box className={classes.usersListItemInnerAvatarWrapper}>
            <ArrowTooltip title={user.username}>
              {user.avatarURL ? (
                <Avatar
                  className={classes.usersListItemInnerAvatarImg}
                  src={user.avatarURL}
                />
              ) : (
                <Avatar className={classes.usersListItemInnerAvatarWrapper}>
                  {user.username[0]}
                  {user.username[1]}
                </Avatar>
              )}
            </ArrowTooltip>
            {/* <img
                className={classes.usersListItemInnerAvatarImg}
                width="40"
                height="32"
                src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
              /> */}
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
          <Box
            className={classNames(
              classes.usersListItemContentSubtext,
              classes.contentOverflow
            )}
          >
            <Box className={classes.usersListItemContentSubtextInner}>
              <div
                className={classNames(
                  classes.usersListItemContentNameInnerDiv,
                  classes.contentOverflow
                )}
              >
                {user.subtext}
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  usersListItem: {
    position: 'relative',
    display: 'block',
    maxWidth: '100%',
    margin: '0 8px',
    padding: '1px 0',
    outline: '0',
    borderRadius: '4px',
    boxSizing: 'border-box',
    color: theme.palette.channelsDefault,
    '&:hover': {
      background: theme.palette.interactiveMuted,
      color: theme.palette.interactiveHover,
      cursor: 'pointer',
    },
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
  },
  usersListItemContentSubtext: {
    marginTop: '-2px',
    outline: '0',
  },
  usersListItemContentSubtextInner: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '500',
    outline: '0',
    color: theme.palette.channelsDefault,
  },
  usersListItemContentNameInnerDiv: {
    flex: '0 1 auto',
    outline: '0',
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
