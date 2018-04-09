import { handleEvents, ajaxLoad } from 'helpers'

// cache of loaded pages, start by adding the current one when loading the first page
let loaded = [
  {
    url: window.location.pathname,
    data: document.querySelector('body').innerHTML,
    title: document.querySelector('title').text,
  },
]

// log of urls visited in order
let sessionHistory = [window.location.pathname]

/**
 * History mgmt, replace DOM and re-attach event listeners
 * @param {String} url
 * @param {Object} data - DOM node <main></main>
 * @param {Object} title - DOM node <title></title>
 * @param {Boolean} push - true when coming from ajax
 */
// const replaceInnerHTML = (url, data, title, headline, push = false) => {
const replaceInnerHTML = (url, data, title, push = false) => {
  push && loaded.push({ url, data, title }) // add page to loaded pages
  history.pushState(null, null, url)
  sessionHistory.push(url)

  document.querySelector('body').innerHTML = data
  document.title = title

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
        .then(d => replaceInnerHTML(url, d.querySelector('body').innerHTML, d.querySelector('title').text, true))
        .catch(err => console.log('Error in getData:', err))
}

const getPreviousUrl = () => sessionHistory[sessionHistory.length - 1]

export { getData, getPreviousUrl }
