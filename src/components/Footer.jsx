import React from 'react';

const Footer = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  return (
    <div>
      <p>Il Meteo Di Marco</p>
      <p>Data: {day}/{month}/{year}</p>
      <p>Orario: {hours}:{minutes}:{seconds}</p>
    </div>
  );
};

export default Footer;
