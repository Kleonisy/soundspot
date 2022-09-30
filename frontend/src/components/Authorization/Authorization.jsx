import React from 'react';

function Authorization() {
  return (
    <div>
      <form action="/" type="submit">
        <input type="email" name="logEmail" placeholder="email" />
        <input type="password" name="logPassword" placeholder="password" />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Authorization;
