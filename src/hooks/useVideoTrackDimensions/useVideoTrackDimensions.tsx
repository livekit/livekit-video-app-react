import { LocalVideoTrack, RemoteVideoTrack } from 'livekit-client';
import { useEffect, useState } from 'react';

type TrackType = LocalVideoTrack | RemoteVideoTrack;

export default function useVideoTrackDimensions(track?: TrackType) {
  const [dimensions, setDimensions] = useState(track?.dimensions);

  useEffect(() => {
    setDimensions(track?.dimensions);

    if (track) {
      const handleDimensionsChanged = (track: TrackType) =>
        setDimensions({
          width: track.dimensions.width,
          height: track.dimensions.height,
        });
      track.on('dimensionsChanged', handleDimensionsChanged);
      return () => {
        track.off('dimensionsChanged', handleDimensionsChanged);
      };
    }
  }, [track]);

  return dimensions;
}
