import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import isNullOrUndefined from './isNullOrUndefined';

function pivotData(data) {
  let dictionary = {};
  for (let i = 0; i < data.length; i++) {
    let category = data[i].category;
    if (isNullOrUndefined(category)) {
      continue;
    }

    let amount = data[i].amount;
    if (isNullOrUndefined(amount)) {
      continue;
    }

    dictionary[category] = dictionary.hasOwnProperty(category)
      ? dictionary[category] + amount
      : amount;
  }
  return dictionary;
}

function getRandomRGBA() {
  const min = 0,
        max = 255,
        opacity = 0.8;
  
  const getRandomRGBValue = () => Math.floor(Math.random() * (max - min + 1)) + min;;
  return `rgba(${getRandomRGBValue()}, ${getRandomRGBValue()}, ${getRandomRGBValue()}, ${opacity})`;
}

function TransactionsPieChart({ data, onClick }) {
  if (isNullOrUndefined(data) || data.length === 0) {
    return <></>;
  }
  
  const pieChartCanvas = useRef(null);
  let pivotedData = pivotData(data);
  let chartData = {
    labels: [],
    counts: [],
    backgroundColors: []
  };

  for (const key in pivotedData) {
    chartData.labels.push(key);
    chartData.counts.push(pivotedData[key]);
    chartData.backgroundColors.push(getRandomRGBA());
  }

  const chart = useRef();
  useEffect(() => {
    chart.current = new Chart(pieChartCanvas.current, {
      type: 'pie',
      data: {
        labels: chartData.labels,
        datasets: [{
          data: chartData.counts,
          backgroundColor: chartData.backgroundColors
        }]
      },
      options: {
        onClick: (_, activeElements) => { 
          if (activeElements.length < 1) {
            onClick(undefined);
            return;
          }
          
          onClick(activeElements[0]._model.label)
        }
      }});
    return () => {
      chart.current.destroy();
    }
  }, []); // empty array means useEffect will only fire after initial render

  return <canvas ref={pieChartCanvas}></canvas>
}

export default TransactionsPieChart;
