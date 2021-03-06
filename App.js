import React, { useEffect } from 'react';
import Chart from 'chart.js';
import './App.css';

function App() {

  const customTooltip = (chartInstance, tooltipModel, chartContainerNode) => {
    // Tooltip Element
    let tooltipElement = document.getElementById('custom-chartjs-tooltip');

    // Create element on first render
    if (!tooltipElement && chartContainerNode) {
      tooltipElement = document.createElement('div');
      tooltipElement.id = 'custom-chartjs-tooltip';
      const tooltipFragment = document.createDocumentFragment();
      // Tooltip header
      const tooltipHeader = document.createElement('div');
      tooltipHeader.classList.add('custom-chartjs-tooltip__header');
      tooltipHeader.textContent = 'AS OF 11 JUN, 2020';
      tooltipFragment.appendChild(tooltipHeader);

      const tooltipHorizontalLine = document.createElement('hr');
      tooltipHorizontalLine.classList.add('custom-chartjs-tooltip__hr');
      tooltipFragment.appendChild(tooltipHorizontalLine);

      // Tooltip content label
      const tooltipContentLabel = document.createElement('div');
      tooltipContentLabel.classList.add('custom-chartjs-tooltip__content-label');
      tooltipContentLabel.textContent = 'NET PORTFOLIO VALUE';
      tooltipFragment.appendChild(tooltipContentLabel);


      // Tooltip content value
      const tooltipContentValue = document.createElement('div');
      tooltipContentValue.classList.add('custom-chartjs-tooltip__content-value');
      tooltipContentValue.textContent = '134,567,890.01';
      tooltipFragment.appendChild(tooltipContentValue);

      // Tooltip arrow
      const tooltipArrow = document.createElement('div');
      tooltipArrow.classList.add('tooltip__arrow');
      tooltipFragment.appendChild(tooltipArrow);

      tooltipElement.appendChild(tooltipFragment);

      chartContainerNode.appendChild(tooltipElement);
    }

    // Hide if no tooltip
    if (tooltipModel.opacity === 0) {
      tooltipElement.remove();
      return;
    }


    function getBody(bodyItem) {
      return bodyItem.lines;
    }

    const position = chartInstance._chart.canvas.getBoundingClientRect();
    const diff = position.width - tooltipModel.caretX;
    let tooltipArrowPosition = 'center';
    let leftPos = 0;
    if (tooltipModel.caretX < 90) {
      // arrow towards left
      leftPos = tooltipModel.caretX + 15;
      tooltipArrowPosition = 'left';
    } else if (diff >= 90) {
      // arrow center
      leftPos = position.left + window.pageXOffset + tooltipModel.caretX - 75;
    } else {
      // arrow towards right
      leftPos = tooltipModel.caretX - 180 + 15;
      tooltipArrowPosition = 'right';
    }

    tooltipElement.className = '';
    // Set caret Position
    tooltipElement.classList.remove('above', 'below', 'no-transform');
    if (tooltipModel.yAlign) {
      tooltipElement.classList.add(tooltipModel.yAlign);
    } else {
      tooltipElement.classList.add('no-transform');
    }
    tooltipElement.classList.add(`tooltip-arrow--${tooltipArrowPosition}`);

    // Display, position, and set styles for font
    tooltipElement.style.left = leftPos + 'px';
    tooltipElement.style.top = '-100px';
  };

  useEffect(() => {
    const myChartRef = document.getElementById('myChart');

    Chart.Tooltip.positioners.custom = function (elements, position) {
      if (!elements.length) {
        return false;
      }
      var offset = 0;
      //adjust the offset left or right depending on the event position
      if (elements[0]._chart.width / 2 > position.x) {
        offset = 20;
      } else {
        offset = -20;
      }
      return {
        x: position.x + offset,
        y: 0
      }
    }

    new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: ['Richa', "Jan", "Feb", "March", 'April', 'ABc', 'xyz', 'Sada adda', 'Amit', 'Kharka', 'AAAA', 'AAAB', 'AAAC', 'AAAD', 'AAAE', 'AAAF', 'AAAG', 'AAAH', 'AAAI', 'AAAJ'],
        datasets: [
          {
            label: "Sales",
            data: [86, 67, 91, 45, 78, 89, 90, 115, 10, 9, 15, 25, 110, 78, 3, 74, 89, 1, 10, 56],
          }
        ]
      },
      options: {
        legend: {
          display: false,
        },
        // layout: {
        //   padding: {
        //     top: 15
        //   }
        // },
        tooltips: {
          enabled: false,
          position: 'nearest',
          custom: function (tooltipModel) {
            const chartContainerNode = this._chart.canvas.parentNode;
            customTooltip(this, tooltipModel, chartContainerNode);
          }
        }
      }
    });
  }, []);

  return (
    <div className="App">
      <div className="sample-div"></div>
      <div id="my-chart-container" className="chart-wrapper">
        <canvas
          id="myChart"
        />
      </div>
    </div>
  );
}

export default App;
