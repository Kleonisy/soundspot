import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout';

function App() {
  return (
    // <div className="App">
    <Routes>
      <Route path="/" element={<Layout />} />
    </Routes>
    // </div>
  );
}

export default App;
