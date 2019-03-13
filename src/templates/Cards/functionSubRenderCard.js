export function repeatingDaysRender(obj, id) {
  let tempHTML = ``;
  for (let key in obj) {
    tempHTML += `<input class="visually-hidden card__repeat-day-input" type="checkbox"
        id="repeat-${obj[key]}-${id}" name="" value="${obj[key]}" />
    <label class="card__repeat-day" for="repeat-mo-${id}" ${key ? `checked` : null} >${obj[key]}</label>`;
  }
  return tempHTML;
}

export function tagsRender(tags) {
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
  return Array.from(tags)
    .map((tag) =>
      `<span class="card__hashtag-inner">
       <input type="hidden" name="hashtag" value="${tag}" 
class="card__hashtag-hidden-input" />
    <button type="button" class="card__hashtag-name">#${tag}</button>
    <button type="button" class="card__hashtag-delete">delete</button>
    </span>`.trim()
    )
    .join(``);
}

export function deadlineRender(dueDate) {
  let realDate = new Date(dueDate);
  let hours = realDate.getHours();

  return `<fieldset class="card__date-deadline">
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder="23 September"
                        name="date"
                        value="${realDate.getDate()} ${realDate.getMonth() +
    1} ${realDate.getFullYear()}"
                      />
                    </label>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__time"
                        type="text"
                        placeholder="11:15 PM"
                        name="time"
                        value="${hours > 12 ? hours - 12 : hours}:${realDate.getMinutes()} ${hours > 12 ? `PM` : `AM`}
                        "
                      />
                    </label>
                  </fieldset>`;
}
