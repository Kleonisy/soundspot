import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import './SpotsSearchPage.css';

function SpotsSearchPage() {
  const { spots } = useSelector((store) => store.spotsState);
  const user = useSelector((store) => store.authState.data);
  console.log(user, 'user');
  console.log(spots, 'spots');
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const options = [
    {
      name: 'By name',
      value: 'name',
    },
    {
      name: 'By distance',
      value: 'distance',
    },
  ];

  const sortedPosts = useMemo(() => {
    if (filter.sort && filter.sort === 'name') {
      return [...spots]
        .sort((a, b) => a.dataValues[filter.sort].localeCompare(b.dataValues[filter.sort]));
      // eslint-disable-next-line no-else-return
    } else if (filter.sort && filter.sort === 'distance') {
      const spotsWithCoords = [...spots].map((spot) => (
        {
          ...spot,
          distance: (() =>
            Math.sqrt((user.latitude - spot.dataValues.latitude) ** 2
              + (user.longitude - spot.dataValues.longitude) ** 2))(),
        }
      ));
      console.log(spotsWithCoords, 'spots with coords');
      console.log(filter.sort, 'filter sort');
      return [...spotsWithCoords]
        .sort((a, b) => a[filter.sort] - b[filter.sort]);
    }
    return spots;
  }, [filter.sort, spots]);

  const sortedAndSearchedPosts = useMemo(() =>
    sortedPosts.filter((spot) =>
      spot.name.toLowerCase().includes(filter.query.toLowerCase())), [filter.query, sortedPosts]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    let myMap;
    if (sortedPosts.length && sortedAndSearchedPosts.length) {
      // eslint-disable-next-line no-undef
      ymaps.ready(() => {
        // eslint-disable-next-line no-undef
        if (sortedAndSearchedPosts.length === 1) {
          // eslint-disable-next-line no-undef
          myMap = new ymaps.Map('first_map', {
            center: [
              sortedAndSearchedPosts[0].dataValues.latitude,
              sortedAndSearchedPosts[0].dataValues.longitude],
            zoom: 12
          });
        } else {
          // eslint-disable-next-line no-undef
          myMap = new ymaps.Map('first_map', {
            center: [59.94, 30.32],
            zoom: 12
          });
        }
        const spotsArray = sortedAndSearchedPosts.map((spot) => (
          // eslint-disable-next-line no-undef
          new ymaps.Placemark([spot.dataValues.latitude, spot.dataValues.longitude],
            {
              iconCaption: spot.dataValues.name,
              balloonContentHeader: spot.dataValues.name,
              balloonContentBody: [
                spot.dataValues.description,
                `<br>See <a href="http://localhost:3000/spots/${spot.dataValues.id}">more...</a>`
              ].join(''),
            },
            {
              preset: 'islands#blackStarCircleIcon',
            }
          )
        ));
        // eslint-disable-next-line no-undef
        const objects = ymaps.geoQuery(spotsArray);
        objects.searchInside(myMap).addToMap(myMap);

        myMap.events.add('boundschange', () => {
          const visibleObjects = objects.searchInside(myMap).addToMap(myMap);
          objects.remove(visibleObjects).removeFromMap(myMap);
        });
      });
      return () => {
        myMap.destroy();
      };
    }
  }, [sortedPosts, sortedAndSearchedPosts]);

  return (
    <div className="soundSpot__spotsSearch-container">
      <div className="soundSpot_spotsSearch-input-sort-container">
        <input value={filter.query} onChange={(event) => setFilter({ ...filter, query: event.target.value })} placeholder="Search..." />
        <select
          value={filter.sort}
          onChange={(event) => setFilter({ ...filter, sort: event.target.value })}
        >
          <option
            disabled
            value=""
          >
            Sort by...
          </option>
          {
            options.map((option) =>
              (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))
          }
        </select>
      </div>
      <div className="soundSpot__spotsSearch_content-container">
        <div className="soundSpot__spotsSearch_results-container">
          {
            sortedAndSearchedPosts.map((spot) => (
              <div className="soundSpot__spotRow">
                <div className="soundSpot__spotRow-title" key={spot.id}>{spot.name}</div>
                <div className="soundSpot__spotRow-description">
                  {spot.dataValues.address}
                </div>
              </div>
            ))
          }
        </div>
        <div className="soundSpot__spotsSearch_yandex-container">
          <div style={{ width: '640px', height: '200px' }} className="soundSpot__spotsSearch_myMap" id="first_map" />
        </div>
      </div>
    </div>
  );
}

export default SpotsSearchPage;
