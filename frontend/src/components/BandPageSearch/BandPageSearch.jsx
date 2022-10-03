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
import './BandPageSearch.css';
import { loadAsyncBands, updateAsyncBandsList } from '../../storeAndSlices/Slices/bandsReducer';

function BandPageSearch() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { bands, genres } = useSelector((store) => store.bandsState);
  const [filtersGenre, setFiltersGenre] = useState([]);
  const [orderByName, setOrderByName] = useState(false);
  const [inputText, setInputText] = useState('');

  const handleGenreFilter = (e) => {
    const copy = [...filtersGenre];
    copy[(+e.target.id) - 1] = !copy[(+e.target.id) - 1];
    setFiltersGenre(copy);
  };

  const handleSearchInput = (e) => {
    const input = e.target.value.trim();
    setInputText(input);
  };

  const handleOrderByName = () => {
    setOrderByName((prev) => !prev);
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
    document.querySelectorAll('.genreFilter').forEach((btn, i) => filtersGenre[i]
      ? btn.className = 'btn btn-danger genreFilter'
      : btn.className = 'btn btn-outline-danger genreFilter');
    dispatch(updateAsyncBandsList({ filtersGenre, orderByName, inputText }));
  }, [filtersGenre, orderByName, inputText]);

  useEffect(() => () => dispatch(loadAsyncBands()), [location]);

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
          <Dropdown.Item as="button" onClick={handleOrderByName}>{orderByName ? '+ Name' : '- Name'}</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      <div className="searchContainer">
        <div className="artistsList">
          {bands
            ? bands.map((band) => (
              <>
                <div key={band.id} className="stringOnSearchPage">
                  <Image roundedCircle className="d-block w-100 searchImage" src={band.photo} alt={band.name} />
                  <div className="bandinfoOnSearchPage">
                    <div className="bandinfoTop">
                      {inputText
                    && (
                    <pre>
                      {' '}
                      {highLight(inputText, band.name)}
                    </pre>
                    )}
                      {!inputText && (
                      <pre>
                        {' '}
                        {band.name}
                      </pre>
                      )}
                    </div>
                    <div className="bandinfoBottom">
                      {band.extraStuff.hisGenres.length ? (
                        <pre>
                          {' '}
                          {band.extraStuff.hisGenres.join(', ')}
                        </pre>
                      ) : ' '}
                    </div>
                  </div>
                </div>
                <br />
              </>
            ))
            : (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
        </div>
        <div className="tagsContainer">
          <div className="genresTags">
            {genres
              ? genres.map((genre) =>
                <button id={genre.id} type="button" key={genre.id} onClick={handleGenreFilter} className="btn btn-outline-danger genreFilter">{genre.genre}</button>)
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BandPageSearch;
