import moment from 'moment';
import { Filter } from './Classes/Filter';
import { TaskEdit } from './Classes/TaskEdit';
import { Task } from './Classes/Task';
import { Database as DB, CARD_VARIABLES } from './database/Database';
import {buildChart, chartConteiner} from './statistic';
const BoardTasks = document.querySelector(`.board__tasks`);
const MainFilter = document.querySelector(`.main__filter`);
const LoadMore = document.querySelector(`.load-more`);
const boardContainer = document.querySelector(`.control__btn-wrap`);
const controlStatistic = document.querySelector(`#control__statistic`);
const statisticPeriod = document.querySelector(`.statistic__period-input`);

let initialTasks = DB.CARD_DATA;

controlStatistic.addEventListener(`click`, () => {
  console.log('stat')
  chartConteiner(initialTasks);
});

statisticPeriod.addEventListener("change", ()=> {
  let startDate = statisticPeriod.value.split(` — `)[0];
  let endDate = statisticPeriod.value.split(` — `)[1];
  buildChart(initialTasks, startDate, endDate)
});

const deleteTask = (tasks, i) => {
  tasks.splice(i, 1);
  return tasks;
};

const updateTask = (tasks, i, newTask) => {
  tasks[i] = Object.assign({}, tasks[i], newTask);
  return tasks[i];
};


function loadMoreRender () {
  initialTasks = initialTasks.concat(initialTasks);
  BoardTasks.innerHTML = ``;
  tasksRender(initialTasks);
}

function tasksRender(tasks) {
  for (let i = 0; i < tasks.length; i++) {
    let taskComponent = new Task({ id: i, ...tasks[i] }); /* eslint-disable-line */
    let editTaskComponent = new TaskEdit({ id: i, ...tasks[i] });
    if (tasks[i].deleted) {
      continue;
    }

    if (tasks[i].isEdit) {
      BoardTasks.appendChild(editTaskComponent.render());
    } else {
      BoardTasks.appendChild(taskComponent.render());
    }

    taskComponent.onEdit = () => {
      editTaskComponent.render();
      BoardTasks.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };
    editTaskComponent.onDelete = () => {
      deleteTask(tasks, i);
      BoardTasks.removeChild(editTaskComponent.element);
      editTaskComponent.unrender();
    };

    editTaskComponent.onSubmit = (newObject) => {
      const updatedTask = updateTask(tasks, i, newObject);
      taskComponent.update(updatedTask);
      taskComponent.render();
      BoardTasks.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
      tasks[i] = updatedTask;
    };
  }
}



function filtersRender(filters) {
  for (let i = 0; i < filters.length; i++) {
    let filterItem = new Filter(filters[i]);
    MainFilter.appendChild(filterItem.render());
  }
  MainFilter.addEventListener('click', clickOnFilterHandler);
}



function filterTasks(initialTasks, filter) {
  switch (filter) {
    case `all`:
      return initialTasks;
    case `overdue`:
      return initialTasks.filter((item) => moment(item.dueDate) < moment(Date.now()));
    case `today`:
      return initialTasks.filter((item) => moment(item.dueDate).isSame(moment(Date.now()), `day`));
    case `favorites`:
      return initialTasks.filter((item) => item.isFavorite === true);
    case `repeating`:
      return initialTasks.filter((item) =>
        [...Object.entries(item.repeatingDays)].some((rec) => rec[1])
      );
    case `tags`:
      return initialTasks.filter((it) => it.tags.size !== 0);
    case `archive`:
      return initialTasks.filter((item) => item.isArchive === true);
    default:
      return initialTasks;
  }
}

function clickOnFilterHandler(event) {
  let target = event.target;
  while (target !== MainFilter) {
    if (target.className === `filter__label`) {
      const filtertdTasks = filterTasks(
        initialTasks,
        target
          .getAttribute(`for`)
          .split(`__`)[1]
          .toLowerCase()
      );
      BoardTasks.innerHTML = ``;
      tasksRender(filtertdTasks);
    }
    target = target.parentNode;
  }
}

function toggleBoards(event) {
  let target = event.target;
  while (target !== boardContainer) {
    if (target.className === `control__label`) {
      return showBoard(target.getAttribute(`for`))
    }
    target = target.parentNode;
  }
}
function showBoard(target){

  document.querySelector(`.statistic.container`).classList.add(`visually-hidden`);
  document.querySelector(`.result.container`).classList.add(`visually-hidden`);
 // document.querySelector(`.search.container`).classList.add(`visually-hidden`);
  document.querySelector(`.board.container`).classList.add(`visually-hidden`);

  switch (target) {
    case `control__task`:
      document.querySelector(`.board`).classList
      .remove(`visually-hidden`); break;
    case `control__search`:
      document.querySelector(`.search`).classList
      .remove(`visually-hidden`); break;
    case `control__statistic`:
      document.querySelector(`.statistic`).classList
      .remove(`visually-hidden`); break;
    case `control__new-task`:
      document.querySelector(`.board`).classList
      .remove(`visually-hidden`); break;
    default:   document.querySelector(`.board`).classList
      .remove(`visually-hidden`);
  }
}





window.onload = function() {
  filtersRender(DB.FILTERS_DATA);
  tasksRender(initialTasks);

  LoadMore.addEventListener('click', loadMoreRender );
  boardContainer.addEventListener(`click`, toggleBoards)

};
// TODO сейчас при сохранении фильтрация все равно происходит по изначальным данным
