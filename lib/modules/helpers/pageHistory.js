import handleEvents from './events'

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
const replaceInnerHTML = (url, data, push = false) => {
  if (push) loaded.push({ url, data }) // add page to loaded pages
  history.pushState(null, null, url)
  aposRefreshable.innerHTML = data
  handleEvents()
}

/**
 * Retrieve data if url already visited
 * @param {String} url
 */
const getDataIfLoaded = url => {
  return new Promise((resolve, reject) => {
    loaded.forEach(page => {
      if (page.url === url) resolve(page.data)
    }) // if url in "loaded" array, return data
    resolve() // if no matching url in the array, return null
  })
}

/**
 * Remove last element in "loaded" array and return previous url
 */
const pop = () => {
  loaded.pop()
  return loaded.length > 0 ? loaded[loaded.length - 1].url : '/'
}

export { replaceInnerHTML, getDataIfLoaded, pop }
