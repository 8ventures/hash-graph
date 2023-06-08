import React from 'react';
import Header from './Header';
import Footer from './Footer';

const LoginForm = () => {
  return (
    <>
      <div>
        <Header></Header>
        <section>
          <form class="w-full max-w-md mx-auto mt-10">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-username"
                >
                  Username
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-username"
                  type="text"
                  placeholder="satoshi_nakamoto"
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Password
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="password"
                  placeholder="******************"
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2 justify-center">
              <button class=" w-full bg-yellow-400 hover:bg-yellow-500 font-bold py-2 px-4 rounded text-gray-800">
                Login
              </button>
            </div>
          </form>
        </section>
        <Footer></Footer>
      </div>
    </>
  );
};

export default LoginForm;
