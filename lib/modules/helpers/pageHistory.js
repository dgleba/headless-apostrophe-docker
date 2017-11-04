import handleEvents from './events'
import chainify from 'helpers/chainify'

const aposRefreshable = document.querySelector('.apos-refreshable')
// loaded pages array, start by adding the current one when loading the first page
let loaded = [
  {
    url: window.location.pathname,
    data: aposRefreshable.innerHTML,
  },
]

/**
 * History mgmt, replace DOM and re-attach event listeners
 * @param {String} url
 * @param {Object} data
 */
const replaceInnerHTML = (url, data, push = false) => {
  if (push) loaded.push({ url, data }) // add page to loaded pages
  history.pushState(null, null, url)
  const indexTitle = data.indexOf('<title>')
  const indexContent = data.indexOf('<div class="apos-refreshable" data-apos-refreshable>')
  document.title = indexTitle > -1 ? data.substring(indexTitle + 7, data.indexOf('</title>')) : setNewTitle() // no index title in homepage ajax, so need to set it through setNewTitle
  aposRefreshable.innerHTML = indexContent > -1 ? data.substring(indexContent + 52, data.indexOf('</main>')) : data // no "apos-refreshable" div in homepage ajax
  handleEvents()
}

/**
 * Replace document title in <head>
 */
const setNewTitle = () => {
  const title = document.querySelector('[title]').attributes.title.value
  let array = document.title.split(' | ')
  chainify(array, ['pop', 'push', 'join'], Array) // add some Array functions to the array instance
  return array
    .pop()
    .push(title)
    .join(' | ', true) // in order to chainify calls // prettier-ignore
}

/**
 * Retrieve data if url already visited
 * @param {String} url
 */
const getDataIfLoaded = url => {
  return new Promise((resolve, reject) => {
    loaded.forEach(page => page.url === url && resolve(page.data)) // if url in "loaded" array, return data
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
