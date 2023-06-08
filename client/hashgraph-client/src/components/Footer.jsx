import React from 'react';

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 text-xl font-bold">Hash</span>
          <span className=" text-xl font-bold text-yellow-500	 ">Graph</span>
        </a>
        <p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2023 HashGraph —
          <a
            href="https://github.com/8ventures"
            class="text-gray-600 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            @8ventures
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
