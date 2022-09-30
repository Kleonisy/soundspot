import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Layout from '../Layout';
import MainPage from '../MainPage/MainPage';
import { loadAsyncUsers } from '../../storeAndSlices/Slices/usersReducer';
import { loadAsyncBands } from '../../storeAndSlices/Slices/bandsReducer';
import { loadAsyncSpots } from '../../storeAndSlices/Slices/spotsReducer';
import RootPage from '../RootPage/RootPage';
import UserPage from '../UserPage/UserPage';
import Registraion from '../Registration/Registration';
import Authorization from '../Authorization/Authorization';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAsyncUsers());
    dispatch(loadAsyncBands());
    dispatch(loadAsyncSpots());
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<RootPage />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="signup" element={<Registration />} />
          <Route path="signin" element={<Authorization />} />
          <Route path="/profile" element={<UserPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
