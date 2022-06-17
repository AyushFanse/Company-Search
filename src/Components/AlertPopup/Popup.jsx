import { Stack, Alert, Snackbar, Slide } from '@mui/material';
import * as React from 'react';

const Transition = (props) => {
  return <Slide {...props} direction="left" />;
}

const Message = ({ message, security, Worning }) => {

  //*-------------------------------* STATE VALUES *-------------------------------*//
  const [open, setOpen] = React.useState(true);

  if (!message === '') {
    return setOpen(true);
  }

  //*-------------------------------* CLOSE FUNCTION *-------------------------------*//
  const handleClose = () => {
    setOpen(false);
    Worning('')
  };

  return (
    <>
      {
        message
          ?
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={6000} TransitionComponent={Transition} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={handleClose}>
              <Alert elevation={6} onClose={handleClose} severity={security || "success"} sx={{ width: '100%' }}>
                {message}
              </Alert>
            </Snackbar>
          </Stack>
          :
          null
      }
    </>
  );
}



export default Message;
