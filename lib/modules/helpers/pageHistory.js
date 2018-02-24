import handleEvents from './events'
import ajaxLoad from 'helpers/ajax'

// loaded pages array, start by adding the current one when loading the first page
let loaded = [
  {
    url: window.location.pathname,
    data: document.querySelector('main').outerHTML,
    title: document.querySelector('title').text,
  },
]

/**
 * History mgmt, replace DOM and re-attach event listeners
 * @param {String} url
 * @param {Object} data - DOM node <main></main>
 * @param {Object} title - DOM node <title></title>
 * @param {Boolean} push - true when coming from ajax
 */
const replaceInnerHTML = (url, data, title, push = false) => {
  push && loaded.push({ url, data, title }) // add page to loaded pages
  history.pushState(null, null, url)
  document.querySelector('main').outerHTML = data
  document.title = title
  positionMenuTitle()
  handleEvents()
}

/**
 * Calculate ideal menu bar title (on the right) on big screens
 */
const positionMenuTitle = () => {
  const page = document.querySelector('[data-page]') && document.querySelector('[data-page]').dataset.page
  const menuTitle = document.querySelector(`.at_menu__${page}--appeared .title`)
  if (menuTitle && window.outerWidth > 1223) {
    const left = `calc((100vw + 100vh) / 2 - (${menuTitle.clientWidth}px / 2))`
    menuTitle.style.left = left
  }
}

/**
 * Retrieve data if url already visited, otherwise get it from ajax
 * @param {String} url
 */
const getData = url => {
  const founded = loaded.reduce((acc, cur) => (cur.url === url ? cur : acc), {})
  Object.keys(founded).length
    ? replaceInnerHTML(url, founded.data, founded.title)
    : ajaxLoad(url)
        .then(d => replaceInnerHTML(url, d.querySelector('main').outerHTML, d.querySelector('title').text, true))
        .catch(err => console.log('Error in getData:', err))
}

/**
 * Remove last element in "loaded" array and return previous url
 */
const pop = () => {
  loaded.pop()
  return loaded.length > 0 ? loaded[loaded.length - 1].url : '/'
}

export { getData, pop }
