import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './header';
import ChartContainer from './ChartContainer';
import apiService from '../services/ApiService';
import FavoritesList from './Favorites';

const Dashboard = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    const getUser = await apiService.getUser();
    const getUserResponse = await getUser.json();
    dispatch({ type: 'SET_USER', payload: getUserResponse });
    console.log(user);
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
        <div className="flex flex-col h-full">
          <Header> </Header>
          <div className=" container px-5 py-8 mx-auto flex sm:flex-row flex-col h-full justify-center align-middle">
            <span className=" text-2xl font-bold mr-1	">
              {' '}
              🚀 {user.firstName}
            </span>
            <span className=" text-2xl font-bold text-yellow-500  ">
              {user.lastName}
            </span>
          </div>
          <div className=" container px-5 py-8 mx-auto flex sm:flex-row flex-col h-full flex-grow justify-center align-middle">
            <FavoritesList favorites={user.favorites}> </FavoritesList>
          </div>
        </div>
        <ChartContainer> </ChartContainer>
        <Footer> </Footer>
      </>
    );
  }
};

export default Dashboard;
