/**
 * displayPage : add class to toggle menu page
 * @param {int} event
 */
const displayPage = number =>
  divs.forEach(
    (div, i) =>
      number === i
        ? div.classList.toggle('appear')
        : div.classList.toggle('disappear')
  )

const divs = document.querySelectorAll('[page]')
/**
 * Attach event listener on menu elements
 * e.target.attributes.page.value : data attribute on div element
 */
divs.forEach(div =>
  div.addEventListener("click", e =>
    displayPage(e.target.attributes.page.value - 1)
  )
)
