import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import LiveKit from 'livekit-client';
import React, { PropsWithChildren } from 'react';
import { version as appVersion } from '../../../package.json';
import { useAppState } from '../../state';

interface AboutDialogProps {
  open: boolean;
  onClose(): void;
}

function AboutDialog({ open, onClose }: PropsWithChildren<AboutDialogProps>) {
  const { roomType } = useAppState();
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="xs">
      <DialogTitle>About</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>Browser supported: {String(LiveKit.isSupported)}</DialogContentText>
        <DialogContentText>SDK Version: {LiveKit.version}</DialogContentText>
        <DialogContentText>App Version: {appVersion}</DialogContentText>
        <DialogContentText>Deployed Tag: {process.env.REACT_APP_GIT_TAG || 'N/A'}</DialogContentText>
        <DialogContentText>Deployed Commit Hash: {process.env.REACT_APP_GIT_COMMIT || 'N/A'}</DialogContentText>
        {roomType && <DialogContentText>Room Type: {roomType}</DialogContentText>}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AboutDialog;
