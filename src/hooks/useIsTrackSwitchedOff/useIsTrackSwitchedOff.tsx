import { LocalVideoTrack, RemoteVideoTrack, TrackEvent } from 'livekit-client';
import { useEffect, useState } from 'react';

type TrackType = RemoteVideoTrack | LocalVideoTrack | undefined | null;

// The 'switchedOff' event is emitted when there is not enough bandwidth to support
// a track. See: https://www.twilio.com/docs/video/tutorials/using-bandwidth-profile-api#understanding-track-switch-offs

export default function useIsTrackSwitchedOff(track: TrackType) {
  const [isMuted, setIsMuted] = useState(track && track.isMuted);

  useEffect(() => {
    // Reset the value if the 'track' variable changes
    setIsMuted(track && track.isMuted);

    if (track) {
      const handleMuted = () => setIsMuted(true);
      const handleUnmuted = () => setIsMuted(false);
      track.on(TrackEvent.Muted, handleMuted);
      track.on(TrackEvent.Unmuted, handleUnmuted);
      return () => {
        track.off(TrackEvent.Muted, handleMuted);
        track.off(TrackEvent.Unmuted, handleUnmuted);
      };
    }
  }, [track]);

  return !!isMuted;
}
