const cardRender = (color, id = 1) =>
  `
   <article class="card card--${color}">
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
                class="card__btn card__btn--favorites card__btn--disabled"
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
                    ></textarea>
              </label>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">no</span>
                  </button>

                  <fieldset class="card__date-deadline">
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder="23 September"
                        name="date"
                        value="23 September"
                      />
                    </label>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__time"
                        type="text"
                        placeholder="11:15 PM"
                        name="time"
                        value="11:15 PM"
                      />
                    </label>
                  </fieldset>

                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">no</span>
                  </button>

                  <fieldset class="card__repeat-days">
                    <div class="card__repeat-days-inner">
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-mo-${id}"
                        name="repeat"
                        value="mo"
                      />
                      <label class="card__repeat-day" for="repeat-mo-${id}"
                      >mo</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-tu-${id}"
                        name="repeat"
                        value="tu"
                        checked
                      />
                      <label class="card__repeat-day" for="repeat-tu-${id}"
                      >tu</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-we-${id}"
                        name="repeat"
                        value="we"
                      />
                      <label class="card__repeat-day" for="repeat-we-${id}"
                      >we</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-th-${id}"
                        name="repeat"
                        value="th"
                      />
                      <label class="card__repeat-day" for="repeat-th-${id}"
                      >th</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-fr-${id}"
                        name="repeat"
                        value="fr"
                        checked
                      />
                      <label class="card__repeat-day" for="repeat-fr-${id}"
                      >fr</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        name="repeat"
                        value="sa"
                        id="repeat-sa-${id}"
                      />
                      <label class="card__repeat-day" for="repeat-sa-${id}"
                      >sa</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-su-${id}"
                        name="repeat"
                        value="su"
                        checked
                      />
                      <label class="card__repeat-day" for="repeat-su-${id}"
                      >su</label
                      >
                    </div>
                  </fieldset>
                </div>

                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                        <span class="card__hashtag-inner">
                          <input
                            type="hidden"
                            name="hashtag"
                            value="repeat"
                            class="card__hashtag-hidden-input"
                          />
                          <button type="button" class="card__hashtag-name">
                            #repeat
                          </button>
                          <button type="button" class="card__hashtag-delete">
                            delete
                          </button>
                        </span>

                    <span class="card__hashtag-inner">
                          <input
                            type="hidden"
                            name="hashtag"
                            value="repeat"
                            class="card__hashtag-hidden-input"
                          />
                          <button type="button" class="card__hashtag-name">
                            #cinema
                          </button>
                          <button type="button" class="card__hashtag-delete">
                            delete
                          </button>
                        </span>

                    <span class="card__hashtag-inner">
                          <input
                            type="hidden"
                            name="hashtag"
                            value="repeat"
                            class="card__hashtag-hidden-input"
                          />
                          <button type="button" class="card__hashtag-name">
                            #entertaiment
                          </button>
                          <button type="button" class="card__hashtag-delete">
                            delete
                          </button>
                        </span>
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
                  src="img/sample-img.jpg"
                  alt="task picture"
                  class="card__img"
                />
              </label>

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  <input
                    type="radio"
                    id="color-black-${id}"
                    class="card__color-input card__color-input--black visually-hidden"
                    name="color"
                    value="black"
                  />
                  <label
                    for="color-black-${id}"
                    class="card__color card__color--black"
                  >black</label
                  >
                  <input
                    type="radio"
                    id="color-yellow-${id}"
                    class="card__color-input card__color-input--yellow visually-hidden"
                    name="color"
                    value="yellow"
                  />
                  <label
                    for="color-yellow-${id}"
                    class="card__color card__color--yellow"
                  >yellow</label
                  >
                  <input
                    type="radio"
                    id="color-blue-${id}"
                    class="card__color-input card__color-input--blue visually-hidden"
                    name="color"
                    value="blue"
                  />
                  <label
                    for="color-blue-${id}"
                    class="card__color card__color--blue"
                  >blue</label
                  >
                  <input
                    type="radio"
                    id="color-green-${id}"
                    class="card__color-input card__color-input--green visually-hidden"
                    name="color"
                    value="green"
                    checked
                  />
                  <label
                    for="color-green-${id}"
                    class="card__color card__color--green"
                  >green</label
                  >
                  <input
                    type="radio"
                    id="color-pink-${id}"
                    class="card__color-input card__color-input--pink visually-hidden"
                    name="color"
                    value="pink"
                  />
                  <label
                    for="color-pink-${id}"
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
`;


export default cardRender;
