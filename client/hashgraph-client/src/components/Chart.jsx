import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

const Chart = ({ data }) => {
  const backgroundColor = 'white';
  const lineColor = '#2962FF';
  const textColor = 'black';
  const areaTopColor = '#2962FF';
  const areaBottomColor = 'rgba(41, 98, 255, 0.28)';

  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    const timescale = chart.timeScale();
    timescale.fitContent();

    timescale.applyOptions({
      timeVisible: true,
      secondsVisible: true,
      ticksVisible: true,
      lockVisibleTimeRangeOnResize: true,
      rightOffset: 12,
      borderVisible: true,
      fixLeftEdge: true,
      fixRightEdge: true,
      barSpacing: 3,
    });

    const newSeries = chart.addCandlestickSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    newSeries.setData(data);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return <div ref={chartContainerRef} />;
};

export default Chart;
