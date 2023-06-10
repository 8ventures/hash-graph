import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';
import Header from './header';
import apiService from '../services/ApiService';
import { login } from '../redux/authActions';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await apiService.login(username, password);
    if (response.status === 200) {
      await dispatch(login());
      console.log('User logged in successfully');
      navigate('/dashboard');
    } else {
      const responseBody = await response.text(); // Read the response body as JSON
      console.log(responseBody);
      setErrorMessage(responseBody);
      return;
    }
    setUsername('');
    setPassword('');
    setErrorMessage('');
    return;
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header> </Header>
        <section className="text-gray-600 body-font flex-grow justify-center align-middle">
          <form
            className="w-full max-w-md mx-auto mt-10"
            onSubmit={handleFormSubmit}
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-username"
                >
                  Username
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-username"
                  type="text"
                  placeholder="satoshi_nakamoto"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <div className="relative inline-block w-full">
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="******************"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <div
                    className="absolute cursor-pointer top-0 right-0 mt-3 mr-4"
                    onClick={toggleShowPassword}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2 justify-center">
              <button className=" w-full bg-yellow-400 hover:bg-yellow-500 font-bold py-2 px-4 rounded text-gray-800">
                Login
              </button>
              <p className="text-red-500 italic m-3 text-xs">{errorMessage}</p>
            </div>
          </form>
        </section>
        <Footer> </Footer>
      </div>
    </>
  );
};

export default LoginForm;
