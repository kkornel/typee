import React from 'react';
import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import HomeSettingsProfileInfo from './HomeSettingsProfileInfo';
import HomeSettingsProfileEdit from './HomeSettingsProfileEdit';

import { useAsync } from '../../../../utils/useAsync';
import { useAuth } from '../../../../context/AuthContext';

export default function HomeSettings({ socket }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { execute } = useAsync();
  const { user, updateProfile, logout } = useAuth();

  const [showProfileEdit, setShowProfileEdit] = React.useState(false);

  const onSuccessfulUpdate = () => {
    setShowProfileEdit(false);

    enqueueSnackbar(`Profile updated`, {
      variant: 'success',
      autoHideDuration: 2000,
    });
  };

  return (
    <Box className={classes.homeSettings}>
      <HomeSettingsProfileInfo
        user={user}
        showProfileEdit={showProfileEdit}
        onEditClick={() => setShowProfileEdit(true)}
        onLogoutClick={async () => await execute(logout())}
      />
      {showProfileEdit && (
        <HomeSettingsProfileEdit
          user={user}
          socket={socket}
          updateProfile={updateProfile}
          onCancelClick={() => setShowProfileEdit(false)}
          onSuccessfulUpdate={onSuccessfulUpdate}
        />
      )}
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  homeSettings: {
    height: '100vh',
    padding: '0 16px',
    background: theme.palette.backgroundPrimary,
  },
}));
