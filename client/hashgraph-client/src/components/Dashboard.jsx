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
          <div className=" container px-5 py-0 mx-auto flex flex-row h-full justify-center align-middle">
            <span className=" text-2xl font-bold mr-1	">
              {' '}
              🚀 {user.firstName}
            </span>
            <span className=" text-2xl font-bold text-yellow-500  ">
              {user.lastName}
            </span>
          </div>
          <div className=" container px-5 py-6 mx-auto my-8 items-center min-h-max justify-center rounded-lg border-solid border-2 border-yellow-400 shadow-2xl">
            <FavoritesList favorites={user.favorites}> </FavoritesList>
          </div>

          <ChartContainer> </ChartContainer>
          <Footer> </Footer>
        </div>
      </>
    );
  }
};

export default Dashboard;
