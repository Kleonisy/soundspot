import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { regUser, disableHelpMessage } from '../../storeAndSlices/Slices/authSlice';

function Registration() {
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.user.isUser);
  const helpMessage = useSelector((state) => state.user.helpMessage);
  const navigate = useNavigate();

  // удаление helpMessage при размонтировании компонента
  useEffect(() => () => {
    dispatch(disableHelpMessage());
  }, [dispatch]);

  function regSubmit(event) {
    event.preventDefault();
    const data = {
      login: event.target.regLogin.value,
      email: event.target.regEmail.value,
      password: event.target.regPassword.value,
    };
    dispatch(regUser(data));
  }

  useEffect(() => {
    if (isUser) {
      navigate('/');
    }
  }, [isUser, navigate]);

  return (
    <div>
      <div>
        <form onSubmit={regSubmit}>
          <input type="text" name="regLogin" placeholder="login" />
          <input type="email" name="regEmail" placeholder="email" />
          <input type="password" name="regPassword" placeholder="password" />
          {helpMessage && <div className="helpText">{helpMessage}</div>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <p>Already have an account?</p>
      <a href="/auth/log">Sign In</a>
    </div>
  );
}

export default Registration;