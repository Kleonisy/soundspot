import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Layout from '../Layout';
import MainPage from '../MainPage/MainPage';
import { loadAsyncUsers } from '../../storeAndSlices/Slices/usersReducer';
import { loadAsyncBands } from '../../storeAndSlices/Slices/bandsReducer';
import { loadAsyncSpots } from '../../storeAndSlices/Slices/spotsReducer';
import UserPage from '../UserPage/UserPage';
import Registration from '../Registration/Registration';
import Authorization from '../Authorization/Authorization';
import { loadUser } from '../../storeAndSlices/Slices/authReducer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadAsyncUsers());
    dispatch(loadAsyncBands());
    dispatch(loadAsyncSpots());
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route path="/home" element={<HomePage />} /> */}
          <Route path="signup" element={<Registration />} />
          <Route path="signin" element={<Authorization />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/profile" element={<UserPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
