/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Rating from '../UI/Rating/Rating';
import UserEditProfile from '../UserEditProfile/UserEditProfile';
import './Profile.css';

function Profile() {
  const { data: user, hasUser } = useSelector((state) => state.authState);
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="profile-container">
      <div className="left-prof-box">
        <div className="name-rating-box">
          <h2>{hasUser && user.login}</h2>
          <Rating user={user && user} />
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
            <h5>My Bands</h5>
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
          <div>
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
