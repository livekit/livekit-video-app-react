import { LocalAudioTrack } from 'livekit-client';
import { useCallback } from 'react';
import useIsTrackEnabled from '../useIsTrackEnabled/useIsTrackEnabled';
import useVideoContext from '../useVideoContext/useVideoContext';

export default function useLocalAudioToggle() {
  const { localTracks } = useVideoContext();
  const audioTrack = localTracks.find(track => track.kind === 'audio') as LocalAudioTrack;
  const isEnabled = useIsTrackEnabled(audioTrack);

  const toggleAudioEnabled = useCallback(() => {
    if (audioTrack) {
      audioTrack.isMuted ? audioTrack.mute() : audioTrack.unmute();
    }
  }, [audioTrack]);

  return [isEnabled, toggleAudioEnabled] as const;
}
