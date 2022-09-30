import React from 'react';
import { useSelector } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import Spinner from 'react-bootstrap/Spinner';

function MainPage() {
  const { users } = useSelector((store) => store.usersState);
  const { bands } = useSelector((store) => store.bandsState);
  const { spots } = useSelector((store) => store.spotsState);

  return (
    <div className="mainPageContainer">
      <Carousel>
        {users
          ? users.map((user) => (
            <Carousel.Item key={user.id}>
              <img className="d-block w-100" src={user.photo} alt={user.email} />
              <Carousel.Caption>
                <h3>{user.login}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))
          : (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
      </Carousel>
      <Carousel>
        {bands
          ? bands.map((band) => (
            <Carousel.Item key={band.id}>
              <img className="d-block w-100" src={band.photo} alt={band.name} />
              <Carousel.Caption>
                <h3>{band.name}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))
          : (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
      </Carousel>
      <Carousel>
        {spots
          ? users.map((spot) => (
            <Carousel.Item key={spot.id}>
              <img className="d-block w-100" src={spot.photo} alt={spot.name} />
              <Carousel.Caption>
                <h3>{spot.name}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))
          : (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
      </Carousel>
    </div>
  );
}

export default MainPage;
