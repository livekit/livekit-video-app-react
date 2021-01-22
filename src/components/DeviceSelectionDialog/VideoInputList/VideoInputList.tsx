import { FormControl, MenuItem, Select, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LocalVideoTrack } from 'livekit-client';
import React from 'react';
import { DEFAULT_VIDEO_CONSTRAINTS, SELECTED_VIDEO_INPUT_KEY } from '../../../constants';
import { useVideoInputDevices } from '../../../hooks/deviceHooks/deviceHooks';
import useMediaStreamTrack from '../../../hooks/useMediaStreamTrack/useMediaStreamTrack';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import VideoTrack from '../../VideoTrack/VideoTrack';

const useStyles = makeStyles({
  preview: {
    width: '300px',
    maxHeight: '200px',
    margin: '0.5em auto',
    '& video': {
      maxHeight: '200px',
    },
  },
});

export default function VideoInputList() {
  const classes = useStyles();
  const videoInputDevices = useVideoInputDevices();
  const { localTracks } = useVideoContext();

  const localVideoTrack = localTracks.find(track => track.kind === 'video') as LocalVideoTrack;
  const mediaStreamTrack = useMediaStreamTrack(localVideoTrack);
  const localVideoInputDeviceId = mediaStreamTrack?.getSettings().deviceId;

  function replaceTrack(newDeviceId: string) {
    window.localStorage.setItem(SELECTED_VIDEO_INPUT_KEY, newDeviceId);
    localVideoTrack.restart({
      ...(DEFAULT_VIDEO_CONSTRAINTS as {}),
      deviceId: { exact: newDeviceId },
    });
  }

  return (
    <div>
      {localVideoTrack && (
        <div className={classes.preview}>
          <VideoTrack isLocal track={localVideoTrack} />
        </div>
      )}
      {videoInputDevices.length > 1 ? (
        <FormControl fullWidth>
          <Typography variant="subtitle2" gutterBottom>
            Video Input
          </Typography>
          <Select
            onChange={e => replaceTrack(e.target.value as string)}
            value={localVideoInputDeviceId || ''}
            variant="outlined"
          >
            {videoInputDevices.map(device => (
              <MenuItem value={device.deviceId} key={device.deviceId}>
                {device.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <>
          <Typography variant="subtitle2" gutterBottom>
            Video Input
          </Typography>
          <Typography>{localVideoTrack?.mediaStreamTrack.label || 'No Local Video'}</Typography>
        </>
      )}
    </div>
  );
}
