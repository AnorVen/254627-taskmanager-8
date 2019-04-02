import Component from './Component';
export class Filter extends Component {
  constructor({title, count = 0, checked = false}) {
    super();
    this._title = title;
    this._count = count;
    this._checked = checked;
    this._onFilter = null;
    this._element = null;
  }
  bind() {
    this._element.addEventListener(`click`, this._onEFilterButtonClick);
  }
  unbind() {
    this._element.removeEventListener(`click`, this._onEFilterButtonClick);
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }


  _onEFilterButtonClick() {
    if (typeof this._onFilter === `function`) {
      this._onFilter();
    }
  }

  onFilter(fn) {
    this._onFilter = fn;
  }
  get template() {
    return (`<div>
          <input type="radio"
          id="filter__${this._title.toLowerCase()}"
          class="filter__input visually-hidden"
          name="filter"
          ${this._checked ? `CHECKED` : ``}
          ${this._count === 0 ? `disabled` : ``}
        >
        <label for="filter__${this._title.toLowerCase()}" class="filter__label">
          ${this._title.toUpperCase()} <span class="filter__all-COUNT">${this._count}</span>
          </label>
        </div>`);
  }
}
