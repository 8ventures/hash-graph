import React from 'react';
import Footer from './Footer';
import Header from './header';
import Chart from './Chart';

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header> </Header>
        <div className="container px-5 py-8 mx-auto flex sm:flex-row flex-col">
          WELCOME
        </div>
        <div className="container px-5 py-8 mx-auto flex sm:flex-row flex-col">
          <div className="container px-5 py-8 mx-auto items-center h-full justify-center flex w-1/4">
            SELECT PAIR
          </div>
          <div className="container px-5 py-8 mx-auto my-auto items-center h-fit justify-center">
            <Chart data={initialData} colors={colors}></Chart>
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
1;

const initialData = [
  { time: '2018-12-22', value: 32.51 },
  { time: '2018-12-23', value: 31.11 },
  { time: '2018-12-24', value: 27.02 },
  { time: '2018-12-25', value: 27.32 },
  { time: '2018-12-26', value: 25.17 },
  { time: '2018-12-27', value: 28.89 },
  { time: '2018-12-28', value: 25.46 },
  { time: '2018-12-29', value: 23.92 },
  { time: '2018-12-30', value: 22.68 },
  { time: '2018-12-31', value: 22.67 },
];

const colors = {
  backgroundColor: 'white',
  lineColor: '#2962FF',
  textColor: 'black',
  areaTopColor: '#2962FF',
  areaBottomColor: 'rgba(41, 98, 255, 0.28)',
};
