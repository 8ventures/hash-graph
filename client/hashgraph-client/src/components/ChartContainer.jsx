import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import io from 'socket.io-client';
import { StarIcon } from '@heroicons/react/solid';
import apiService from '../services/ApiService';
import fetchOHLCVData from '../services/CoinApiService';

import Chart from './Chart';
import Dropdown from './Dropdown';

const ChartContainer = () => {
  const user = useSelector((state) => state.auth.user);
  const favorite = useSelector((state) => state.auth.favorite);
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState([]);
  const [exchange, setExchange] = useState('');
  const [instrument, setInstrument] = useState('');
  const [pair, setPair] = useState('');
  const [period, setPeriod] = useState('');
  const [symbol, setSymbol] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);

  const exchangeOptions = ['COINBASE', 'BITSTAMP', 'KRAKEN'];
  const instrumentOptions = ['SPOT'];
  const pairOptions = ['BTC_USD', 'ETH_USD'];
  const periodOptions = ['1SEC', '5SEC', '10SEC', '15SEC', '30SEC', '1MIN'];

  const getUser = async () => {
    try {
      const response = await apiService.getUser();
      const userResponse = await response.json();
      dispatch({ type: 'SET_USER', payload: userResponse });
      return userResponse;
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleSelect = async (value, dropdownType) => {
    switch (dropdownType) {
      case 'Exchange':
        setExchange(value);
        setSymbol(`${value}_${instrument}_${pair}`);
        break;
      case 'Instrument':
        setInstrument(value);
        setSymbol(`${exchange}_${value}_${pair}`);
        break;
      case 'Pair':
        setPair(value);
        setSymbol(`${exchange}_${instrument}_${value}`);
        break;
      case 'Period':
        setPeriod(value);
        break;
      default:
        break;
    }
  };

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        await apiService.removeFavorite(symbol, period);
      } else {
        await apiService.addFavorite(symbol, period);
      }
      getUser();
    } catch (error) {
      console.error('Error handling favorite:', error);
    }
  };

  // useEffect(() => {
  //   const socket = io('http://localhost:3000');

  //   socket.on('connect', () => {
  //     console.log('Connected to server');
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('Disconnected from server');
  //   });

  //   socket.on('message', (data) => {
  //     // handleSocketData(data);
  //   });

  //   return () => {
  //     socket.off('message');
  //   };
  // }, []);

  const handleRequest = async () => {
    const payload = {
      symbol: `${exchange}_${instrument}_${pair}`,
      interval: period,
    };
    try {
      const message = await fetchOHLCVData(symbol, period);
      console.log('message', message);
      handleSocketData(message);
      setFetchingData(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSocketData = (data) => {
    data.sort(
      (a, b) => new Date(a.time_period_start) - new Date(b.time_period_start)
    );

    const transformedData = data.map((item) => {
      return {
        open: item.price_open,
        high: item.price_high,
        low: item.price_low,
        close: item.price_close,
        time: new Date(item.time_close).getTime() / 1000, // Convert ISO date string to Unix timestamp
      };
    });

    // console.log('ohlcData', transformedData);
    setChartData(transformedData);
  };

  useEffect(() => {
    const isFavorite = user.favorites.some(
      (favorite) => favorite.symbol === symbol && favorite.interval === period
    );
    setIsFavorite(isFavorite);
  }, [symbol, period, user.favorites]);

  useEffect(() => {
    const isFavorite = user.favorites.some(
      (favorite) =>
        favorite.symbol === favorite.symbol &&
        favorite.interval === favorite.period
    );
    setIsFavorite(isFavorite);
    if (favorite) {
      const symbolParts = favorite.symbol.split('_');
      setExchange(symbolParts[0]);
      setInstrument(symbolParts[1]);
      setPair(`${symbolParts[2]}_${symbolParts[3]}`);
      setPeriod(favorite.period);
      setSymbol(favorite.symbol);
    }
  }, [favorite]);

  useEffect(() => {
    let intervalId;

    if (fetchingData) {
      intervalId = setInterval(() => {
        handleRequest();
      }, 10000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchingData]);

  const allSelectionsMade = exchange && instrument && pair && period;

  return (
    <>
      <div className="container px-5 py-0 mx-auto flex sm:flex-row flex-col">
        <div className="px-5 py-8 mx-auto items-center justify-center flex-column w-full sm:w-1/4 flex-wrap">
          <div className="px-5 py-8 mx-auto items-center justify-center inline-flex w-full">
            <Dropdown
              options={exchangeOptions}
              onSelect={(value) => handleSelect(value, 'Exchange')}
              onChange={handleSelect}
              name={exchange ? exchange : 'Exchange'}
            ></Dropdown>
          </div>
          <div className="px-5 py-8 mx-auto items-center justify-center inline-flex w-full">
            <Dropdown
              options={instrumentOptions}
              onSelect={(value) => handleSelect(value, 'Instrument')}
              onChange={handleSelect}
              name={instrument ? instrument : 'Instrument'}
            ></Dropdown>
          </div>
          <div className="px-5 py-8 mx-auto items-center justify-center inline-flex w-full">
            <Dropdown
              options={pairOptions}
              onSelect={(value) => handleSelect(value, 'Pair')}
              onChange={handleSelect}
              name={pair ? pair : 'Pair'}
            ></Dropdown>
          </div>
          <div className="px-5 py-8 mx-auto items-center justify-center inline-flex w-full">
            <Dropdown
              options={periodOptions}
              onSelect={(value) => handleSelect(value, 'Period')}
              onChange={handleSelect}
              name={period ? period : 'Period'}
            ></Dropdown>
          </div>
          <div className="px-5 py-8 mx-auto items-center justify-center inline-flex w-full">
            <button
              className={`inline-flex w-full items-center justify-center bg-yellow-400 border-0 py-1 px-5 focus:outline-none hover:bg-yellow-500 rounded text-base font-semibold ${
                !allSelectionsMade
                  ? 'bg-gray-400 opacity-50 cursor-not-allowed hover:bg-gray-400  '
                  : ''
              }`}
              onClick={handleRequest}
              disabled={!allSelectionsMade}
            >
              Request
            </button>
          </div>
          <div className="px-5 py-8 mx-auto items-center justify-center inline-flex w-full">
            <button
              className={`inline-flex w-full items-center justify-center bg-yellow-400 border-0 py-1 px-5 focus:outline-none hover:bg-yellow-500 rounded text-base font-semibold ${
                !allSelectionsMade
                  ? 'bg-gray-400 opacity-50 cursor-not-allowed hover:bg-gray-400  '
                  : ''
              }`}
              onClick={handleFavorite}
              disabled={!allSelectionsMade}
            >
              <StarIcon className="w-5 h-5 mr-2" />{' '}
              {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
            </button>
          </div>
        </div>

        <div className="grid  container mx-auto ">
          <div className=" container px-5 py-8 mx-auto my-8 items-center min-h-max justify-center rounded-lg border-solid border-2 border-yellow-400 shadow-2xl">
            <Chart data={chartData}></Chart>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartContainer;
