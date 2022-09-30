import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, disableHelpMessage } from '../../storeAndSlices/Slices/authSlice';

function Authorization() {
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.user.isUser);
  const helpMessage = useSelector((state) => state.user.helpMessage);
  const navigate = useNavigate();

  // Удаление helpMessage при размонтировании компонента

  useEffect(
    () => () => {
      dispatch(disableHelpMessage());
    },
    [dispatch],
  );

  function loginSubmit(event) {
    event.preventDefault();
    const data = {
      email: event.target.logEmail.value,
      password: event.target.logPassword.value,
    };
    dispatch(loginUser(data));
  }

  useEffect(() => {
    if (isUser) {
      navigate('/');
    }
  }, [isUser, navigate]);

  return (
    <div>
      <form onSubmit={loginSubmit}>
        <input type="email" name="logEmail" placeholder="email" />
        <input type="password" name="logPassword" placeholder="password" />
        {helpMessage && <div className="helpText">{helpMessage}</div>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Authorization;
