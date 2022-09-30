import React from 'react';

function Registration() {
  return (
    <div>
      <div>
        <form action="/" type="submit">
          <input type="text" name="regLogin" placeholder="login" />
          <input type="email" name="regEmail" placeholder="email" />
          <input type="password" name="regPassword" placeholder="password" />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <p>Already have an account?</p>
      <a href="/auth/log">Sign In</a>
    </div>
  );
}

export default Registration;
