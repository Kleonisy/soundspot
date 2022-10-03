import React, { useState, useEffect } from 'react';
import StarsRating from 'react-star-rate';

function Rating() {
  const [rating, setRating] = useState(0);

  useEffect(() => {

  }, []);

  return (
    <StarsRating
      value={rating}
      onChange={(value) => {
        setRating(value);
      }}
    />
  );
}

export default Rating;
