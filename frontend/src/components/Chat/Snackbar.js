import React from 'react';

import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ({
  openSnackbar,
  handleSnackbarClose,
  snackbarSeverity,
  snackbarMessage,
}) {
  console.log('asdas');
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
    >
      <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
}
