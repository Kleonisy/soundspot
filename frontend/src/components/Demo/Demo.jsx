/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import playerIkon from './player.svg';
import delIkon from './delete-ikon.svg';
import './Demo.css';

function Demo({ demo, owner, setPlayer }) {
  return (
    <div className="demo-box">
      <img className="player-ikon" src={playerIkon} alt="player" onClick={() => setPlayer((prev) => !prev)} />
      <div className="demo-inf">
        <h5 className="demo-owner">{owner && (owner.login || owner.name)}</h5>
        <p className="demo-name">{demo && (demo.songName || `Demo ${demo.id}`)}</p>
      </div>
      <div className="ikon-container">
        <img src={delIkon} alt="delete" className="delete-ikon" />
      </div>
    </div>
  );
}

export default Demo;
