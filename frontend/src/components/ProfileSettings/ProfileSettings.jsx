import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import './ProfileSettings.css';

function ProfileSettings() {
  const { data: user, helpMessage} = useSelector((state) => state.authState);


  const [form, setForm] = useState(false);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  function changeSubmit(event) {
    event.preventDefault();
    const changeData = {
      id: user.id,
      login: event.target.changeLogin.value,
      email: event.target.changeEmail.value,
      password: event.target.changePassword.value,
    };
   dispatch(changeProfile(changeData));
  }

  //   useEffect(() => {
  //     if (!hasUser) {
  //       navigate('/home');
  //     }
  //   }, [hasUser, navigate]);
  return (

    <div className="profile-settings-gallery">
      <div className="profile-settings">
        <form onSubmit={changeSubmit}>
          <div className="prof-set-inputs">
            <input className="prof-settings-input" type="text" name="changeLogin" placeholder="login" autoComplete="off" value={user.login} />
            <input className="prof-settings-input" type="email" name="changeEmail" placeholder="email" autoComplete="off" value={user.email} />
            <input className="prof-settings-input" type="password" name="changePassword" placeholder="change password" autoComplete="off" />
          </div>
          <button className="prof-settings-button" type="submit">Edit profile</button>
        </form>
        <div className="reg-message">
          {helpMessage && <div className="help-text">{helpMessage}</div>}
        </div>
      </div>

      <div className="change-location">
        <img src="http://www.hellopiter.ru/image/ssdhhhsjasdq.jpg" alt="1" width={350} height={400} />
      </div>
      <div className="editphoto">
        {user && (
        <div className="user-img-container">
          <img className="user-img" src={user.photo} alt={user.login} />
        </div>
        )}
        <button className="edit-photo-button" type="button" onClick={() => setForm(!form)}>Edit photo</button>
        {form && (
        <div>
          <form className="update-photo-form">
            <input type="text" name="updatephoto" className="upd-photo-input" placeholder="add photo here" autoComplete="off" />
            <button type="submit">Update photo</button>
          </form>
        </div>
        )}
      </div>
    </div>
  );
}

export default ProfileSettings;
