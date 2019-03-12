
import {Filter} from './Classes/Filter';
import {TaskEdit} from './Classes/TaskEdit';
import {Task} from './Classes/Task';
import {cardRender, cardEdit, newTask} from './templates/Cards/Cards';
import {Database as DB, CARD_VARIABLES} from './database/Database';

const BoardTasks = document.querySelector(`.board__tasks`);
const MainFilter = document.querySelector(`.main__filter`);

function filtersRender(arr) {
  let tempBlock = ``;
  for (let i = 0; i < arr.length; i++) {
    let tempFiletrItem = new Filter(arr[i]);
    tempBlock += tempFiletrItem.render;
  }
  MainFilter.insertAdjacentHTML(`beforeend`, tempBlock);

  MainFilter.addEventListener(`click`, clickOnFilterHandler);
}

function tasksRender(arr) {
  for (let i = 0; i < arr.length; i++) {
    let firstTask = new Task({i, ...arr[i]});
    let firstTaskEdit = new TaskEdit({i, ...arr[i]});
    firstTask.render(BoardTasks);
  }
}

function randomCard() {
  BoardTasks.innerHTML = ``;
  let tempBlock = ``;
  for (let i = 0; i < Math.floor(Math.random() * 20); i++) {
    let color = CARD_VARIABLES.COLOR[Object.keys(CARD_VARIABLES.COLOR)[Math.floor(Math.random() * Object.keys(CARD_VARIABLES.COLOR).length)]];
    let id = i;
    tempBlock += cardRender({color, id});
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
