import Component from './Component';
import flatpickr from 'flatpickr';
export class TaskEdit extends Component {
  constructor({
    id = 1,
    color = `black`,
    title = `таск редактируется...`,
    dueDate = new Date(),
    tags = new Set([]),
    picture = `http://picsum.photos/100/100?r=${Math.random()}`,
    repeatingDays = {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false,
    },
    isFavorite = false,
    isDone = false,
    isArchive = false,
  }) {
    super();
    this._color = color;
    this._id = id;
    this._title = title;
    this._dueDate = dueDate;
    this._tags = tags;
    this._picture = picture;
    this._repeatingDays = repeatingDays;
    this._isFavorite = isFavorite;
    this._isDone = isDone;
    this._isArchive = isArchive;

    this._element = null;

    this._state.isDate = false;
    this._state.isRepeated = false;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);

  }

  update(data) {
    this._color = data.color;
    this._id = data.id;
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._repeatingDays = data.repeatingDays;
    this._isFavorite = data.isFavorite;
    this._isDone = data.isDone;
    this._isArchive = data.isArchive;
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }
  bind() {
    this._element.querySelector(`.card__form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, this._onChangeRepeated);

    if (this._state.isDate) {
      flatpickr(`.card__date`, {altInput: true, altFormat: `j F`, dateFormat: `j F`});
      flatpickr(`.card__time`, {enableTime: true, noCalendar: true, altInput: true, altFormat: `h:i K`, dateFormat: `h:i K`});
    }

  }

  unbind() {
    this._element.querySelector(`.card__form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
      .removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
      .removeEventListener(`click`, this._onChangeRepeated);

  }



  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);
    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }
    this.update(newData);
  }


  _processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueDate: new Date(),
      isFavorite: false,
      _isDone: false,
      _isArchive: false,
      picture: `http://picsum.photos/100/100?r=${Math.random()}`,
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      }
    };
    const taskEditMapper = TaskEdit.createMapper(entry);
    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }
    return entry;
  }


  static createMapper(target) {
    return {
      hashtag: (value) => (target.tags.add(value)),
      text: (value) => (target.title = value),
      color: (value) => (target.color = value),
      repeat: (value) => (target.repeatingDays[value] = true),
      date: (value) => target.dueDate[value]
    };
  }


  unrender() {
    this.unbind();
    this._element = null;
  }



  set onSubmit(fn) {
    this._onSubmit = fn;
  }
  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;
    this._id = data.id;
    this._picture = data.picture;
    this._isFavorite = data.isFavorite;
    this._isDone = data.isDone;
    this._isArchive = data.isArchive;
  }

  get template() {
    return `
    <article class="card card--edit card--${this._color} ${this._isRepeated() ? `card--repeat` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">edit</button>
            <button type="button" class="card__btn card__btn--archive">archive</button>
            <button type="button" class="card__btn card__btn--favorites ${this._isFavorite ? null : `card__btn--disabled`}">favorites</button>
            </div>
      
            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>
      
            <div class="card__textarea-wrap">
              <label>
                <textarea class="card__text" placeholder="Start typing your text here..." name="text">${this._title}</textarea>
            </label>
          </div>
    
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">
${this._dueDate ? this._dueDate : `no`}</span>
                  </button>
                  
                        ${this._deadlineRender(this._dueDate)} 
                       
                  <button class="card__repeat-toggle" type="button">
                    repeat: <span class="card__repeat-status">
                        ${this._state.isRepeated ? `yes` : `no`}
                        </span>
                    </button>
        
                    <fieldset class="card__repeat-days" ${!this._state.isRepeated && `disabled`}>
                      <div class="card__repeat-days-inner">
                      
${this._repeatingDaysRender(this._repeatingDays, this._id)}
                    
                    </div>
                  </fieldset>
                </div>
      
                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                ${(Array.from(this._tags).map((tag) => (`
                    <span class="card__hashtag-inner">
                      <input type="hidden" name="hashtag" value="${tag}" class="card__hashtag-hidden-input" />
                      <button type="button" class="card__hashtag-name">#${tag}</button>
                      <button type="button" class="card__hashtag-delete">delete</button>
                    </span>`.trim()))).join(``)}
                </div>
    
                <label>
                  <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here" />
                </label>
              </div>
            </div>
    
            <label class="card__img-wrap card__img-wrap--empty">
              <input type="file" class="card__img-input visually-hidden" name="img" />
            </label>
    
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
              
                ${this._colorVariablesRender(this._id, this._color)}
               
              </div>
            </div>
          </div>
    
          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`.trim();
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _repeatingDaysRender(obj, id) {
    let tempHTML = ``;
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        tempHTML += `<input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-${obj[key]}-${id}" name="" value="${obj[key]}" /><label class="card__repeat-day" for="repeat-mo-${id}" ${key ? `checked` : null} >${obj[key]}</label>`;
      }
    }
    return tempHTML;
  }

  _deadlineRender(dueDate) {
    let realDate = new Date(dueDate);
    let hours = realDate.getHours();
    let minutes = realDate.getMinutes();
    let date = realDate.getDate();
    let month = realDate.getMonth() + 1;
    let fullYear = realDate.getFullYear();
    if (hours > 12) {
      hours = hours - 12;
    }
    let timeText = hours > 12 ? `PM` : `AM`;
    /*return `<fieldset class="card__date-deadline">
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder="23 September"
                        name="date"
                        value="${date} ${month} ${fullYear}"/></label>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__time"
                        type="text"
                        placeholder="11:15 PM"
                        name="time"
                        value="${hours}:${minutes} ${timeText}"/></label></fieldset>`;*/

    return `
    <fieldset class="card__date-deadline" ${!this._state.isDate ? `disabled` : null}>
                    <label class="card__input-deadline-wrap">
                      <input class="card__date" type="text" placeholder="23 September" name="date" />
                    </label>
      
                    <label class="card__input-deadline-wrap">
                      <input class="card__time" type="text" placeholder="11:15 PM" name="time" />
                    </label>
                  </fieldset>`;
  }

  _colorVariablesRender(id, color) {
    let colorVariables = this._colors.map((item) => (
      `<input type="radio" id="color-${item}-${id}"
                    class="card__color-input card__color-input--${item} visually-hidden"
                    name="color"
                    ${item === color ? `checked` : null}
                  />
                  <label
                    for="color-${item}-${this._id}"
                    class="card__color card__color--${item}"
                  >${item}</label>`
    ));
    return colorVariables.join(``);

  }
}
