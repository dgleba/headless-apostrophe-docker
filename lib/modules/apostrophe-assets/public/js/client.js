/**
 * displayPage : add class to toggle menu page
 * @param {int} event
 */
const displayPage = (divs, number, url) => {
  const root = 'at_menu'
  const at_content = document.querySelector('.at_content')

  if (at_content) {
    at_content.classList.remove('slide-up')
    at_content.classList.add('slide-down')
  }
  document
    .querySelector(`.${root}__${number}`)
    .classList.remove(`${root}__${number}--appeared`) // remove width of 100%

  divs.forEach(
    (div, i) =>
      number - 1 === i
        ? div.classList.toggle(`${root}__${i + 1}--appear`)
        : div.classList.toggle(`${root}__${i + 1}--disappear`)
  )

  $.ajax({ url }).done(data => {
    history.pushState(null, null, url)
    document
      .querySelector(`.${root}__${divs.length}`)
      .addEventListener('transitionend', _ => {
        document.querySelector(`.${root}`).classList.add(`${root}--appear`)
        document.querySelector('.apos-refreshable').innerHTML = data
        handleClickMenu()
      })
  })
}

const handleClickMenu = () => {
  const divs = document.querySelectorAll('[page]')
  const length = divs.length
  /**
   * Attach event listener on menu elements
   * e.target.attributes.page.value : data attribute on div element
   */
  divs.forEach(div =>
    div.addEventListener('click', e => {
      let page, url
      if (
        e.target.attributes.page &&
        e.target.attributes.active.value === 'true'
      ) {
        // click on nav element on home
        page = e.target.attributes.page.value
        url = e.target.attributes.url.value
        displayPage(divs, page, url)
      } else if (
        e.target.nodeName === 'SPAN' &&
        e.target.parentNode.attributes.active.value === 'true'
      ) {
        // click on span element (page title) on home
        page = e.target.parentNode.attributes.page.value
        url = e.target.parentNode.attributes.url.value
        displayPage(divs, page, url)
      } else if (e.target.nodeName === 'svg') {
        // click on svg back button in page
        page = e.target.parentNode.parentNode.attributes.page.value
        url = e.target.parentNode.parentNode.attributes.url.value
        displayPage(divs, page, url)
      }
    })
  )
}

handleClickMenu()
