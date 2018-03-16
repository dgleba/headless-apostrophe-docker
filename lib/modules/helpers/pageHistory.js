// import { default as matchRoutePattern } from 'match-route-pattern'
import { handleEvents, ajaxLoad } from 'helpers'

const nav = document.querySelector('[class$="--appeared"]')

// cache of loaded pages, start by adding the current one when loading the first page
let loaded = [
  {
    url: window.location.pathname,
    data: document.querySelector('main').outerHTML,
    title: document.querySelector('title').text,
  },
]

// log of urls visited in order
let sessionHistory = [window.location.pathname]

/**
 * Match a pattern against an url
 * @param {String} pattern - route with name parameters
 * @param {String} url
 */
const matchRoutePattern = (pattern, url) => {
  const regex = pattern.replace(/:([^/]+)/g, '([^/]+)')
  const r = new RegExp(`^${regex}$`)
  return r.test(url)
}

/**
 * History mgmt, replace DOM and re-attach event listeners
 * @param {String} url
 * @param {Object} data - DOM node <main></main>
 * @param {Object} title - DOM node <title></title>
 * @param {Boolean} push - true when coming from ajax
 */
const replaceInnerHTML = (url, data, title, push = false) => {
  const showPage = matchRoutePattern('/:index/:show', url)
  push && loaded.push({ url, data, title, nav }) // add page to loaded pages
  history.pushState(null, null, url)
  sessionHistory.push(url)

  document.querySelector('main').outerHTML = data
  document.title = title
  if (showPage)
    document.querySelector('[class$="--appeared"] .at_menu__back.breadcrumb').classList.add('breadcrumb--show')

  handleEvents()
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

const getPreviousUrl = () => sessionHistory[sessionHistory.length - 1]

export { getData, getPreviousUrl }
