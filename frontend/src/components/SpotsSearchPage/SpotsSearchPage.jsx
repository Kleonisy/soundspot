import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import './SpotsSearchPage.css';

function SpotsSearchPage() {
  const { spots } = useSelector((store) => store.spotsState);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const options = [
    {
      name: 'By name',
      value: 'name',
    },
    {
      name: 'By distance',
      value: ['latitude', 'longitude'],
    },
  ];

  const sortedAndSearchedPosts = useMemo(() =>
    spots.filter((spot) =>
      spot.name.toLowerCase().includes(filter.query.toLowerCase())), [filter.query, spots]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    let myMap;
    if (spots.length && sortedAndSearchedPosts.length) {
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
  }, [spots, sortedAndSearchedPosts]);

  return (
    <div className="soundSpot__spotsSearch-container">
      <input value={filter.query} onChange={(event) => setFilter({ ...filter, query: event.target.value })} placeholder="Search..." />
      <select
        value={filter.query}
        onChange={(event) => setFilter({ ...filter, sort: event.target.value })}
      >
        <option
          disabled
          value={filter.sort}
          onChange={((selectedSort) =>
            setFilter({ ...filter, sort: selectedSort }))}
        >
          Sort
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
      <div className="soundSpot__spotsSearch_content-container">
        <div className="soundSpot__spotsSearch_results-container">
          {
            sortedAndSearchedPosts.map((spot) => <div key={spot.id}>{spot.name}</div>)
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
