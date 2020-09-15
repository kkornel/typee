import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import InteractiveNormalButton from '../buttons/InteractiveNormalButton';

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
      PaperProps={{ classes: { root: classes.paper } }}
    >
      <Box className={classes.header}>
        <Box className={classes.headerContent}>
          <Box className={classes.headerImageBox}>
            <Avatar
              className={classes.headerImage}
              src={user.avatarUrl}
              alt="It is supposed to show very important data, but it doesn't :("
            >
              {user.username[0]}
              {user.username[1]}
            </Avatar>
          </Box>
          {user.username}
        </Box>
      </Box>
      <Box className={classes.section}>
        <Box className={classes.sectionHeader}>Subtext</Box>
        <Box className={classes.sectionContent}>{user.subtext}</Box>
      </Box>
      <DialogActions>
        <InteractiveNormalButton disabled onClick={handleAddFriend}>
          Add Friend
        </InteractiveNormalButton>
        <InteractiveNormalButton onClick={handleDialogClose}>
          Cancel
        </InteractiveNormalButton>
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
}));
