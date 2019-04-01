import moment from 'moment';
import { Filter } from './Classes/Filter';
import { TaskEdit } from './Classes/TaskEdit';
import { Task } from './Classes/Task';
import { Database as DB, CARD_VARIABLES } from './database/Database';
const BoardTasks = document.querySelector(`.board__tasks`);
const MainFilter = document.querySelector(`.main__filter`);
const LoadMore = document.querySelector(`.load-more`);
const controlStatistic = document.querySelector(`#control__statistic`);
const boardContainer = document.querySelector(`.board.container`);
let initialTasks = DB.CARD_DATA;



const deleteTask = (tasks, i) => {
  tasks.splice(i, 1);
  return tasks;
};

const updateTask = (tasks, i, newTask) => {
  tasks[i] = Object.assign({}, tasks[i], newTask);
  return tasks[i];
};

function tasksRender(tasks) {
  for (let i = 0; i < tasks.length; i++) {
    let taskComponent = new Task({ id: i, ...tasks[i] });
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

function LoadMoreRender () {
  initialTasks = initialTasks.concat(initialTasks);
  BoardTasks.innerHTML = ``;
  tasksRender(initialTasks);
}

window.onload = function() {
  filtersRender(DB.FILTERS_DATA);
  tasksRender(initialTasks);

  LoadMore.addEventListener('click', LoadMoreRender );
  controlStatistic.addEventListener(`click`, function() {
    document.querySelector(`.statistic.container`).classList.toggle(`visually-hidden`);
    boardContainer.classList.toggle(`visually-hidden`);

  })
};
// TODO сейчас при сохранении фильтрация все равно происходит по изначальным данным
