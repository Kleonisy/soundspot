import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../storeAndSlices/Slices/authReducer';
import './UserPage.css';

function UserPage() {
  const { data: user, hasUser } = useSelector((state) => state.authState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [hasUser]);

  return (
    <div className="user-container">
      <div className="left-container">
        <h2>{hasUser && user.login}</h2>
        <div className="upper-inf-container">
          <div className="inf-box">
            <h5>My genres</h5>
            <p className="user-inf">
              {hasUser
          && user.UserGenres.length > 0
          && user.UserGenres.map((data) => <p className="user-inf" key={data.id}>{data.Genre.genre}</p>)}
            </p>
          </div>
          <div className="inf-box">
            <h5>My Instruments</h5>
            <p className="user-inf">
              {hasUser
            && user.UserInstruments.length > 0
            && user.UserInstruments.map((data) => <p className="user-inf" key={data.id}>{data.Instrument.instrument}</p>)}
            </p>
          </div>
          <div className="inf-box">
            <h5>My Bands</h5>
            <p className="user-inf">
              {user.UserBands
            && user.UserBands.length > 0
            && user.UserBands.map((data) => <p className="user-inf" key={data.id}>{data.Band.name}</p>)}
            </p>
          </div>
          <div className="inf-box">
            <h5>Contact me:</h5>
            <p className="user-inf">
              {hasUser && user.contact}
            </p>
          </div>
        </div>
        <div className="lower-inf-cont">
          <div>
            <h5>About</h5>
            <p className="user-inf">{hasUser && user.about}</p>
          </div>
          <div>
            <h5>Check out my demos here</h5>
          </div>
        </div>
      </div>
      <div className="right-container">
        {hasUser && <div className="user-img-container"><img className="user-img" src={user.photo} alt={user.login} /></div>}
      </div>
    </div>
  );
}

export default UserPage;
