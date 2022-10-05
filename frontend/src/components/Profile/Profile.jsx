/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Rating from '../UI/Rating/Rating';
import UserEditProfile from '../UserEditProfile/UserEditProfile';
import { loadSessionUser } from '../../storeAndSlices/Slices/authReducer';
import './Profile.css';
import plus from '../../icons/icons8-plus.svg';
import CreateBand from '../CreateBand/CreateBand';

function Profile() {
  const dispatch = useDispatch();
  const { data: user, hasUser } = useSelector((state) => state.authState);
  const { users } = useSelector((state) => state.usersState);
  const [modalShow, setModalShow] = useState(false);
  const [modalBand, setModalBand] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!hasUser) {
      navigate('/home');
    }
  }, [hasUser]);

  useEffect(() => {
    dispatch(loadSessionUser());
  }, [users]);

  return (
    <div className="profile-container">
      <div className="left-prof-box">
        <div className="name-rating-box">
          <h2>{hasUser && user.login}</h2>
          <div className="soundSpot_rating-container">
            <Rating user={user && user} />
          </div>
        </div>
        <div className="upper-inf-box">
          <div className="inf-box">
            <h5>My genres</h5>
            <p className="profile-inf">
              {hasUser
                && user.UserGenres.length > 0
                && user.UserGenres.map((data) => <p className="profile-inf" key={data.id}>{data.Genre.genre}</p>)}
            </p>
          </div>
          <div className="inf-box">
            <h5>My Instruments</h5>
            <p className="profile-inf">
              {hasUser
                && user.UserInstruments.length > 0
                && user.UserInstruments.map((data) => <p className="profile-inf" key={data.id}>{data.Instrument.instrument}</p>)}
            </p>
          </div>
          <div className="inf-box">
            <h5>
              My Bands
              <img src={plus} onClick={() => setModalBand(true)} alt="1" />
            </h5>
            {modalBand && <CreateBand onHide={() => setModalBand(false)} />}
            <p className="profile-inf">
              {user.UserBands
                && user.UserBands.length > 0
                && user.UserBands.map((data) => <p className="profile-inf" key={data.id}>{data.Band.name}</p>)}
            </p>
          </div>
          <div className="inf-box">
            <h5>Contact me:</h5>
            <p className="profile-inf">
              {hasUser && user.contact}
            </p>
          </div>
        </div>
        <div className="lower-inf-box">
          <div className="soundSpot_progile-about">
            <h5>About</h5>
            <p className="profile-inf">{hasUser && user.about}</p>
          </div>
        </div>
      </div>
      <div className="right-box">
        {hasUser && <div className="profile-img-box"><img className="user-img" src={user.photo} alt={user.login} /></div>}
        <h4 type="button" className="editProfileTag" onClick={() => setModalShow(true)}>Edit Profile</h4>
        {modalShow && <UserEditProfile onHide={() => setModalShow(false)} />}
      </div>
    </div>
  );
}

export default Profile;
