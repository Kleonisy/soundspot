import React from 'react';
import { useSelector } from 'react-redux';
import './SpotsSearchPage.css';

function SpotsSearchPage() {
  const { spots } = useSelector((store) => store.spotsState);
  if (spots.length) {
    let myMap;

    // eslint-disable-next-line no-undef
    ymaps.ready(() => {
      // eslint-disable-next-line no-undef
      myMap = new ymaps.Map('first_map', {
        center: [59.94, 30.32],
        zoom: 12
      });
      const spotsArray = spots.map((spot) => (
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
  }

  return (
    <div className="soundSpot__spotsSearch-container">
      <input placeholder="Search..." />
      <div className="soundSpot__spotsSearch_content-container">
        <div className="soundSpot__spotsSearch_results-container">
          {
            spots.map((spot) => <div key={spot.id}>{spot.name}</div>)
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
