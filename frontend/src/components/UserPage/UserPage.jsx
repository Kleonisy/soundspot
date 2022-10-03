import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { loadUser } from '../../storeAndSlices/Slices/userReducer';
import Rating from '../UI/Rating/Rating';
import './UserPage.css';

function UserPage() {
  const { user } = useSelector((state) => state.userState);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(loadUser(Number(id)));
    }
  }, [id]);

  return (
    <div className="user-container">
      <div className="left-container">
        <div className="rating-box">
          <h2>{user && user.login}</h2>
          <Rating user={user} />
        </div>
        <div className="upper-inf-container">
          <div className="inf-box">
            <h5>My genres</h5>
            <p className="user-inf">
              {user
          && user.UserGenres
          && user.UserGenres.map((data) => <p className="user-inf" key={data.id}>{data.Genre.genre}</p>)}
            </p>
          </div>
          <div className="inf-box">
            <h5>My Instruments</h5>
            <p className="user-inf">
              {user
            && user.UserInstruments
            && user.UserInstruments.map((data) => <p className="user-inf" key={data.id}>{data.Instrument.instrument}</p>)}
            </p>
          </div>
          <div className="inf-box">
            <h5>My Bands</h5>
            <p className="user-inf">
              {user
            && user.UserBands
            && user.UserBands.map((data) => <p className="user-inf" key={data.id}>{data.Band.name}</p>)}
            </p>
          </div>
          <div className="inf-box">
            <h5>Contact me:</h5>
            <p className="user-inf">
              {user && user.contact}
            </p>
          </div>
        </div>
        <div className="lower-inf-container">
          <div>
            <h5>About</h5>
            <p className="user-inf">{user && user.about}</p>
          </div>
          <div>
            <h5>
              Check out my demos
              {' '}
              <NavLink to={user && `/artists/${user.id}/music`}>here</NavLink>
            </h5>
          </div>
        </div>
      </div>
      <div className="right-container">
        {user && <div className="user-img-container"><img className="user-img" src={user.photo} alt={user.login} /></div>}
      </div>
    </div>
  );
}

export default UserPage;
