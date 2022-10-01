/* eslint-disable no-return-assign */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import './ArtistPageSearch.css';
import { loadAsyncUsers, updateAsyncUsersList } from '../../storeAndSlices/Slices/usersReducer';

function ArtistPageSearch() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { users, instruments } = useSelector((store) => store.usersState);
  const [filters, setFilters] = useState([]);

  const handleInstrumentFilter = (e) => {
    const copy = [...filters];
    copy[(+e.target.id) - 1] = !copy[(+e.target.id) - 1];
    setFilters(copy);
  };

  useEffect(() => {
    document.querySelectorAll('.instrumentFilter').forEach((btn, i) => filters[i]
      ? btn.className = 'btn btn-secondary instrumentFilter'
      : btn.className = 'btn btn-outline-secondary instrumentFilter');
    dispatch(updateAsyncUsersList(filters));
  }, [filters]);

  useEffect(() => () => dispatch(loadAsyncUsers()), [location]);

  return (
    <div>
      <InputGroup className="mb-3">
        <Form.Control aria-label="Text input with dropdown button" />

        <DropdownButton
          variant="outline-secondary"
          title="Dropdown"
          id="input-group-dropdown-2"
          align="end"
        >
          <Dropdown.Item href="#">Action</Dropdown.Item>
          <Dropdown.Item href="#">Another action</Dropdown.Item>
          <Dropdown.Item href="#">Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#">Separated link</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      <div className="searchContainer">
        <div className="artistsList">
          {users
            ? users.map((user) => (
              <div key={user.id} className="stringOnSearchPage">
                <Image roundedCircle className="d-block w-100 searchImage" src={user.photo} alt={user.email} />
                <pre>{user.login}</pre>
              </div>
            ))
            : (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
        </div>
        <div className="tagsContainer">
          <div className="instrumentsTags">
            {instruments
              ? instruments.map((instrument) =>
                <button id={instrument.id} type="button" key={instrument.id} onClick={handleInstrumentFilter} className="btn btn-outline-secondary instrumentFilter">{instrument.instrument}</button>)
              : null}
          </div>
          <div className="genresTags">
            {/* <Button variant="secondary">Secondary</Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistPageSearch;
