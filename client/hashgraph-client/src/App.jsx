import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import HomePage from './views/HomePage';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import NotFound from './components/NotFound';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage></HomePage>,
    },
    {
      path: '/register',
      element: <RegistrationForm></RegistrationForm>,
    },
    {
      path: '/login',
      element: <LoginForm></LoginForm>,
    },
    {
      path: '*',
      element: <NotFound></NotFound>,
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
