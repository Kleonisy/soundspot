import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { regUser, disableHelpMessage } from '../../storeAndSlices/Slices/authSlice';
import './Registration.css';

function Registration() {
  const dispatch = useDispatch();
  const hasUser = useSelector((state) => state.user.hasUser);
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
    if (hasUser) {
      navigate('/');
    }
  }, [hasUser, navigate]);

  return (
    <div className="log-reg-div">
      <div>
        <form className="log-reg-form" onSubmit={regSubmit}>
          <div className="input-flex">
            <input className="log-reg-input" type="text" name="regLogin" placeholder="login" autoComplete="off" />
            <input className="log-reg-input" type="email" name="regEmail" placeholder="email" autoComplete="off" />
            <input className="log-reg-input" type="password" name="regPassword" placeholder="password" autoComplete="off" />
          </div>
          {helpMessage && <div className="helpText">{helpMessage}</div>}
          <button className="log-reg-button" type="submit">Sign Up</button>
        </form>
      </div>
      <div className="sign-in-div">
        <p>Already have an account?</p>
        <a href="/signin">Sign In</a>
      </div>

    </div>
  );
}

export default Registration;
