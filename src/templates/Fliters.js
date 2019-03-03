const filterRender = ({TITLE, COUNT = 0, checked = false}) =>
  `<input type="radio"
          id="filter__${TITLE.toLowerCase()}"
          class="filter__input visually-hidden"
          name="filter"
          ${checked ? `checked` : ``}
          ${COUNT === 0 ? `disabled` : ``}
        />
        <label for="filter__${TITLE.toLowerCase()}" class="filter__label">
          ${TITLE.toUpperCase()} <span class="filter__all-count">${COUNT}</span></label
        >`;
export default filterRender;
