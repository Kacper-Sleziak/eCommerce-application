import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

interface IConfirmationMessageSnackbarProps {
  message: string
  severity: "error" | "info" | "warning" | "success"
}

const ConfirmationMessageSnackbar = ({ message, severity }: IConfirmationMessageSnackbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (message != "") {
      handleOpen();
    }

  }, [message]);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      setIsOpen(false);
      return;
    }
    setIsOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="medium"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      >

        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ConfirmationMessageSnackbar;
