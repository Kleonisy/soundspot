import React from 'react';
import player from './player.svg';
import delIkon from './delete-ikon.svg';
import './Demo.css';

function Demo({ demo, owner }) {
  return (
    <div className="demo-box">
      <img className="palyer-ikon" src={player} alt="player" />
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
