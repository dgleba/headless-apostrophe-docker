/**
 * displayPage : add class to toggle menu page
 * @param {int} event
 */
const displayPage = (number, url) => {
  const root = 'at_menu'

  divs.forEach(
    (div, i) =>
      number - 1 === i
        ? div.classList.toggle(`${root}__${i + 1}--appear`)
        : div.classList.toggle(`${root}__${i + 1}--disappear`)
  )
  document.querySelector(`.${root}`).classList.add(`${root}--appear`)
  $.ajax({ url }).done(data =>
    document
      .querySelector(`.${root}__${divs.length}`)
      .addEventListener('transitionend', _ => {
        document.querySelector('.apos-refreshable').innerHTML = data
      })
  )
}

const divs = document.querySelectorAll('[page]')

/**
 * Attach event listener on menu elements
 * e.target.attributes.page.value : data attribute on div element
 */
divs.forEach(div =>
  div.addEventListener('click', e =>
    displayPage(e.target.attributes.page.value, e.target.attributes.url.value)
  )
)
