import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { loadAsyncSpot } from '../../storeAndSlices/Slices/spotsReducer';
// import './SpotPage.css';

function SpotPage() {
  const { spot } = useSelector((state) => state.spotsState);
  console.log(spot);
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadAsyncSpot(Number(id)));
  }, []);

  return (
    <div className="spot-page-gallery">
      <div className="spot-page-left">
        <div className="spot-name"><h2>{spot && spot.name}</h2></div>
        <div className="spot-description-header"><h4>Description</h4></div>
        <div className="spot-description">{spot && spot.description}</div>
        <Link to="/spots" className="button-move-back-spots" onClick={() => navigate('/spots')}>Move Back</Link>
      </div>
      <div className="spot-page-right">
        {/* <div className="band-photo"><img className="band-photo-img" src={band && band.photo} alt={band && band.name} /></div>
         */}
        {/* <div className="band-members">
          <h3>Members:</h3>
          { band && band.UserBands.map((el) => <p className="users-band" key={el.id}>{el.User.login}</p>)}
        </div>
        <div className="band-checkout-demos">
          Checkout our demos
          {' '}
          <Link to={`/bands/${band && band.id}/music`} className="band-checkout-demos-link">here</Link>
        </div>
         */}
      </div>
    </div>
  );
}

export default SpotPage;
