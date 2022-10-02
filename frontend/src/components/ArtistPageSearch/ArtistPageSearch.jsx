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
  const [orderByRating, setOrderByRating] = useState(false);
  const [orderByName, setOrderByName] = useState(false);
  const [inputText, setInputText] = useState('');

  const handleInstrumentFilter = (e) => {
    const copy = [...filters];
    copy[(+e.target.id) - 1] = !copy[(+e.target.id) - 1];
    setFilters(copy);
  };

  const handleSearchInput = (e) => {
    const input = e.target.value.trim();
    setInputText(input);
  };

  const handleOrderByRating = () => {
    setOrderByRating((prev) => !prev);
    setOrderByName(false);
  };

  const handleOrderByName = () => {
    setOrderByName((prev) => !prev);
    setOrderByRating(false);
  };

  const highLight = (search, string) => {
    if (!search) return string;
    const regexp = new RegExp(`${search}`, 'ig');
    const matchValues = string.match(regexp);
    if (matchValues) {
      return string.split(regexp).map((str, ind, arr) => {
        const match = matchValues.shift();
        if (ind < arr.length - 1) {
          return (
            <>
              {str}
              <span className="yellowBack">{match}</span>
            </>
          );
        }
        return str;
      });
    }
    return string;
  };

  useEffect(() => {
    document.querySelectorAll('.instrumentFilter').forEach((btn, i) => filters[i]
      ? btn.className = 'btn btn-secondary instrumentFilter'
      : btn.className = 'btn btn-outline-secondary instrumentFilter');
    dispatch(updateAsyncUsersList({ filters, orderByRating, orderByName, inputText }));
  }, [filters, orderByRating, orderByName, inputText]);

  useEffect(() => () => dispatch(loadAsyncUsers()), [location]);

  return (
    <div>
      <InputGroup className="mb-3">
        <Form.Control onChange={handleSearchInput} value={inputText} aria-label="Text input with dropdown button" placeholder="Search..." />

        <DropdownButton
          variant="outline-secondary"
          title="Order by..."
          id="input-group-dropdown-2"
          align="end"
        >
          <Dropdown.Item as="button" onClick={handleOrderByRating}>{orderByRating ? '+ Rating' : '- Rating'}</Dropdown.Item>
          <Dropdown.Item as="button" onClick={handleOrderByName}>{orderByName ? '+ Name' : '- Name'}</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      <div className="searchContainer">
        <div className="artistsList">
          {users
            ? users.map((user) => (
              <div key={user.id} className="stringOnSearchPage">
                <Image roundedCircle className="d-block w-100 searchImage" src={user.photo} alt={user.email} />
                {inputText
                && (
                <pre>
                  {highLight(inputText, user.login)}
                </pre>
                )}
                {!inputText && <pre>{user.login}</pre>}
                {user.extraStuff.hisInstruments.length && (
                  <pre>
                    {' ('}
                    {user.extraStuff.hisInstruments.join(', ')}
                    {') '}
                  </pre>
                )}
                {user.extraStuff.averageRating && (
                <pre>
                  {' '}
                  {+(user.extraStuff.averageRating).toFixed(2)}
                  {' / '}
                  {user.extraStuff.numberOfVoters}
                </pre>
                )}
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
            {/* Tags for Genres */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistPageSearch;
