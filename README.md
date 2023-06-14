# HashGraph: A Cryptocurrency Market Data Visualization App

## Table of Contents

- [Introduction](https://chat.openai.com/?model=gpt-4#introduction)
- [Features](https://chat.openai.com/?model=gpt-4#features)
- [Technologies](https://chat.openai.com/?model=gpt-4#technologies)
- [Setup](https://chat.openai.com/?model=gpt-4#setup)

## Project Background

This application was built as a beginner solo project in the span of just one week during the Codeworks Software Engineering Bootcamp. Despite being a beginner-level project, HashGraph successfully encapsulates complex functionalities with real-time data processing, robust backend infrastructure, and a responsive frontend. It is a testament to the learnings and skills acquired in the bootcamp and the passion for software development.



## Introduction

HashGraph is a robust web application that provides real-time cryptocurrency market data visualization. It aims to connect users with different markets and deliver crucial information about various cryptocurrencies. The application has been designed to offer a user-friendly interface that aids both novices and professionals in navigating the complex world of cryptocurrencies.

## Features

- **User Registration**: New users can easily register and create a personal account.
- **Real-Time Data**: Users gain access to real-time crypto data, helping them stay up-to-date with market trends.
- **Intuitive Charts**: Data is displayed in comprehensive and easy-to-understand charts, powered by TradingView Lightweight Charts library.
- **Favourite Cryptocurrency Pairs**: Users can mark their favourite cryptocurrency pairs for quick access and personalized tracking.
- **User Authentication**: The application uses sessionID authentication for added security.

## Technologies

HashGraph uses a mix of cutting-edge technologies to provide its services:

**Backend**

- Node.js: An open-source, cross-platform, JavaScript runtime environment.
- Express.js: A web application framework for Node.js designed for building web applications and APIs.
- MongoDB: A source-available cross-platform document-oriented database program.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.

**Frontend**

- React.js: A JavaScript library for building user interfaces.
- Tailwind CSS: A highly customizable, low-level CSS framework.
- TradingView Lightweight Charts: An advanced charting library, perfect for real-time data visualization.
- Redux: A Predictable State Container for JS Apps.

HashGraph also uses a WebSocket connection to CoinAPI to ensure real-time data communication between the client and the server.

## Setup

Before starting with HashGraph setup, please make sure you have Node.js and MongoDB installed on your system. Here are the steps to get HashGraph up and running:

1. Clone this repository to your local machine.
2. Navigate to the server folder and install dependencies using `npm install`.
3. Once the installation is complete, start the server using `node index.js`.
4. Next, navigate to the client folder and repeat steps 2 and start the client server using `npm run dev`.
5. Open your browser and visit `http://localhost:5173` to see HashGraph in action.

Please note that due to API limit restrictions, the application currently makes HTTP requests at 10-second intervals. With an unrestricted API, the WebSocket connection could be used directly.

## Contributing

We welcome and appreciate any contributions to the HashGraph project. Please feel free to submit a pull request or open an issue to suggest improvements or bug fixes.

## Contact

If you have any queries or would like to discuss something about the project, feel free to reach out.