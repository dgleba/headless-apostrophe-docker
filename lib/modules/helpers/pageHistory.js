import { handleEvents, ajaxLoad } from 'helpers'

// cache of loaded pages, start by adding the current one when loading the first page
let loaded = [
  {
    url: window.location.pathname,
    data: document.querySelector('body').innerHTML,
    title: document.querySelector('title').text,
    description: document.querySelector('meta[name="description"]').content,
  },
]

// log of urls visited in order
let sessionHistory = [window.location.pathname]

/**
 * History mgmt, replace DOM and re-attach event listeners
 * @param {String} url
 * @param {Object} data - DOM node <main></main>
 * @param {Object} title - DOM node <title></title>
 * @param {String} description - meta description
 * @param {Boolean} push - true when coming from ajax
 */
const replaceInnerHTML = (url, data, title, description, push = false) => {
  push && loaded.push({ url, data, title, description }) // add page to loaded pages
  history.pushState(null, null, url)
  sessionHistory.push(url)

  document.querySelector('body').innerHTML = data
  document.querySelector('meta[name="description"]').content = description
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
    ? replaceInnerHTML(url, founded.data, founded.title, founded.description)
    : ajaxLoad(url)
        .then(d =>
          replaceInnerHTML(
            url,
            d.querySelector('body').innerHTML,
            d.querySelector('title').text,
            d.querySelector('meta[name="description"]').content,
            true,
          ),
        )
        .catch(err => console.log('Error in getData:', err))
}

const getPreviousUrl = () => sessionHistory[sessionHistory.length - 1]

export { getData, getPreviousUrl }
