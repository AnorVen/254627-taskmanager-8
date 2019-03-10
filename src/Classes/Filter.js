export class Filter {
  constructor({TITLE, COUNT = 0, CHECKED = false}) {
    this._TITLE = TITLE;
    this._COUNT = COUNT;
    this._CHECKED = CHECKED;
  }

  get render() {
    return (`<input type="radio"
          id="filter__${this._TITLE.toLowerCase()}"
          class="filter__input visually-hidden"
          name="filter"
          ${this._CHECKED ? `CHECKED` : ``}
          ${this._COUNT === 0 ? `disabled` : ``}
        />
        <label for="filter__${this._TITLE.toLowerCase()}" class="filter__label">
          ${this._TITLE.toUpperCase()} <span class="filter__all-COUNT">${this._COUNT}</span></label
        >`);
  }
}
