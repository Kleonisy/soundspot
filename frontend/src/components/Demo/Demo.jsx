/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import playerIkon from './player.svg';
import stopIkon from './stop.svg';
import delIkon from './delete-ikon.svg';
import './Demo.css';
import { deleteMusic } from '../../storeAndSlices/Slices/userReducer';

function Demo({ demo, owner, setPlayer, setSong }) {
  const { data: user } = useSelector((state) => state.authState);
  const [playable, setPlayable] = useState(playerIkon);

  const playSong = () => {
    setPlayer((prev) => !prev);
    setSong(demo.demoFile);
    if (playable === playerIkon) {
      setPlayable(stopIkon);
    } else {
      setPlayable(playerIkon);
    }
  };

  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const deleteMusicFetch = () => {
    if (pathname === '/music') { dispatch(deleteMusic({ id: owner.id, demo })); }
  };

  return (
    <div className="demo-box">
      <img className="player-ikon" src={playable} alt="player" onClick={() => playSong()} />
      <div className="demo-inf">
        <h5 className="demo-owner">{owner && (owner.login || owner.name)}</h5>
        <p className="demo-name">{demo && (demo.songName || demo.demoFile)}</p>
      </div>
      <div className="ikon-container">
        {owner.email === user.email
        && <img src={delIkon} alt="delete" className="delete-ikon" onClick={() => deleteMusicFetch()} />}
      </div>
    </div>
  );
}

export default Demo;
