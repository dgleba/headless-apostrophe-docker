import ajaxLoad from './ajax'
import chainify from './chainify'
import { replaceInnerHTML, getDataIfLoaded, pop } from './pageHistory'

/**
 * Add class to toggle menu animation and load page
 * @param {Number} number
 * @param {String} url
 */
const displayPage = (number, url) => {
  const root = 'at_menu'
  const navs = document.querySelectorAll('nav[page]')
  const menuBar = document.querySelector(`.${root}__${number}`)
  const atContent = document.querySelector('.at_content')
  const showPage = document.querySelector('.at.show')

  if (atContent) {
    atContent.classList.remove('slide-up')
    atContent.classList.add('slide-down')
  }

  // if page to display is not a show.html template
  // or is a show.html template but popping to homepage
  // activate menu bars animations
  if (!showPage || (showPage && url === '/')) {
    // re-enable swing animation on menu bars in homepage
    menuBar.classList.remove(`${root}__${number}--appeared`)

    navs.forEach(
      (nav, i) =>
        number - 1 === i
          ? nav.classList.toggle(`${root}__${i + 1}--appear`)
          : nav.classList.toggle(`${root}__${i + 1}--disappear`)
    )
  }

  handleTransitionEnd(`.${root}__${navs.length}`, !!showPage, url)
    .then(_ => getDataIfLoaded(url))
    .then(data => {
      if (data) replaceInnerHTML(url, data)
      else ajaxLoad(url, data => replaceInnerHTML(url, data, true))
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
 * Browse clickable HTML tags with "page" attribute and attach click events
 */
const handleMenuClick = () => {
  const clickableElements = document.querySelectorAll('[page]')

  /**
   * Attach event listener
   * e.target.attributes.page.value : data attribute on clicked tag
   */
  clickableElements.forEach(el =>
    el.addEventListener('click', e => {
      e.stopPropagation()

      let page, url
      if (!e.target.attributes.page) {
        // in case of svg
        page = e.target.parentNode.attributes.page.value
        url = e.target.parentNode.attributes.url.value
      } else {
        page = e.target.attributes.page.value
        url = e.target.attributes.url.value
      }

      if (page && url) displayPage(page, url)
    })
  )
}

/**
 * Browse <a href> links and attach click events
 */
const handleHrefClick = () => {
  if (apos.scene === 'anon') {
    const links = document.querySelectorAll('[href].ajax')
    /**
     * Attach event listener on <a href> links
     * e.target.pathname: url to load
     */
    links.forEach(link =>
      link.addEventListener('click', e => {
        e.preventDefault()
        const url = e.target.pathname
        ajaxLoad(url, data => replaceInnerHTML(url, data, true))
      })
    )
  }
}

/**
 * Listen to end of transition on the last menu bar on homepage
 * @param {String} selector
 * @param {Boolean} showPage - true if current page is a show.html template
 * @param {String} url
 */
const handleTransitionEnd = (selector, showPage, url) => {
  return new Promise((resolve, reject) => {
    // if current page is a show.html template and the direction is going back to the index page of the same type
    // there will be no menu bars transition, so resolve the promise ASAP
    if (showPage && url !== '/') resolve()

    const element = document.querySelector(selector)
    if (!element) reject(new Error(`missing selector ${selector}`))
    element.addEventListener('transitionend', _ => resolve())
  })
}

/**
 * Handle history back, i.e when clicking on back button in browser
 */
window.addEventListener('popstate', e => {
  const menuBar = document.querySelector('[class$="--appeared"]')
  if (menuBar) {
    const page = menuBar.attributes.page.value
    const url = pop()
    displayPage(page, url)
  } else document.location.reload()
})

/**
 * Browse <a href> links and menu bars, and attach click events
 */
const handleEvents = () => {
  handleMenuClick()
  handleHrefClick()
}

export default handleEvents
