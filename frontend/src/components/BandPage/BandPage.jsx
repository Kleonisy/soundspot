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
        <div className="band-name">{band && band.name}</div>
        <div className="band-photo"><img src={band && band.photo} alt={band && band.name} /></div>
        <div className="band-about">{band && band.about}</div>
      </div>
      <div className="band-page-right">
        <div className="band-members">
          Members:
          { band && band.UserBands.map((el) => <h3 key={el.id}>{el.User.login}</h3>)}
        </div>
        <div className="band-checkout-demos">
          Checkout our demos
          {' '}
          <Link to="/bands/:id/music">here</Link>
        </div>
        <button type="button" onClick={() => navigate('/bands')}>Move Back</button>
      </div>
    </div>
  );
}

export default BandPage;
