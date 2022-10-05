import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { loadAsyncBand } from '../../storeAndSlices/Slices/bandsReducer';
import './BandPage.css';

function BandPage() {
  const { band } = useSelector((state) => state.bandsState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadAsyncBand(Number(id)));
  }, []);
  return (
    <div className="band-page-gallery">
      <div className="band-page-left">
        <div className="band-name"><h2>{band && band.name}</h2></div>
        <div className="band-photo"><img className="band-photo-img" src={band && band.photo} alt={band && band.name} /></div>
        <div className="biography"><h4>Biography</h4></div>
        <div className="band-about">{band && band.about}</div>
      </div>
      <div className="band-page-right">
        <div className="band-page-genres">
          <h3>Genres:</h3>
          {band && band.BandGenres.map((el) => <p className="users-band" key={el.id}>{el.Genre.genre}</p>)}
        </div>
        <div className="band-members">
          <h3>Members:</h3>
          {band && band.UserBands.map((el) => <p className="users-band" key={el.id}>{el.User.login}</p>)}
        </div>
        <div className="band-checkout-demos">
          Checkout our demos
          {' '}
          <Link to={`/bands/${band && band.id}/music`} className="band-checkout-demos-link">here</Link>
        </div>
        <Link to="/bands" className="button-move-back" onClick={() => navigate('/bands')}>Move Back</Link>
      </div>
    </div>
  );
}

export default BandPage;
