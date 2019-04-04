import Chart from 'chart.js';
import moment from 'moment';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import flatpickr from 'flatpickr';

function getRandomColor() {
  let letters = `0123456789ABCDEF`.split(``);
  let color = `#`;
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function chartConteiner(tasks) {
  let startDate = moment().startOf(`week`)
    .format(`YYYY-MM-DD`);
  let endDate = moment().endOf(`week`)
      .format(`YYYY-MM-DD`);


  flatpickr(document.querySelector(`.statistic__period-input`), {
    locale: {
      rangeSeparator: ` — `,
    },
    mode: `range`,
    defaultDate: [startDate, endDate],
    dateFormat: `Y-m-d`,
    onClose: (selectedDates) => {
      startDate = moment(selectedDates[0]).format(`YYYY-MM-DD`);
      endDate = moment(selectedDates[1]).format(`YYYY-MM-DD`);
    },
  });

  buildChart(tasks, startDate, endDate);
  return [startDate, endDate];

}

export function buildChart(tasks, startDate, endDate) {
  let startDateTemp = moment(startDate);
  let endDateTemp = moment(endDate);
  const colorWrap = document.querySelector(`.statistic__colors-wrap`);
  const tagsWrap = document.querySelector(`.statistic__tags-wrap`);
  tagsWrap.classList.remove(`visually-hidden`);
  colorWrap.classList.remove(`visually-hidden`);
  colorWrap.outerHTML = `<div class="statistic__colors-wrap"><canvas class="statistic__colors" width="400" height="300"></canvas></div>`;
  tagsWrap.outerHTML = `<div class="statistic__tags-wrap"><canvas class="statistic__tags" width="400" height="300"></canvas></div>`;
  const tagsCtx = document.querySelector(`.statistic__tags`);
  const colorsCtx = document.querySelector(`.statistic__colors`);

  // В разрезе цветов
  const colorForChart = {
    black: `#000000`,
    yellow: `#FFFF00`,
    blue: `#0000FF`,
    green: `#008000`,
    pink: `#FFC0CB`,
  };

  let tempDataColor = {};
  let labelColor = [];
  let dataColor = [];
  let backgroundColorColor = [];

  for (let i = 0; i < tasks.length; i++) {
    if (moment(tasks[i].dueDate).isBetween(startDateTemp, endDateTemp)) {
      let temp = tasks[i].color;
      if (tempDataColor[temp]) {
        tempDataColor[temp] += 1;
      } else {
        tempDataColor[temp] = 1;
      }
    } else {
      continue;
    }
  }

  for (let key in tempDataColor) {
    if (key) {
      labelColor.push(`#${key}`);
      dataColor.push(tempDataColor[key]);
      backgroundColorColor.push(colorForChart[key]);
    }
  }


  const colorsChart = new Chart(colorsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: labelColor,
      datasets: [
        {
          data: dataColor,
          backgroundColor: backgroundColorColor,
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          display: false,
        },
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} ${data.labels[tooltipItem.index]} TASKS — ${tooltipPercentage}%`;
          },
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15,
      },
      title: {
        display: true,
        text: `DONE BY: COLORS`,
        fontSize: 16,
        fontColor: `#000000`,
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13,
        },
      },
    },
  });

  // В разрезе тегов

  let tempDataTags = {};
  let labelTags = [];
  let dataTags = [];
  let backgroundColorTags = [];

  for (let i = 0; i < tasks.length; i++) {
    if (moment(tasks[i].dueDate).isBetween(startDateTemp, endDateTemp)) {
      let tags = tasks[i].tags;
      for (let tag of tags) {
        if (tempDataTags[tag]) {
          tempDataTags[tag] += 1;
        } else {
          tempDataTags[tag] = 1;
        }
      }
    } else {
      continue;
    }
  }

  for (let key in tempDataTags) {
    if (key) {
      labelTags.push(`#${key}`);
      dataTags.push(tempDataTags[key]);
      backgroundColorTags.push(getRandomColor());
    }
  }

  const tagsChart = new Chart(tagsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: labelTags,
      datasets: [
        {
          data: dataTags,
          backgroundColor: backgroundColorTags,
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          display: false,
        },
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} ${data.labels[tooltipItem.index]} — ${tooltipPercentage}%`;
          },
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15,
      },
      title: {
        display: true,
        text: `DONE BY: TAGS`,
        fontSize: 16,
        fontColor: `#000000`,
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13,
        },
      },
    },
  });

  return [tagsChart, colorsChart];
}
