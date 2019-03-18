import {createElement} from '../createElement';
import Component from './Component';
export class TaskEdit extends Component{
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
    this._state = {
      isEdit: false
    };
  }


  bind() {
    this._element.querySelector(`.card__form`).addEventListener(`submit`, this._onSubmitButtonClick.bind(this));
  }
  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
  }
  unrender() {
    this.unbind();
    this._element = null;
  }

  unbind() {
    this._element.querySelector(`.card__form`).removeEventListener(`submit`, this._onSubmitButtonClick.bind(this));
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get element() {
    return this._element;
  }

  get template() {
    return `
    <article class="card card--edit card--blue ${this._isRepeated() ? `card--repeat` : ``}">
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
                    repeat: <span class="card__repeat-status">no</span>
                  </button>
      
                  <fieldset class="card__repeat-days" disabled>
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
    return `<fieldset class="card__date-deadline">
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
                        value="${hours}:${minutes} ${timeText}"/></label></fieldset>`;
  }

  _colorVariablesRender(id, color) {
    let colors = [`black`, `yellow`, `blue`, `green`, `pink`];
    let colorVariables = colors.map((item) => (
      `<input type="radio" id="color-${item}-${id}"
                    class="card__color-input card__color-input--${item} visually-hidden"
                    name="color"
                    value="${item}"
                    ${item === color ? `checked` : null}
                  />
                  <label
                    for="color-${item}-${this._id}"
                    class="card__color card__color--${item}"
                  >${item}</label>`
    ));
    return colorVariables.join(``);

  }


  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }
}
