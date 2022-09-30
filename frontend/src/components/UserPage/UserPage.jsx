import React from 'react';

function UserPage() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  console.log(user);
  return (
    <div>
      <h2>Varg Vikernes</h2>
      <div>
        <h4>dd</h4>
      </div>
    </div>
  );
}

export default UserPage;
