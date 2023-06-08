import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import apiService from '../services/ApiService';

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password,
    };

    const response = await apiService.register(user);
    if (response.status === 201) {
      console.log('User created successfully');
      navigate('/dashboard');
    } else {
      const responseBody = await response.text(); // Read the response body as JSON
      console.log(responseBody);
      setErrorMessage('Error creating user: invalid input');
      return;
    }
    setFirstName('');
    setLastName('');
    setEmail('');
    setUsername('');
    setPassword('');
    setErrorMessage('');
    return;
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
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  First Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="Satoshi"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Last Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="Nakamoto"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-email"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-email"
                  type="email"
                  placeholder="satoshi@bitcoin.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>
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
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="password"
                  placeholder="******************"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <p className="text-gray-600 text-xs italic">
                  Minimum 8 characters
                </p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2 justify-center">
              <button
                className=" w-full bg-yellow-400 hover:bg-yellow-500 font-bold py-2 px-4 rounded text-gray-800"
                type="submit"
              >
                Register
              </button>
              <p className="text-red-500 italic m-3 text-xs">{errorMessage}</p>
            </div>
          </form>
        </section>
        <Footer></Footer>
      </div>
    </>
  );
};

export default RegistrationForm;
