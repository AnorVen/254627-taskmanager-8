import filterRender from './templates/Fliters';
import cardRender from './templates/Cards';

const CARD_VARIABLES = {
  COLOR: {
    black: `black`, yellow: `yellow`, blue: `blue`, green: `green`, pink: `pink`,
  },
  REPEAT_DAYS: [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`],
};

const DB = {
  FILTERS_DATA: [
    {
      TITLE: `all`,
      COUNT: Math.floor(Math.random() * 201),
      CHECKED: false,
    },
    {
      TITLE: `OVERDUE`,
      COUNT: Math.floor(Math.random() * 201),
      CHECKED: false,
    },
    {
      TITLE: `TODAY`,
      COUNT: Math.floor(Math.random() * 201),
      CHECKED: false,
    },
    {
      TITLE: `FAVORITES`,
      COUNT: Math.floor(Math.random() * 201),
      CHECKED: false,
    },
    {
      TITLE: `Repeating`,
      COUNT: Math.floor(Math.random() * 201),
      CHECKED: false,
    },
    {
      TITLE: `Tags`,
      COUNT: Math.floor(Math.random() * 201),
      CHECKED: false,
    },
    {
      TITLE: `ARCHIVE`,
      COUNT: Math.floor(Math.random() * 201),
      CHECKED: false,
    },
  ],

  CARD_DATA: [
    {
      COLOR: CARD_VARIABLES.COLOR.black,
    },
    {
      COLOR: CARD_VARIABLES.COLOR.black,
    },
    {
      COLOR: CARD_VARIABLES.COLOR.black,
    },
    {
      COLOR: CARD_VARIABLES.COLOR.black,
    },
    {
      COLOR: CARD_VARIABLES.COLOR.black,
    },
    {
      COLOR: CARD_VARIABLES.COLOR.black,
    },
    {
      COLOR: CARD_VARIABLES.COLOR.black,
    },
  ],
};


const BoardTasks = document.querySelector(`.board__tasks`);
const MainFilter = document.querySelector(`.main__filter`);

function filtersRender(arr) {
  let tempBlock = ``;
  for (let i = 0; i < arr.length; i++) {
    tempBlock +=
      filterRender(arr[i])
    ;
  }
  MainFilter.insertAdjacentHTML(`beforeend`, tempBlock);

  MainFilter.addEventListener(`click`, clickOnFilterHandler);
}

function tasksRender(arr) {
  let tempBlock = ``;
  for (let i = 0; i < arr.length; i++) {
    tempBlock += cardRender(arr[i].color, i)
    ;
  }
  BoardTasks.insertAdjacentHTML(`beforeend`, tempBlock);
}


function randomCard() {
  BoardTasks.innerHTML = ``;
  let tempBlock = ``;
  for (let i = 0; i < Math.floor(Math.random() * 20); i++) {
    tempBlock +=
      cardRender(CARD_VARIABLES.COLOR[
        Object.keys(CARD_VARIABLES.COLOR)[Math.floor(Math.random() *
          Object.keys(CARD_VARIABLES.COLOR).length)]], i)
    ;
  }
  BoardTasks.insertAdjacentHTML(`beforeend`, tempBlock);
}

function clickOnFilterHandler(event) {
  let target = event.target;
  while (target !== MainFilter) {
    if (target.className === `filter__label`) {
      randomCard();
      return;
    }
    target = target.parentNode;
  }
}


window.onload = function () {
  filtersRender(DB.FILTERS_DATA);
  tasksRender(DB.CARD_DATA);
};
