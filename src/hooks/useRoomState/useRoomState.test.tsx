import { act, renderHook } from '@testing-library/react-hooks';
import EventEmitter from 'events';
import { Room, RoomState } from 'livekit-client';
import useVideoContext from '../useVideoContext/useVideoContext';
import useRoomState from './useRoomState';

jest.mock('../useVideoContext/useVideoContext');

const mockedVideoContext = useVideoContext as jest.Mock<any>;

describe('the useRoomState hook', () => {
  let mockRoom: Room;

  beforeEach(() => {
    mockRoom = new EventEmitter() as Room;
    mockedVideoContext.mockImplementation(() => ({
      room: mockRoom,
      isConnecting: false,
      localTracks: [],
      onError: () => {},
      onDisconnect: () => {},
    }));
  });

  it('should return "disconnected" by default', () => {
    const { result } = renderHook(useRoomState);
    expect(result.current).toBe('disconnected');
  });

  it('should return "connected" if the room state is connected', () => {
    mockRoom.state = RoomState.Connected;
    const { result } = renderHook(useRoomState);
    expect(result.current).toBe('connected');
  });

  it('should respond to the rooms "reconnecting" event', () => {
    const { result } = renderHook(useRoomState);
    act(() => {
      mockRoom.state = RoomState.Reconnecting;
      mockRoom.emit(RoomState.Reconnecting);
    });
    expect(result.current).toBe(RoomState.Reconnecting);
  });

  it('should respond to the rooms "reconnected" event', () => {
    const { result } = renderHook(useRoomState);
    act(() => {
      mockRoom.state = RoomState.Connected;
      mockRoom.emit(RoomState.Reconnecting);
    });
    expect(result.current).toBe(RoomState.Connected);
  });

  it('should respond to the rooms "disconnected" event', () => {
    mockRoom.state = RoomState.Connected;
    const { result } = renderHook(useRoomState);
    expect(result.current).toBe(RoomState.Connected);
    act(() => {
      mockRoom.state = RoomState.Disconnected;
      mockRoom.emit(RoomState.Disconnected);
    });
    expect(result.current).toBe(RoomState.Disconnected);
  });

  it('should update when a new room object is provided', () => {
    const { result, rerender } = renderHook(useRoomState);
    expect(result.current).toBe(RoomState.Disconnected);

    act(() => {
      mockRoom = new EventEmitter() as Room;
      mockRoom.state = RoomState.Connected;
      mockedVideoContext.mockImplementation(() => ({
        room: mockRoom,
        isConnecting: false,
        localTracks: [],
        onError: () => {},
        onDisconnect: () => {},
      }));
    });

    rerender();

    expect(result.current).toBe('connected');
  });

  it('tear down old listeners when receiving a new room', () => {
    const originalMockRoom = mockRoom;
    const { rerender } = renderHook(useRoomState);
    expect(originalMockRoom.listenerCount('disconnected')).toBe(1);
    expect(originalMockRoom.listenerCount('reconnected')).toBe(1);
    expect(originalMockRoom.listenerCount('reconnecting')).toBe(1);

    act(() => {
      mockRoom = new EventEmitter() as Room;
      mockedVideoContext.mockImplementation(() => ({
        room: mockRoom,
        isConnecting: false,
        localTracks: [],
        onError: () => {},
        onDisconnect: () => {},
      }));
    });

    rerender();

    expect(originalMockRoom.listenerCount('disconnected')).toBe(0);
    expect(originalMockRoom.listenerCount('reconnected')).toBe(0);
    expect(originalMockRoom.listenerCount('reconnecting')).toBe(0);
  });
});
