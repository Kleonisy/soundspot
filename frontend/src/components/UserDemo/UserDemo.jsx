import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { findUser } from '../../storeAndSlices/Slices/usersReducer';
import Player from '../Player/Player';
import Demo from '../Demo/Demo';
import './UserDemo.css';

function UserDemo() {
  const [value, setValue] = useState('');
  const [player, setPlayer] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, users } = useSelector((state) => state.usersState);
  const demos = [{ id: 1, songName: 'nnn' }, { id: 2, songName: 'nnn' }, { id: 3, songName: 'nnn' }, { id: 4, songName: 'nmd' }, { id: 5, songName: 'nmmd' },
    { id: 6, songName: 'nnn' }, { id: 7, songName: 'nnn' }, { id: 8, songName: 'nnn' }, { id: 9, songName: 'nmd' }, { id: 10, songName: 'nmmd' }];

  useEffect(() => {
    dispatch(findUser(id));
  }, [users]);

  return (
    <div className="user-demo-cont">
      <button type="button" onClick={() => navigate(-1)} className="back-button">Move Back</button>
      {player && <Player className="palyer" src="http://localhost:3000/example.mp3" onEndPlay={() => setPlayer(false)} />}
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

export default UserDemo;
