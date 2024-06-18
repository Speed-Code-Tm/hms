import React, { useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const VideoCall = ({ channelName, token }) => {
  const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

  const joinChannel = async () => {
    await client.join(process.env.REACT_APP_AGORA_APP_ID, channelName, token, null);
    const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    const localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    await client.publish([localAudioTrack, localVideoTrack]);
  };

  const leaveChannel = async () => {
    await client.leave();
  };

  useEffect(() => {
    joinChannel();
    return () => leaveChannel();
  }, [channelName, token]);

  return (
    <div>
      <button onClick={leaveChannel}>Leave Call</button>
    </div>
  );
};

export default VideoCall;
