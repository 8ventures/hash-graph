import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './header';
import Chart from './Chart';
import Dropdown from './Dropdown';
import socket from '../services/CoinApiService';

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('apiData', (data) => {
      const uint8Array = new Uint8Array(data);
      const jsonString = new TextDecoder().decode(uint8Array);
      const jsonObject = JSON.parse(jsonString);
      console.log(jsonObject);

      const ohlcData = [
        {
          time: Date.parse(jsonObject.time_period_start) / 1000,
          open: jsonObject.price_open,
          high: jsonObject.price_high,
          low: jsonObject.price_low,
          close: jsonObject.price_close,
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
    });

    return () => {
      socket.off('connect');
      socket.off('apiData');
    };
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header> </Header>
        <div className="container px-5 py-8 mx-auto flex sm:flex-row flex-col">
          WELCOME
        </div>
        <div className="container px-5 py-8 mx-auto flex sm:flex-row flex-col">
          <div className="container px-5 py-8 mx-auto items-center h-full justify-center flex w-1/4">
            <Dropdown> </Dropdown>
          </div>
          <div className="grid  container mx-auto ">
            <div className=" container px-5 py-8 mx-auto my-8 items-center min-h-max justify-center rounded-lg border-solid border-2 border-yellow-400 shadow-2xl">
              <Chart data={chartData}></Chart>
            </div>
            <div className=" container px-5 py-8 mx-auto my-auto items-center min-h-max justify-center rounded-lg border-solid border-2 border-yellow-400 shadow-2xl">
              <Chart data={chartData}></Chart>
            </div>
          </div>
        </div>
        <div className="container px-5 py-8 mx-auto flex h-full sm:flex-row flex-col">
          FAVOURITES
        </div>
        <Footer> </Footer>
      </div>
    </>
  );
};

export default Dashboard;

const colors = {
  backgroundColor: 'white',
  lineColor: '#2962FF',
  textColor: 'black',
  areaTopColor: '#2962FF',
  areaBottomColor: 'rgba(41, 98, 255, 0.28)',
};
