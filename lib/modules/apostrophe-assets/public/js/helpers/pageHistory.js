import handleEvents from './events.js'

const aposRefreshable = document.querySelector('.apos-refreshable')
// loaded pages array, start by adding the current one when loading the first page
let loaded = [
  {
    url: window.location.pathname,
    data: aposRefreshable.innerHTML
  }
]

/**
 * History mgmt, replace DOM and re-attach event listeners
 * @param {String} url
 * @param {Object} data
 */
const replaceInnerHTML = (url = null, data = null) => {
  if (!url && !data) {
    loaded.pop() // remove last loaded page, that is to say the one before going back
    const obj = loaded[loaded.length - 1] // get previous loaded page
    if (obj) {
      data = obj.data
    } else document.location.reload() // add it to the DOM // or reload in case of problem
  } else {
    loaded.push({ url, data }) // add page to loaded pages
    history.pushState(null, null, url)
  }
  aposRefreshable.innerHTML = data
  handleEvents()
}

export default replaceInnerHTML
