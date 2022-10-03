import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function Player({ src, onEndPlay }) {
  return (
    <AudioPlayer
      className="player"
      autoPlay
      onEnded={onEndPlay}
      src={src}
    />
  );
}

export default Player;
