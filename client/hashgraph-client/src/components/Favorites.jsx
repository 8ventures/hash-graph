import React from 'react';

const Favorite = ({ symbol, period }) => {
  const handleClick = () => {
    // Handle click logic for the favorite item
    console.log(`Clicked on ${symbol} - ${period}`);
  };

  return (
    <div onClick={handleClick}>
      {symbol} - {period}
    </div>
  );
};

const FavoritesList = ({ favorites }) => {
  return (
    <div style={{ overflowX: 'auto', width: '100%' }}>
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
