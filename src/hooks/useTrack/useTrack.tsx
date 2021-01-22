import { LocalTrackPublication, RemoteTrackPublication } from 'livekit-client';
import { useEffect, useState } from 'react';

export default function useTrack(publication: LocalTrackPublication | RemoteTrackPublication | undefined) {
  const [track, setTrack] = useState(publication && publication.track);

  useEffect(() => {
    // Reset the track when the 'publication' variable changes.
    setTrack(publication && publication.track);

    if (publication) {
      const removeTrack = () => setTrack(undefined);

      publication.on('subscribed', setTrack);
      publication.on('unsubscribed', removeTrack);
      return () => {
        publication.off('subscribed', setTrack);
        publication.off('unsubscribed', removeTrack);
      };
    }
  }, [publication]);

  return track;
}
