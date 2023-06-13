import React from 'react';

const Favorite = ({ symbol, period }) => {
  const handleClick = () => {
    console.log(`Clicked on ${symbol} - ${period}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col bg-yellow-200 m-2 p-2 rounded-lg cursor-pointer justify-center items-center"
    >
      <div className="text-sm font-bold text-gray-800">{symbol}</div>
      <div className="text-xs text-gray-500">{period}</div>
    </div>
  );
};

const FavoritesList = ({ favorites }) => {
  return (
    <div className="overflow-auto	">
      {favorites.length > 0 ? (
        <div style={{ display: 'flex' }}>
          {favorites.map((favorite, index) => (
            <Favorite
              key={index}
              symbol={favorite.symbol}
              period={favorite.interval}
            />
          ))}
        </div>
      ) : (
        <p>No favorites found.</p>
      )}
    </div>
  );
};

export default FavoritesList;
