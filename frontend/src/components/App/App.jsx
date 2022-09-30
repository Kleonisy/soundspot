import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Layout from '../Layout';
import { loadAsyncUsers } from '../../storeAndSlices/Slices/usersReducer';
import { loadAsyncBands } from '../../storeAndSlices/Slices/bandsReducer';
import { loadAsyncSpots } from '../../storeAndSlices/Slices/spotsReducer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAsyncUsers());
    dispatch(loadAsyncBands());
    dispatch(loadAsyncSpots());
  }, []);

  return (
    // <div className="App">
    <Routes>
      <Route path="/" element={<Layout />} />
    </Routes>
    // </div>
  );
}

export default App;
