import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import './ProfileSettings.css';

function ProfileSettings() {
  const { data: user } = useSelector((state) => state.authState);
  const [form, setForm] = useState(false);
  // const navigate = useNavigate();

  //   useEffect(() => {
  //     if (!hasUser) {
  //       navigate('/home');
  //     }
  //   }, [hasUser, navigate]);
  return (
    <div className="profile-settings-gallery">
      <form className="profile-settings">
        <div className="prof-set-inputs">
          <input className="prof-settings-input" type="text" name="regLogin" placeholder="login" autoComplete="off" />
          <input className="prof-settings-input" type="email" name="regEmail" placeholder="email" autoComplete="off" />
          <input className="prof-settings-input" type="password" name="regPassword" placeholder="password" autoComplete="off" />
        </div>
        <button className="prof-settings-button" type="submit">Edit profile</button>
      </form>

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
