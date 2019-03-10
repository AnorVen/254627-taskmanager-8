import {createElement} from '../createElement';




export class Task {
  constructor({
                id = 1,
                color = `black`,
                title = `пустой таск, видимо тренеровочный...`,
                dueDate = new Date(),
                tags = new Set([]),
                picture = `http://picsum.photos/100/100?r=${Math.random()}`,
                REPEAT_DAYS = {
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
    this._color = color;
    this._id = id;
    this._title = title;
    this._dueDate = dueDate;
    this._tags = tags;
    this._picture = picture;
    this._repeatingDays = REPEAT_DAYS;
    this._isFavorite = isFavorite;
    this._isDone = isDone;
    this._isArchive = isArchive;

    this._element = null;
    this._state = {
      isEdit: false
    };
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some(it => it === true);
  }

  _repeatingDaysRender(obj, id) {
    let tempHTML = ``;
    for (let key in obj) {
      tempHTML += `<input class="visually-hidden card__repeat-day-input" type="checkbox"
        id="repeat-${obj[key]}-${id}" name="" value="${obj[key]}" />
    <label class="card__repeat-day" for="repeat-mo-${id}" ${key ? `checked` : null} >${obj[key]}</label>`;
    }
    return tempHTML;
  }

  _tagsRender(tags) {
    if (Array.from(tags).length > 2) {
      tags = Array.from(tags)
      let newItems = [];
      for (let i = 0; i < 2; i++) {
        let idx = Math.floor(Math.random() * tags.length);
        newItems.push(tags[idx]);
        tags.splice(idx, 1);
      }
      tags = newItems;
    }
    return (Array.from(tags).map((tag) => `<span class="card__hashtag-inner">
       <input type="hidden" name="hashtag" value="${tag}" 
class="card__hashtag-hidden-input" />
    <button type="button" class="card__hashtag-name">#${tag}</button>
    <button type="button" class="card__hashtag-delete">delete</button>
    </span>`.trim()).join(``));
  }

  _deadlineRender(dueDate) {
    let realDate = new Date(dueDate);
    let hours = realDate.getHours();
    let tempHTML = `<fieldset class="card__date-deadline">
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder="23 September"
                        name="date"
                        value="${realDate.getDate()} ${realDate.getMonth() + 1} ${realDate.getFullYear()}"
                      />
                    </label>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__time"
                        type="text"
                        placeholder="11:15 PM"
                        name="time"
                        value="${hours > 12 ? (hours - 12) : hours}:${realDate.getMinutes()} ${hours > 12 ? `PM` : `AM`}
                        "
                      />
                    </label>
                  </fieldset>`;
    return tempHTML;
  }

  get template() {
    return (`<article class="card card--${this._color} ${this._isRepeated() ? `card--repeat` : ``}" >
          <form class="card__form" method="get">
            <div class="card__inner">
              <div class="card__control">
                <button type="button" class="card__btn card__btn--edit">
                  edit
                </button>
                <button type="button" class="card__btn card__btn--archive">
                  archive
                </button>
                <button
                  type="button"
                  class="card__btn card__btn--favorites ${this._isFavorite ? null : `card__btn--disabled`}"
              >
                favorites
              </button>
            </div>

            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <label>
                    <textarea
                      class="card__text"
                      placeholder="Start typing your text here..."
                      name="text"
                    >${this._title}</textarea>
              </label>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">${this._dueDate ? this._dueDate : `no`}</span>
                  </button>

                  ${this._deadlineRender(this._dueDate)}

                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">no</span>
                  </button>

                  <fieldset class="card__repeat-days">
                    <div class="card__repeat-days-inner">
                    ${this._repeatingDaysRender(this._repeatingDays, this._id)}
                   
                    </div>
                  </fieldset>
                </div>

                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                  ${this._tagsRender(this._tags)}
                  
                      
                  </div>

                  <label>
                    <input
                      type="text"
                      class="card__hashtag-input"
                      name="hashtag-input"
                      placeholder="Type new hashtag here"
                    />
                  </label>
                </div>
              </div>

              <label class="card__img-wrap">
                <input
                  type="file"
                  class="card__img-input visually-hidden"
                  name="img"
                />
                <img
                  src="${this._picture}"
                  alt="task picture"
                  class="card__img"
                />
              </label>

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  <input
                    type="radio"
                    id="color-black-${this._id}"
                    class="card__color-input card__color-input--black visually-hidden"
                    name="color"
                    value="black"
                  />
                  <label
                    for="color-black-${this._id}"
                    class="card__color card__color--black"
                  >black</label
                  >
                  <input
                    type="radio"
                    id="color-yellow-${this._id}"
                    class="card__color-input card__color-input--yellow visually-hidden"
                    name="color"
                    value="yellow"
                  />
                  <label
                    for="color-yellow-${this._id}"
                    class="card__color card__color--yellow"
                  >yellow</label
                  >
                  <input
                    type="radio"
                    id="color-blue-${this._id}"
                    class="card__color-input card__color-input--blue visually-hidden"
                    name="color"
                    value="blue"
                  />
                  <label
                    for="color-blue-${this._id}"
                    class="card__color card__color--blue"
                  >blue</label
                  >
                  <input
                    type="radio"
                    id="color-green-${this._id}"
                    class="card__color-input card__color-input--green visually-hidden"
                    name="color"
                    value="green"
                    checked
                  />
                  <label
                    for="color-green-${this._id}"
                    class="card__color card__color--green"
                  >green</label
                  >
                  <input
                    type="radio"
                    id="color-pink-${this._id}"
                    class="card__color-input card__color-input--pink visually-hidden"
                    name="color"
                    value="pink"
                  />
                  <label
                    for="color-pink-${this._id}"
                    class="card__color card__color--pink"
                  >pink</label
                  >
                </div>
              </div>
            </div>

            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>
    `.trim());
  }



  bind() {
    this._element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  _onEditButtonClick() {
    this._state.isEdit = !this._state.isEdit;
    this.update();
  }
  update() {
    if (this._state.isEdit) {
      return this._element.classList.add(`card--edit`);
    }

    this._element.classList.remove(`card--edit`);
  }
  render(container) {
    if (this._element) {
      container.removeChild(this._element);
      this._element = null;
    }
    this._element = createElement(this.template);
    container.appendChild(this._element);

    this.bind();
    this.update();
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
  unbind() {
    // Удаление обработчиков
  }
}
