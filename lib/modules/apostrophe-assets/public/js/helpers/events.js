import ajaxLoad from './ajax'
import chainify from './chainify'
import replaceInnerHTML from './pageHistory'

/**
 * Add class to toggle menu animation and load page
 * @param {Array} divs
 * @param {Number} number
 * @param {String} url
 */
const displayPage = (divs, number, url, pop = false) => {
  const root = 'at_menu'
  const menuBar = document.querySelector(`.${root}__${number}`)
  const atContent = document.querySelector('.at_content')
  const showPage = document.querySelector('.at.show')

  if (atContent) {
    atContent.classList.remove('slide-up')
    atContent.classList.add('slide-down')
  }

  // if page to display is not a show.html template
  // activate menu bars animations
  if (!showPage) {
    // re-enable swing animation on menu bars in homepage
    menuBar.classList.remove(`${root}__${number}--appeared`)

    divs.forEach(
      (div, i) =>
        number - 1 === i
          ? div.classList.toggle(`${root}__${i + 1}--appear`)
          : div.classList.toggle(`${root}__${i + 1}--disappear`)
    )
  }

  handleTransitionEnd(`.${root}__${divs.length}`, !!showPage, pop)
    .then(_ => {
      if (pop) replaceInnerHTML()
      else ajaxLoad(url, replaceInnerHTML)
    })
    .then(_ => {
      const title = menuBar.querySelector('[title]').attributes.title.value
      let array = document.title.split(' | ')
      chainify(array, ['pop', 'push', 'join'], Array) // add some Array functions to the array instance
      array = array.pop().push(title).join(' | ', true) // in order to chainify calls
      document.title = array // replace title document after DOM replacement
    })
    .catch(err => {
      throw new Error(err)
    })
}

/**
 * Browse menu bars and attach click events
 */
const handleMenuClick = () => {
  const divs = document.querySelectorAll('[page]')
  /**
   * Attach event listener on menu elements
   * e.target.attributes.page.value : data attribute on div element
   */
  divs.forEach(div =>
    div.addEventListener('click', e => {
      let page, url
      if (e.target.attributes.page && e.target.classList.contains('attr')) {
        // click on nav element on home
        page = e.target.attributes.page.value
        url = e.target.attributes.url.value
        displayPage(divs, page, url)
      } else if (e.target.classList.contains('attr-1-level')) {
        // click on span element (page title) on home or breadcrumb on pages
        page = e.target.parentNode.attributes.page.value
        url = e.target.parentNode.attributes.url.value
        displayPage(divs, page, url)
      } else if (e.target.classList.contains('attr-2-levels')) {
        // click on svg back button in page
        page = e.target.parentNode.parentNode.attributes.page.value
        url = e.target.parentNode.parentNode.attributes.url.value
        displayPage(divs, page, url)
      }
    })
  )
}

/**
 * Browse links and attach click events
 */
const handleHrefClick = () => {
  const links = document.querySelectorAll('[href]')
  /**
   * Attach event listener on <a href> links
   * e.target.pathname: url to load
   */
  links.forEach(link =>
    link.addEventListener('click', e => {
      e.preventDefault()
      ajaxLoad(e.target.pathname, replaceInnerHTML)
    })
  )
}

/**
 * Listen to end of transition on the last menu bar on homepage
 * @param {String} selector
 * @param {Boolean} showPage - true if current page is a show.html template
 * @param {Boolean} pop - true if coming from popstate event
 */
const handleTransitionEnd = (selector, showPage, pop) => {
  return new Promise((resolve, reject) => {
    // if current page is a show.html template and the direction is going back to the previous page loaded in browser
    // there will be no menu bars transition, so resolve the promise ASAP
    if (showPage && pop) resolve()

    const element = document.querySelector(selector)
    if (!element) reject(new Error(`missing selector ${selector}`))
    element.addEventListener('transitionend', _ => resolve())
  })
}

/**
 * Handle history back, i.e when clicking on back button in browser
 */
window.addEventListener('popstate', _ => {
  const divs = document.querySelectorAll('[page]')
  const menuBar = document.querySelector('[class$="--appeared"]')
  if (menuBar) {
    const page = menuBar.attributes.page.value
    const url = menuBar.attributes.url.value
    displayPage(divs, page, url, true)
  } else document.location.reload()
})

/**
 * Browse links and menu bars, and attach click events
 */
const handleEvents = () => {
  handleMenuClick()
  handleHrefClick()
}

export default handleEvents
