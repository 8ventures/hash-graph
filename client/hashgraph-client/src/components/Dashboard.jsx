import React from 'react';
import Footer from './Footer';
import Header from './header';

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header> </Header>
        <section className="text-gray-600 body-font flex-grow justify-center align-middle">
          Dashboard
        </section>
        <Footer> </Footer>
      </div>
    </>
  );
};

export default Dashboard;
