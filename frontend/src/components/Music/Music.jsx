import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Demo from '../Demo/Demo';
import Player from '../Player/Player';
import '../UserDemo/UserDemo.css';

function Music() {
  const [player, setPlayer] = useState(false);
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const { data: user, } = useSelector((state) => state.authState);
  const demos = [{ id: 1, songName: 'nnn' }, { id: 2, songName: 'nnn' }, { id: 3, songName: 'nnn' }, { id: 4, songName: 'nmd' }, { id: 5, songName: 'nmmd' },
    { id: 6, songName: 'nnn' }, { id: 7, songName: 'nnn' }, { id: 8, songName: 'nnn' }, { id: 9, songName: 'nmd' }, { id: 10, songName: 'nmmd' }];

  return (
    <div className="user-demo-cont">
      <button type="button" onClick={() => navigate(-1)} className="back-button">Move Back</button>
      {player && <Player className="player" src="http://localhost:3000/example.mp3" onEndPlay={() => setPlayer(false)} />}
      <div className="demo-container">
        <input className="search-input" type="text" placeholder="Search..." onChange={(e) => setValue(e.target.value)} />
        <div className="demos-box">
          {demos
            && demos
              .filter((demo) => demo.songName.toLowerCase().includes(value.toLowerCase()))
              .map((demo) => <Demo key={demo.id} demo={demo} owner={user} setPlayer={setPlayer} />)}
        </div>
      </div>
    </div>
  );
}

export default Music;
