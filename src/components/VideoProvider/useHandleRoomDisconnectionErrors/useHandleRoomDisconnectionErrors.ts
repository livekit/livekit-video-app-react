import { LivekitError, Room } from 'livekit-client';
import { useEffect } from 'react';
import { Callback } from '../../../types';

export default function useHandleRoomDisconnectionErrors(room: Room, onError: Callback) {
  useEffect(() => {
    const onDisconnected = (room: Room, error: LivekitError) => {
      if (error) {
        onError(error);
      }
    };

    room.on('disconnected', onDisconnected);
    return () => {
      room.off('disconnected', onDisconnected);
    };
  }, [room, onError]);
}
