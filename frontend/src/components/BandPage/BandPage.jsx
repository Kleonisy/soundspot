import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAsyncBand } from '../../storeAndSlices/Slices/bandsReducer';

function BandPage() {
  const { band } = useSelector((state) => state.bandsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAsyncBand());
  }, []);

  return (
    <div className="band-page">
      <div className="band-page-left">
        <div className="band-name">{band.name}</div>
        <div className="band-photo">{band.photo}</div>
        <div className="band-about">{band.about}</div>
      </div>
      <div className="band-page-right">
        <div className="band-members">
          Members
          { }
        </div>
        <div className="band-checkout-demos">
          Checkout our demos
          <Link />
        </div>
        <button>Move Back</button>
      </div>
    </div>
  );
}

export default BandPage;
