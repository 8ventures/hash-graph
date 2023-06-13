import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './header';
import ChartContainer from './ChartContainer';
import Dropdown from './Dropdown';
import socket from '../services/CoinApiService';
import apiService from '../services/ApiService';

const Dashboard = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const getUser = async () => {
    const getUser = await apiService.getUser();
    const getUserResponse = await getUser.json();
    const user = {
      username: getUserResponse.username,
      email: getUserResponse.email,
      firstName: getUserResponse.firstName,
      lastName: getUserResponse.lastName,
    };
    setUser(user);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getUser();
    }
    if (!isAuthenticated) {
      navigate('./not-authenticated');
    }
  }, []);

  if (isAuthenticated) {
    return (
      <>
        <div className="flex flex-col h-screen">
          <Header> </Header>
          <div className=" container px-5 py-8 mx-auto flex sm:flex-row flex-col h-full flex-grow justify-center align-middle">
            <span className=" text-2xl font-bold mr-1	">
              {' '}
              🚀 {user.firstName}
            </span>
            <span className=" text-2xl font-bold text-yellow-500  ">
              {user.lastName}
            </span>
            <div className="text-2xl font-bold ml-2">FAVOURITES</div>
          </div>
          <ChartContainer> </ChartContainer>
          <Footer> </Footer>
        </div>
      </>
    );
  }
};

export default Dashboard;

// <div className="container px-5 py-8 mx-auto flex sm:flex-row flex-col">
// <div className="container px-5 py-8 mx-auto items-center h-full justify-center flex w-1/4">
//   <Dropdown> </Dropdown>
// </div>
// <div className="grid  container mx-auto ">
//   <div className=" container px-5 py-8 mx-auto my-8 items-center min-h-max justify-center rounded-lg border-solid border-2 border-yellow-400 shadow-2xl">
//     <Chart data={chartData}></Chart>
//   </div>
//   <div className=" container px-5 py-8 mx-auto my-auto items-center min-h-max justify-center rounded-lg border-solid border-2 border-yellow-400 shadow-2xl">
//     <Chart data={chartData}></Chart>
//   </div>
// </div>

// </div>
