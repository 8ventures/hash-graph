import React, { useEffect } from 'react';

const MarketNewsWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          description: 'Binance',
          proName: 'BINANCE:BTCUSD',
        },
        {
          description: 'Bitstamp',
          proName: 'BITSTAMP:BTCUSD',
        },
        {
          description: 'Coinbase',
          proName: 'COINBASE:BTCUSD',
        },
        {
          description: 'Binance',
          proName: 'BINANCE:ETHUSD',
        },
        {
          description: 'Bitstamp',
          proName: 'BITSTAMP:ETHUSD',
        },
        {
          description: 'Coinbase',
          proName: 'COINBASE:ETHUSD',
        },
      ],
      colorTheme: 'light',
      isTransparent: false,
      showSymbolLogo: true,
      locale: 'en',
    });
    document
      .getElementsByClassName('tradingview-widget-container__widget')[0]
      .appendChild(script);

    return () => {
      const widgetContainer = document.getElementsByClassName(
        'tradingview-widget-container__widget'
      )[0];

      if (widgetContainer) {
        widgetContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container w-full ">
      <div
        className="tradingview-widget-container__widget"
        style={{ pointerEvents: 'none' }}
      ></div>
    </div>
  );
};

export default MarketNewsWidget;
