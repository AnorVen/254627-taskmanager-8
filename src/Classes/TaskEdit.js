import Component from './Component';
import flatpickr from 'flatpickr';
import moment from 'moment';

export class TaskEdit extends Component {
  constructor({
                id,
                color,
                title,
                dueDate,
                tags,
                picture,
                repeatingDays,
                isFavorite,
                isDone,
                isArchive,
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

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
    this._onChangePicture = this._onChangePicture.bind(this);
    this._onAddHashtags = this._onAddHashtags.bind(this);
    this._onChangeHashtags = this._onChangeHashtags.bind(this);
    this._onDeleteHashtags = this._onDeleteHashtags.bind(this);
    this._deleteHashtag = this._deleteHashtag.bind(this);

    this._state.isRepeated = this._isRepeated();
    this._state.isDate = false;
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
    //   debugger
  }

  bind() {
    this._element
      .querySelector(`.card__form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);
    this._element
      .querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, this._onChangeDate);
    this._element
      .querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, this._onChangeRepeated);
    this._element
      .querySelector(`.card__img-input`)
      .addEventListener(`change`, this._onChangePicture);
    this._element
      .querySelector(`.card__hashtag-input`)
      .addEventListener(`change`, this._onAddHashtags);
    this._element
      .querySelector(`.card__hashtag-list`)
      .addEventListener(`click`, this._onChangeHashtags);
    this._element
      .querySelector(`.card__hashtag-list`)
      .addEventListener(`click`, this._onDeleteHashtags);


    // input.card__date.flatpickr-input[type='hidden']

    if (this._state.isDate) {
      const calendar = flatpickr(`.card__date`, {
        altInput: true,
        altFormat: `j F`,
        dateFormat: `j F`,
        mode: "range",
        minDate: "today",
      });
     const time =  flatpickr(`.card__time`, {
        enableTime: true,
        noCalendar: true,
        altInput: true,
        altFormat: `h:i K`,
        dateFormat: `h:i K`,
        mode: "range"
      });

     console.log(calendar)
    }
  }

  unbind() {
    this._element
      .querySelector(`.card__form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element
      .querySelector(`.card__date-deadline-toggle`)
      .removeEventListener(`click`, this._onChangeDate);
    this._element
      .querySelector(`.card__repeat-toggle`)
      .removeEventListener(`click`, this._onChangeRepeated);
    this._element
      .querySelector(`.card__img-input`)
      .removeEventListener(`click`, this._onChangePicture);
    this._element
      .querySelector(`.card__hashtag-input`)
      .removeEventListener(`change`, this._onAddHashtags);
    this._element
      .querySelector(`.card__hashtag-list`)
      .removeEventListener(`click`, this._onChangeHashtags);
    this._element
      .querySelector(`.card__hashtag-list`)
      .removeEventListener(`click`, this._onDeleteHashtags);
  }

  _onAddHashtags(e) {
    e.preventDefault();
    this._tags = this._tags.add(e.target.value);
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onChangeHashtags(e) {
    let target = e.target;
    while (target !== this._element.querySelector(`.card__hashtag-list`)) {
      if (target.className === `card__hashtag-name`) {
        this._element.querySelector(`.card__hashtag-input`).value = e.target.dataset.name;
        this._deleteHashtag(e.target.dataset.name);
        return;
      }
      target = target.parentNode;
    }
  }

  _onDeleteHashtags(e) {
    let target = e.target;
    while (target !== this._element.querySelector(`.card__hashtag-list`)) {
      if (target.className === `card__hashtag-delete`) {
        this._deleteHashtag(e.target.dataset.name);
        this.unbind();
        this._partialUpdate();
        this.bind();
        return;
      }
      target = target.parentNode;
    }
  }

  _deleteHashtag(value) {
    this._tags.delete(value);
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

  _onChangePicture(e) {
    this._picture = e.target.value;
    this.unbind();
    this._partialUpdate();
    this.bind();
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
      picture: ``,
      id: ``,
      repeatingDays: {
        mo: false,
        tu: false,
        we: false,
        th: false,
        fr: false,
        sa: false,
        su: false,
      },
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

  // TODO picture -    ????
  //  picture: (value) => {
  //         console.log(value)
  //         return (target.picture = typeof value === `File` ?
  //           (value.webkitRelativePath + value.name) : value);
  //       },
  //

  static createMapper(target) {
    return {
      id: (value) => (target.id = value),
      picture: (value) => (target.img = value),
      hashtag: (value) => target.tags.add(value),
      text: (value) => (target.title = value),
      color: (value) => (target.color = value),
      repeat: (value) => (target.repeatingDays[value] = true),
      date: (value) => target.dueDate[value],
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

  get template() {
    return `
    <article class="card card--edit card--${this._color} ${
      this._isRepeated() ? `card--repeat` : ``
      }">
      <form class="card__form" method="get">
          <input type="hidden" value="${this._id}" class="hidden" name="id">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">edit</button>
            <button type="button" class="card__btn card__btn--archive">archive</button>
            <button type="button" 
                    class="card__btn card__btn--favorites 
                    ${this._isFavorite ? null : `card__btn--disabled`}">
                    favorites</button>
            </div>
      
            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>
      
            <div class="card__textarea-wrap">
              <label>
                <textarea class="card__text"
                 placeholder="Start typing your text here..." 
                 name="text">${this._title}</textarea>
            </label>
          </div>
    
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
               <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
                </button>
                 <fieldset 
                  class="card__date-deadline" ${!this._state.isDate ? `disabled` : ``}>
                    <label class="card__input-deadline-wrap">
                      <input class="card__date" type="text" placeholder="23 September" name="date" />
                    </label>
                    <label class="card__input-deadline-wrap">
                      <input class="card__time" type="text" placeholder="11:15 PM" name="time" />
                    </label>
                  </fieldset>
                       
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
      ${Array.from(this._tags)
      .map((tag) =>
        `<span class="card__hashtag-inner">
                <input type="hidden"
                name="hashtag"
                value="${tag}"
                 class="card__hashtag-hidden-input" />
                <button
                  type="button"
                  class="card__hashtag-name"
                  data-name="${tag}">#${tag}</button>
                <button
                  type="button"
                  data-name="${tag}"
                  class="card__hashtag-delete">delete</button>
              </span>`.trim(),
      )
      .join(``)}
             </div>
          <label>
           <input 
              type="text"
              class="card__hashtag-input" 
              name="hashtag-input" 
              placeholder="Type new hashtag here" />
          </label>
              </div>
            </div>
              <label class="card__img-wrap ${this._picture ? `` : `card__img-wrap--empty`} ">
              <input 
                type="file"            
                class="card__img-input visually-hidden"
                name="img"
               />
              <img
                      src="${this._picture || `img/sample-img.jpg`} "
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
    </article>`.trim();
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _repeatingDaysRender(obj, id) {
    let tempHTML = ``;
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        tempHTML += `
          <input class="visually-hidden card__repeat-day-input" 
          type="checkbox" 
          id="repeat-${key}-${id}" 
          name="repeat" 
          value="${key}"
          ${obj[key] ? `checked` : null}
               />
          <label class="card__repeat-day" 
                for="repeat-${key}-${id}" >${key}</label>`;
      }
    }
    return tempHTML;
  }

  _colorVariablesRender(id, color) {
    let colorVariables = this._colors.map(
      (item) =>
        `<input
        type="radio"
        id="color-${item}-${id}"
        class="card__color-input card__color-input--${item} visually-hidden"
        name="color"
        value="${item}"
        ${item === color ? `checked` : null}
        />
      <label 
        for="color-${item}-${this._id}"
        class="card__color card__color--${item}"
        >${item}</label>`,
    );
    return colorVariables.join(``);
  }
}
