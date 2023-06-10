import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authActions';
import logo from '../assets/favicon.svg';
import apiService from '../services/ApiService';

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickRegister = function () {
    navigate('/register');
  };
  const handleClicLogin = function () {
    navigate('/login');
  };
  const handleClickLogout = async function () {
    const response = await apiService.logout();
    const responseBody = await response.text();
    if (response.status === 200) {
      await dispatch(logout());
      navigate('/');
    } else {
      console.log(responseBody);
    }
  };
  const handleClickLogo = function () {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };
  const handleClicDashboard = function () {
    navigate('/dashboard');
  };

  useEffect(() => {
    console.log('User is authenticated: ', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <header className="text-gray-800 body-font">
      <div className="container mx-auto flex flex-wrap p- flex-col md:flex-row items-center mt-4 mb-4">
        <a
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer"
          onClick={handleClickLogo}
        >
          <img src={logo} width="30px" />
          <span className="ml-3 text-xl font-bold">Hash</span>
          <span className=" text-xl font-bold text-yellow-500	 ">Graph</span>
        </a>
        <div className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {isAuthenticated && (
            <button
              className="inline-flex items-center bg-yellow-400 border-0 py-1 px-3 focus:outline-none hover:bg-yellow-500  rounded text-base m-2 font-semibold"
              onClick={handleClicDashboard}
            >
              Dashboard
            </button>
          )}
          {!isAuthenticated && (
            <button
              className="inline-flex items-center bg-yellow-400 border-0 py-1 px-3 focus:outline-none hover:bg-yellow-500 rounded text-base m-2 font-semibold"
              onClick={handleClickRegister}
            >
              Register
            </button>
          )}
          {!isAuthenticated && (
            <button
              className="inline-flex items-center bg-yellow-400 border-0 py-1 px-3 focus:outline-none hover:bg-yellow-500  rounded text-base m-2 font-semibold"
              onClick={handleClicLogin}
            >
              Login
            </button>
          )}
          {isAuthenticated && (
            <button
              className="inline-flex items-center bg-yellow-400 border-0 py-1 px-3 focus:outline-none hover:bg-yellow-500 rounded text-base m-2 font-semibold"
              onClick={handleClickLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
