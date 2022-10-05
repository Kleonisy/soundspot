import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddMusicModal from '../AddMusicModal/AddMusicModal';
import Demo from '../Demo/Demo';
import Player from '../Player/Player';
import { loadSessionUser } from '../../storeAndSlices/Slices/authReducer';
import './Music.css';

function Music() {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [player, setPlayer] = useState(false);
  const [song, setSong] = useState('');
  const { data: user, } = useSelector((state) => state.authState);
  const { delMusicStatus } = useSelector((state) => state.userState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSessionUser());
  }, [delMusicStatus]);

  // useEffect(() => {
  //   if (user) {
  //     dispatch(findUser(user.id));
  //   }
  // }, []);

  return (
    <div className="demo-cont">
      {show && <AddMusicModal show={show} setShow={setShow} user={user} />}
      <button type="button" onClick={() => navigate(-1)} className="back-button">Move Back</button>
      {player && <Player className="player" src={`http://localhost:3000/${song}`} onEndPlay={() => setPlayer(false)} />}

      <div className="demos-cont">
        <input className="search-input" type="text" placeholder="Search..." onChange={(e) => setValue(e.target.value)} />
        <div className="demos-box">
          {user
            && user.UserDemos
            && user.UserDemos.length
            ? (
              user.UserDemos
                && user.UserDemos
                  .filter((demo) => demo.demoTitle.toLowerCase().includes(value.toLowerCase()))
                  .map((demo) => (
                    <Demo
                      key={demo.id}
                      demo={demo}
                      owner={user}
                      setPlayer={setPlayer}
                      setSong={setSong}
                    />
                  ))
            )
            : (
              <h5 className="no-musics-title">No musics</h5>
            )}
        </div>
      </div>
      <button className="add-demo-btn" type="button" onClick={() => setShow(true)}>Add demos</button>
    </div>
  );
}

export default Music;
