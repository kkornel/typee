import React from 'react';

import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ({ snackbarData }) {
  const { open, severity, message } = snackbarData;

  console.log(open, severity, message);

  const [openSnackbar, setOpen] = React.useState(open);

  const handleSnackbarClose = () => {
    setOpen(false);
  };
  console.log('openSnackbar', openSnackbar);
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      // onClose={handleSnackbarClose}
    >
      <Alert
        // onClose={handleSnackbarClose}
        severity={severity}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
