import React, { useState, useEffect, useMemo } from 'react';
import StarsRating from 'react-star-rate';

function Rating({ user }) {
  const [rating, setRating] = useState([]);

  const countRating = (data) => {
    console.log(1111);
    const ratingSum = data
      .map((obj) => obj.raiting)
      .reduce((curr, prev) => curr + prev, 0);
    console.log(ratingSum / data.length);
    return ratingSum / data.length;
  };

  const memoRating = useMemo(() => {
    if (user && user.Raitings) {
      countRating(user.Raitings);
      console.log(rating);
    }
    return 0;
  }, [rating]);

  useEffect(() => {
    console.log(rating);

    setRating(memoRating);
  }, [user]);

  return (
    <StarsRating
      count={7}
      value={rating}
      onChange={(value) => {
        setRating(value);
      }}
    />
  );
}

export default Rating;
