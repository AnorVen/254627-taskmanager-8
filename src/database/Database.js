const TASK = {
  title: '',

};

export const CARD_VARIABLES = {
  TASKS: [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`],
  dueDate: new Date(),
  tags: new Set(),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  COLOR: {
    black: `black`,
    yellow: `yellow`,
    blue: `blue`,
    green: `green`,
    pink: `pink`,
  },
  REPEAT_DAYS: {mo: false, tu: true, we: false, th: true, fr: false, sa: false, su: false},
  isFavorite: true,
  isDone: false
};

export const Database = {
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
