import React from 'react';
import Footer from './Footer';
import Header from './Header';

const LoginForm = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header> </Header>
        <section className="text-gray-600 body-font flex-grow justify-center align-middle">
          <form className="w-full max-w-md mx-auto mt-10">
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
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2 justify-center">
              <button className=" w-full bg-yellow-400 hover:bg-yellow-500 font-bold py-2 px-4 rounded text-gray-800">
                Login
              </button>
            </div>
          </form>
        </section>
        <Footer> </Footer>
      </div>
    </>
  );
};

export default LoginForm;
