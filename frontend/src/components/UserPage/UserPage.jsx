/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { loadUser } from '../../storeAndSlices/Slices/userReducer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Rating from '../UI/Rating/Rating';
import './UserPage.css';

function UserPage() {
  const { user } = useSelector((state) => state.userState);
  const { hasUser } = useSelector((state) => state.authState);

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  // <button className="back-button" type="button" onClick={() => navigate(-1)}>Move Back</button>

  useEffect(() => {
    if (id) {
      dispatch(loadUser(Number(id)));
    }
  }, [id]);

  if (!hasUser) {
    return <NotFoundPage />;
  }

  return (
    <div className="user-container">
      <div className="left-container">
        <div className="rating-box">
          <div className="soundSpot__username-userPage">{user && user.login}</div>
          <div className="soundSpot_rating-container">
            <Rating user={user} />
          </div>
          <div className="button-move-back-users" onClick={() => navigate(-1)}>Move Back</div>
        </div>
        <div className="soundSpot_userInfo-container">
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
                  && user.UserBands.map((data) => <p className="user-inf" key={data.id} onClick={() => navigate(`/bands/${data.Band.id}`)}>{data.Band.name}</p>)}
              </p>
            </div>
            <div className="inf-box">
              <h5>Contact me:</h5>
              <p className="user-inf">
                <a href={`https://${user && user.contact}`} target="_blank" rel="noreferrer" className="user-checkout-contact-link">{user && user.contact}</a>
              </p>
            </div>
          </div>
        </div>
        <div className="lower-inf-container">
          <div>
            <h5>About</h5>
            <p className="user-inf">{user && user.about}</p>
          </div>
        </div>
      </div>
      <div className="right-container">
        {user && <div className="user-img-container"><img className="user-img" src={user.photo} alt={user.login} /></div>}
        <div className="soundSpot__checkMyDemos">
          Check out my demos
          {' '}
          <NavLink className="soundSpot__checkMyDemos_link" to={user && `/artists/${user.id}/music`}>here</NavLink>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
