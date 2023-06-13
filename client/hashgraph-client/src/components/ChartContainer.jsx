import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import Chart from './Chart';
import Dropdown from './Dropdown';

const ChartContainer = () => {
  const [chartData, setChartData] = useState([]);
  const [exchange, setExchange] = useState('');
  const [instrument, setInstrument] = useState('');
  const [pair, setPair] = useState('');
  const [period, setPeriod] = useState('');
  const [request, setRequest] = useState('');
  const socket = io('http://localhost:3000/');

  const exchangeOptions = ['BINANCE', 'COINBASE', 'BITSTAMP', 'KRAKEN'];
  const instrumentOptions = ['SPOT'];
  const pairOptions = ['BTC_USD', 'ETH_USD'];
  const periodOptions = ['1SEC', '5SEC'];

  const handleSelect = async (value, dropdownType) => {
    switch (dropdownType) {
      case 'Exchange':
        setExchange(value);
        console.log('Selected Exchange: ', value);
        break;
      case 'Instrument':
        setInstrument(value);
        console.log('Selected Instrument: ', value);
        break;
      case 'Pair':
        setPair(value);
        console.log('Selected Pair: ', value);
        break;
      case 'Period':
        setPeriod(value);
        console.log('Selected Period: ', value);
        break;
      default:
        break;
    }
  };

  const handleRequest = () => {
    setChartData([]);
    setRequest(`${exchange}_${instrument}_${pair}`);

    socket.emit('requestData', {
      symbol: `${exchange}_${instrument}_${pair}`,
      interval: period,
    });
  };

  const handleSocketData = (data) => {
    console.log();
    const ohlcData = [
      {
        time: Date.parse(data.time_period_start) / 1000,
        open: data.price_open,
        high: data.price_high,
        low: data.price_low,
        close: data.price_close,
      },
    ];
    setChartData((chartData) => {
      const latestTime = ohlcData[0].time;
      const lastTime =
        chartData.length > 0 ? chartData[chartData.length - 1].time : 0;
      if (latestTime > lastTime) {
        return [...chartData, ...ohlcData];
      } else {
        return chartData;
      }
    });
  };

  useEffect(() => {
    socket.on('apiData', handleSocketData);
    return () => {
      socket.off('apiData', handleSocketData);
    };
  }, []);

  const allSelectionsMade = exchange && instrument && pair && period;

  return (
    <>
      <div className="container px-5 py-8 mx-auto flex sm:flex-row flex-col">
        <div className="container px-5 py-8 mx-auto items-center justify-center flex-column w-1/4 flex-wrap">
          <div className="container px-5 py-8 mx-auto items-center justify-center inline-flex">
            <Dropdown
              options={exchangeOptions}
              onSelect={(value) => handleSelect(value, 'Exchange')}
              name="Exchange"
            ></Dropdown>
          </div>
          <div className="container px-5 py-8 mx-auto items-center justify-center inline-flex">
            <Dropdown
              options={instrumentOptions}
              onSelect={(value) => handleSelect(value, 'Instrument')}
              name="Instrument"
            ></Dropdown>
          </div>
          <div className="container px-5 py-8 mx-auto items-center justify-center inline-flex">
            <Dropdown
              options={pairOptions}
              onSelect={(value) => handleSelect(value, 'Pair')}
              name="Pair"
            ></Dropdown>
          </div>
          <div className="container px-5 py-8 mx-auto items-center justify-center inline-flex ">
            <Dropdown
              options={periodOptions}
              onSelect={(value) => handleSelect(value, 'Period')}
              name="Period"
            ></Dropdown>
          </div>
          <div className="container px-5 py-8 mx-auto items-center justify-center inline-flex ">
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
