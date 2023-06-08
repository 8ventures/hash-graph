import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/favicon.svg';

const Header = () => {
  const navigate = useNavigate();
  const handleClickRegister = function () {
    navigate('/register');
  };
  const handleClicLogin = function () {
    navigate('/login');
  };
  const handleClickLogout = function () {
    navigate('/');
  };
  const handleClickLogo = function () {
    navigate('/');
  };
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
          <button
            className="inline-flex items-center bg-yellow-400 border-0 py-1 px-3 focus:outline-none hover:bg-yellow-500 rounded text-base m-2 font-semibold"
            onClick={handleClickRegister}
          >
            Register
          </button>
          <button
            className="inline-flex items-center bg-yellow-400 border-0 py-1 px-3 focus:outline-none hover:bg-yellow-500  rounded text-base m-2 font-semibold"
            onClick={handleClicLogin}
          >
            Login
          </button>
          <button
            className="inline-flex items-center bg-yellow-400 border-0 py-1 px-3 focus:outline-none hover:bg-yellow-500 rounded text-base m-2 font-semibold"
            onClick={handleClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
