import moment from 'moment';
export const CARD_VARIABLES = {
  title: [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`][
    Math.floor(Math.random() * 3)
  ],
  dueDate: moment(
      Date.now() +
      1 +
      Math.floor(Math.random() * 7) *
        Math.floor(Math.random() * 24) *
        Math.floor(Math.random() * 60) *
        60 *
        1000
  ),
  tags: new Set([`cinema`, `entertainment`, `myself`, `cinema`]),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  COLOR: {
    black: `black`,
    yellow: `yellow`,
    blue: `blue`,
    green: `green`,
    pink: `pink`,
  },
  repeatingDays: {mo: false, tu: true, we: false, th: true, fr: false, sa: false, su: false},
  isFavorite: true,
  isDone: false,
  isEdit: false,
  isArchive: false,
};

export const Database = {
  FILTERS_DATA: [
    {
      title: `all`,
      count: Math.floor(Math.random() * 201),
      checked: false,
    },
    {
      title: `OVERDUE`,
      count: Math.floor(Math.random() * 201),
      checked: false,
    },
    {
      title: `TODAY`,
      count: Math.floor(Math.random() * 201),
      checked: false,
    },
    {
      title: `FAVORITES`,
      count: Math.floor(Math.random() * 201),
      checked: false,
    },
    {
      title: `Repeating`,
      count: Math.floor(Math.random() * 201),
      checked: false,
    },
    {
      title: `Tags`,
      count: Math.floor(Math.random() * 201),
      checked: false,
    },
    {
      title: `ARCHIVE`,
      count: Math.floor(Math.random() * 201),
      checked: false,
    },
  ],

  CARD_DATA: [
    {
      title: [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`][
        Math.floor(Math.random() * 3)
      ],
      dueDate: moment(
          Date.now() +
          1 +
          Math.floor(Math.random() * 7) *
            Math.floor(Math.random() * 24) *
            Math.floor(Math.random() * 60) *
            60 *
            1000
      ),
      tags: new Set([`cinema`, `entertainment`, `myself`, `newTags`]),
      picture: `http://picsum.photos/100/100?r=${Math.random()}`,
      color: CARD_VARIABLES.COLOR.black,
      repeatingDays: {mo: false, tu: true, we: false, th: true, fr: false, sa: false, su: false},
      isFavorite: true,
      isDone: true,
      isEdit: false,
      isArchive: false,
      deleted: false,
    },
    {
      title: [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`][
        Math.floor(Math.random() * 3)
      ],
      dueDate: moment(
          Date.now() -
          1 -
          Math.floor(Math.random() * 7) *
            Math.floor(Math.random() * 24) *
            Math.floor(Math.random() * 60) *
            60 *
            1000
      ),
      tags: new Set(),
      picture: `http://picsum.photos/100/100?r=${Math.random()}`,
      color: CARD_VARIABLES.COLOR.yellow,
      repeatingDays: {mo: false, tu: true, we: false, th: true, fr: false, sa: false, su: false},
      isFavorite: true,
      isDone: false,
      isEdit: false,
      isArchive: true,
      deleted: false,
    },
    {
      title: [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`][
        Math.floor(Math.random() * 3)
      ],
      dueDate: moment(Date.now()),
      tags: new Set([`cinema`, `entertainment`, `newTags`]),
      picture: `http://picsum.photos/100/100?r=${Math.random()}`,
      color: CARD_VARIABLES.COLOR.blue,
      repeatingDays: {
        mo: false,
        tu: false,
        we: false,
        th: false,
        fr: false,
        sa: false,
        su: false,
      },
      isFavorite: false,
      isDone: false,
      isEdit: true,
      isArchive: false,
      deleted: false,
    },
    {
      title: [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`][
        Math.floor(Math.random() * 3)
      ],
      dueDate: moment(
          Date.now() +
          1 -
          Math.floor(Math.random() * 7) *
            Math.floor(Math.random() * 24) *
            Math.floor(Math.random() * 60) *
            60 *
            1000
      ),
      tags: new Set(),
      picture: `http://picsum.photos/100/100?r=${Math.random()}`,
      color: CARD_VARIABLES.COLOR.green,
      repeatingDays: {mo: false, tu: true, we: false, th: true, fr: false, sa: false, su: false},
      isFavorite: false,
      isDone: true,
      isEdit: false,
      isArchive: false,
      deleted: false,
    },
    {
      title: [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`][
        Math.floor(Math.random() * 3)
      ],
      dueDate: moment(
          Date.now() +
          1 +
          Math.floor(Math.random() * 7) *
            Math.floor(Math.random() * 24) *
            Math.floor(Math.random() * 60) *
            60 *
            1000
      ),
      tags: new Set([`cinema`, `entertainment`, `myself`, `newTags`]),
      picture: `http://picsum.photos/100/100?r=${Math.random()}`,
      color: CARD_VARIABLES.COLOR.pink,
      repeatingDays: {mo: false, tu: true, we: false, th: true, fr: false, sa: false, su: false},
      isFavorite: false,
      isDone: false,
      isEdit: false,
      isArchive: false,
      deleted: true,
    },
    {
      title: [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`][
        Math.floor(Math.random() * 3)
      ],
      dueDate: moment(
          Date.now() +
          1 +
          Math.floor(Math.random() * 7) *
            Math.floor(Math.random() * 24) *
            Math.floor(Math.random() * 60) *
            60 *
            1000
      ),
      tags: new Set([`cinema`, `entertainment`, `myself`, `newTags`]),
      picture: `http://picsum.photos/100/100?r=${Math.random()}`,
      color: CARD_VARIABLES.COLOR.pink,
      repeatingDays: {
        mo: false,
        tu: false,
        we: false,
        th: false,
        fr: false,
        sa: false,
        su: false,
      },
      isFavorite: true,
      isDone: false,
      isEdit: false,
      isArchive: false,
      deleted: false,
    },
    {
      title: [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`][
        Math.floor(Math.random() * 3)
      ],
      dueDate: moment(
          Date.now() +
          1 +
          Math.floor(Math.random() * 7) *
            Math.floor(Math.random() * 24) *
            Math.floor(Math.random() * 60) *
            60 *
            1000
      ),
      tags: new Set(),
      picture: `http://picsum.photos/100/100?r=${Math.random()}`,
      color: CARD_VARIABLES.COLOR.yellow,
      repeatingDays: {
        mo: false,
        tu: false,
        we: false,
        th: false,
        fr: false,
        sa: false,
        su: false,
      },
      isFavorite: true,
      isDone: false,
      isEdit: false,
      isArchive: false,
      deleted: false,
    },
  ],
};
