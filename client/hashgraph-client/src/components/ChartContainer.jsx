import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { StarIcon } from '@heroicons/react/solid';
import apiService from '../services/ApiService';

import Chart from './Chart';
import Dropdown from './Dropdown';

const ChartContainer = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [chartData, setChartData] = useState([]);
  const [exchange, setExchange] = useState('');
  const [instrument, setInstrument] = useState('');
  const [pair, setPair] = useState('');
  const [period, setPeriod] = useState('');
  const [symbol, setSymbol] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const exchangeOptions = ['BINANCE', 'COINBASE', 'BITSTAMP', 'KRAKEN'];
  const instrumentOptions = ['SPOT'];
  const pairOptions = ['BTC_USD', 'ETH_USD'];
  const periodOptions = ['1SEC', '5SEC'];

  const getUser = async () => {
    const getUser = await apiService.getUser();
    const getUserResponse = await getUser.json();
    dispatch({ type: 'SET_USER', payload: getUserResponse });
    return getUserResponse;
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
    if (isFavorite) {
      await apiService.removeFavorite(symbol, period);
    } else {
      await apiService.addFavorite(symbol, period);
    }
    getUser();
  };

  const handleRequest = () => {
    // setChartData([]);
    // setRequest(`${exchange}_${instrument}_${pair}`);
    // socket.emit('requestData', {
    //   symbol: `${exchange}_${instrument}_${pair}`,
    //   interval: period,
    // });
  };

  const handleSocketData = (data) => {
    // console.log();
    // const ohlcData = [
    //   {
    //     time: Date.parse(data.time_period_start) / 1000,
    //     open: data.price_open,
    //     high: data.price_high,
    //     low: data.price_low,
    //     close: data.price_close,
    //   },
    // ];
    // setChartData((chartData) => {
    //   const latestTime = ohlcData[0].time;
    //   const lastTime =
    //     chartData.length > 0 ? chartData[chartData.length - 1].time : 0;
    //   if (latestTime > lastTime) {
    //     return [...chartData, ...ohlcData];
    //   } else {
    //     return chartData;
    //   }
    // });
  };

  useEffect(() => {
    // socket.on('apiData', handleSocketData);
    // return () => {
    //   socket.off('apiData', handleSocketData);
    // };
  }, []);

  useEffect(() => {
    const isFavorite = user.favorites.find(
      (favorite) => favorite.symbol === symbol && favorite.interval === period
    );
    setIsFavorite(isFavorite);
    console.log('isFavorite: ', isFavorite);
  }, [symbol, period, user.favorites]);

  const allSelectionsMade = exchange && instrument && pair && period;

  return (
    <>
      <div className="container px-5 py-8 mx-auto flex sm:flex-row flex-col">
        <div className="px-5 py-8 mx-auto items-center justify-center flex-column w-full sm:w-1/4 flex-wrap">
          <div className="px-5 py-8 mx-auto items-center justify-center inline-flex w-full">
            <Dropdown
              options={exchangeOptions}
              onSelect={(value) => handleSelect(value, 'Exchange')}
              onChange={handleSelect}
              name="Exchange"
            ></Dropdown>
          </div>
          <div className="px-5 py-8 mx-auto items-center justify-center inline-flex w-full">
            <Dropdown
              options={instrumentOptions}
              onSelect={(value) => handleSelect(value, 'Instrument')}
              onChange={handleSelect}
              name="Instrument"
            ></Dropdown>
          </div>
          <div className="px-5 py-8 mx-auto items-center justify-center inline-flex w-full">
            <Dropdown
              options={pairOptions}
              onSelect={(value) => handleSelect(value, 'Pair')}
              onChange={handleSelect}
              name="Pair"
            ></Dropdown>
          </div>
          <div className="px-5 py-8 mx-auto items-center justify-center inline-flex w-full">
            <Dropdown
              options={periodOptions}
              onSelect={(value) => handleSelect(value, 'Period')}
              onChange={handleSelect}
              name="Period"
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
