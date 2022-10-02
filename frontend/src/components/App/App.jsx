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
import Registration from '../Registration/Registration';
import Authorization from '../Authorization/Authorization';
import ArtistPageSearch from '../ArtistPageSearch/ArtistPageSearch';
import { loadUser } from '../../storeAndSlices/Slices/authReducer';
import UserDemo from '../UserDemo/UserDemo';

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
          <Route path="/" element={<RootPage><Registration /></RootPage>} />
          <Route path="/signup" element={<RootPage><Registration /></RootPage>} />
          <Route path="/signin" element={<RootPage><Authorization /></RootPage>} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/artists" element={<ArtistPageSearch />} />
          <Route path="/profile" element={<UserPage />} />
          <Route path="/users/:id/demos" element={<UserDemo />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
