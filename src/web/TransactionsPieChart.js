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

  let chartData = {
    labels: [],
    counts: [],
    backgroundColors: []
  };

  for (const key in dictionary) {
    chartData.labels.push(key);
    chartData.counts.push(dictionary[key]);
    chartData.backgroundColors.push(getRGBAFor(key));
  }

  return chartData;
}

function getRGBAFor(label) {
  const max = 255,
        opacity = 0.8;
  
  const hash = Array.from(label).reduce((accumulator, value) => accumulator + value.charCodeAt(0), 0);

  const red = (hash*3000) % max;
  const green = (hash*5000) % max;
  const blue = (hash*8000) % max;

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

function TransactionsPieChart({ data, onClick }) {
  if (isNullOrUndefined(data) || data.length === 0) {
    return <></>;
  }

  const chart = useRef();
  const pieChartCanvas = useRef(null);

  // Create the initial chart and destroy it when component is unmounted
  useEffect(() => {
    const chartData = pivotData(data);
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
      chart.current = undefined;
    }
  }, []);

  // Update the chart when any of the objects within the data array change
  useEffect(() => {
    if (chart.current === undefined) {
      return;
    }

    const chartData = pivotData(data);
    chart.current.data = {
      labels: chartData.labels,
      datasets: [{
        data: chartData.counts,
        backgroundColor: chartData.backgroundColors
      }]
    };

    chart.current.update();
  }, [...data]);

  return <canvas ref={pieChartCanvas}></canvas>
}

export default TransactionsPieChart;
