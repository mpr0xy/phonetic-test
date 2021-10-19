import React from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const { day } = useParams();
  return (
    <div>{day}</div>
  );
};

export default Detail;
