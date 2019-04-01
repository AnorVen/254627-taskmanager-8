
import Component from './Component';
export class Task extends Component {
  constructor({
    id = 1,
    color = `black`,
    title = `пустой таск, видимо тренеровочный...`,
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
    deleted = false,
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
    this.deleted = deleted;

    this._element = null;
    this._onEdit = null;
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`).addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }
  unbind() {
    this._element.querySelector(`.card__btn--edit`).removeEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  set onEdit(fn) {
    this._onEdit = fn;
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


  get template() {
    return (`<article data-id="${this._id}" class="card card--${this._color} ${this._isRepeated() ? `card--repeat` : ``}" >
          <form class="card__form" method="get">
          <input type="hidden" value="${this._id}" class="hidden" name="id">
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

                 <fieldset class="card__date-deadline" ${!this._state.isDate && `disabled`}>
                      <label class="card__input-deadline-wrap">
                        <input
                          class="card__date"
                          type="text"
                          placeholder="23 September"
                          name="date"
                          /></label>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__time"
                        type="text"
                        placeholder="11:15 PM"
                        name="time"
                        /></label></fieldset>

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
      </article>
    `.trim());
  }

  // вспомогательные функции для рендера
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

  _tagsRender(tags) {
    if (Array.from(tags).length > 2) {
      tags = Array.from(tags);
      let newItems = [];
      for (let i = 0; i < 2; i++) {
        let idx = Math.floor(Math.random() * tags.length);
        newItems.push(tags[idx]);
        tags.splice(idx, 1);
      }
      tags = newItems;
    }
    return (Array.from(tags).map((tag) => `<span class="card__hashtag-inner">
       <input type="hidden" name="hashtag" value="${tag}" class="card__hashtag-hidden-input" />
    <button type="button" class="card__hashtag-name">#${tag}</button>
    <button type="button" class="card__hashtag-delete">delete</button>
    </span>`.trim()).join(``));
  }
  _colorVariablesRender(id, color) {

    let colorVariables = this._colors.map((item) => (
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
}
