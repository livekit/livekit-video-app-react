import { LocalAudioTrack, LocalVideoTrack, RemoteAudioTrack, RemoteVideoTrack, TrackEvent } from 'livekit-client';
import { useEffect, useState } from 'react';

type TrackType = LocalAudioTrack | LocalVideoTrack | RemoteAudioTrack | RemoteVideoTrack | undefined;

export default function useIsTrackEnabled(track: TrackType) {
  const [isEnabled, setIsEnabled] = useState(track ? track.isMuted : false);

  useEffect(() => {
    setIsEnabled(track ? track.isMuted : false);

    if (track) {
      const setEnabled = () => setIsEnabled(true);
      const setDisabled = () => setIsEnabled(false);
      track.on(TrackEvent.Unmuted, setEnabled);
      track.on(TrackEvent.Muted, setDisabled);
      return () => {
        track.off(TrackEvent.Unmuted, setEnabled);
        track.off(TrackEvent.Muted, setDisabled);
      };
    }
  }, [track]);

  return isEnabled;
}
