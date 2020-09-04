import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

export default function UserInfoDialog({ user, handleDialogClose, open }) {
  const classes = useStyles();

  const handleAddFriend = () => {
    console.log('Add Friend');
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      maxWidth={'xs'}
      fullWidth={true}
      aria-labelledby="form-dialog-name"
      PaperProps={{ classes: { root: classes.paper } }}
    >
      <Box className={classes.header}>
        <Box className={classes.headerContent}>
          <Box className={classes.headerImageBox}>
            {user.avatarURL ? (
              <img
                src={user.avatarURL}
                className={classes.headerImage}
                alt="Supposed to show very important data"
              />
            ) : (
              <Avatar className={classes.headerImage}>
                {user.username[0]}
                {user.username[1]}
              </Avatar>
            )}
          </Box>
          {user.username}
        </Box>
      </Box>
      <Box className={classes.section}>
        <Box className={classes.sectionHeader}>Subtext</Box>
        <Box className={classes.sectionContent}>{user.subtext}</Box>
      </Box>
      <DialogActions>
        <Button
          onClick={handleAddFriend}
          className={classes.interactiveMutedButton}
        >
          Add Friend
        </Button>
        <Button
          onClick={handleDialogClose}
          className={classes.interactiveNormalButton}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.backgroundPrimary,
    color: theme.palette.textNormal,
  },
  header: {
    background: theme.palette.backgroundTertiary,
    width: '100%',
  },
  headerContent: {
    padding: '16px',
    textAlign: 'center',
    fontWeight: '600',
    color: theme.palette.headerPrimary,
  },
  headerImageBox: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '12px',
    width: '120px',
  },
  headerImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    fontSize: '64px',
  },
  section: {
    padding: '16px',
  },
  sectionHeader: {
    marginBottom: '4px',
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: theme.palette.headerSecondary,
  },
  sectionContent: {
    fontSize: '12px',
    color: theme.palette.textNormal,
  },
  interactiveNormalButton: {
    color: theme.palette.interactiveNormal,
    '&:hover': {
      color: theme.palette.interactiveHover,
      backgroundColor: theme.palette.interactiveMuted,
    },
  },
  interactiveMutedButton: {
    color: theme.palette.interactiveMuted,
    '&:hover': {
      cursor: 'unset',
      backgroundColor: theme.palette.backgroundPrimary,
    },
  },
}));
