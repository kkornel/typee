import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

import PurpleButton from '../../../ui/buttons/PurpleButton';
import RedDarkButton from '../../../ui/buttons/RedDarkButton';
import HomeSectionHeader from '../HomeSectionHeader';

export default function HomeSettingsProfileInfo({
  user,
  onEditClick,
  onLogoutClick,
  showProfileEdit,
}) {
  const classes = useStyles();

  return (
    <Box>
      <HomeSectionHeader title="My account" />
      <Box className={classes.profileSummary}>
        <Box className={classes.profileImg}>
          <Avatar
            className={classes.profileAvatar}
            src={user.avatarUrl}
            alt="It is supposed to show very important data, but it doesn't :("
          >
            {user.username[0]}
            {user.username[1]}
          </Avatar>
        </Box>
        <Box className={classes.profileInfo}>
          <Box className={classes.profileInfoSection}>
            <Box className={classes.profileInfoHeader}>Username</Box>
            <Box className={classes.profileInfoContent}>{user.username}</Box>
          </Box>
          <Box className={classes.profileInfoSection}>
            <Box className={classes.profileInfoHeader}>Email</Box>
            <Box className={classes.profileInfoContent}>{user.email}</Box>
          </Box>
        </Box>
        <Box className={classes.profileButtonsBox}>
          <Box className={classes.profileButtonsEdit}>
            {!showProfileEdit && (
              <PurpleButton onClick={onEditClick} cls={classes.purpleButton}>
                Edit
              </PurpleButton>
            )}
          </Box>
          <Box className={classes.profileButtonsLogout}>
            <RedDarkButton onClick={onLogoutClick}>Logout</RedDarkButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  profileSummary: {
    display: 'flex',
    flex: '1 1 auto',
    padding: '16px',
    border: `1px solid ${theme.palette.backgroundTertiary}`,
    borderRadius: '5px',
    background: theme.palette.activityCardBackground,
  },
  profileImg: {
    marginRight: '16px',
  },
  profileAvatar: {
    width: '100px',
    height: '100px',
    fontSize: '42px',
  },
  profileInfo: {
    width: '100%',
  },
  profileInfoSection: {
    marginBottom: '20px',
  },
  profileInfoHeader: {
    marginBottom: '4px',
    textTransform: 'uppercase',
    fontSize: '12px',
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: theme.palette.channelsDefault,
  },
  profileInfoContent: {
    fontSize: '14px',
    fontFamily: 'Roboto',
    color: theme.palette.headerSecondary,
  },
  profileButtonsBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  profileButtonsEdit: {
    display: 'flex',
  },
  profileButtonsLogout: {
    display: 'flex',
    alignSelf: 'flex-end',
  },
  purpleButton: {
    width: '100%',
  },
}));
