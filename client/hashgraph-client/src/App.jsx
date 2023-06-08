import React from 'react';

import HomePage from './views/HomePage';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <>
      <HomePage></HomePage>
      <RegistrationForm></RegistrationForm>
      <LoginForm></LoginForm>
    </>
  );
}

export default App;
