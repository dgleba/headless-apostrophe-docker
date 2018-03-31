import { handleEvents, ajaxLoad } from 'helpers'

const headline = document.querySelector('[class$="--appeared"] .at_menu__title')

// cache of loaded pages, start by adding the current one when loading the first page
let loaded = [
  {
    url: window.location.pathname,
    data: document.querySelector('main').outerHTML,
    title: document.querySelector('title').text,
    headline: headline ? headline.innerHTML : 'Accueil',
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
 * @param {Object} headline - DOM node <div class="at_menu__title"></div>
 * @param {Boolean} push - true when coming from ajax
 */
const replaceInnerHTML = (url, data, title, headline, push = false) => {
  const showPage = matchRoutePattern('/:index/:show', url)
  push && loaded.push({ url, data, title, headline }) // add page to loaded pages
  history.pushState(null, null, url)
  sessionHistory.push(url)

  document.querySelector('main').outerHTML = data
  document.title = title
  if (showPage) {
    document
      .querySelector('[class$="--appeared"] .at_menu__breadcrumb.breadcrumb .breadcrumb__show')
      .classList.add('breadcrumb__show--visible')
    document
      .querySelector('[class$="--appeared"] .at_menu__breadcrumb.breadcrumb')
      .classList.add('at_menu__breadcrumb--show')
    document.querySelector('[class$="--appeared"] .at_menu__title').innerHTML = headline
  } else {
    const menus = document.querySelectorAll('.at_menu__breadcrumb')
    const breadcrumbs = document.querySelectorAll('.breadcrumb__show')
    const titles = document.querySelectorAll('.at_menu__title')
    menus.forEach(el => el.classList.remove('at_menu__breadcrumb--show'))
    breadcrumbs.forEach(el => el.classList.remove('breadcrumb__show--visible'))
    titles.forEach(el => (el.innerHTML = el.getAttribute('title'))) // original menu titles
  }

  handleEvents()
}

/**
 * Retrieve data if url already visited, otherwise get it from ajax
 * @param {String} url
 */
const getData = url => {
  const founded = loaded.reduce((acc, cur) => (cur.url === url ? cur : acc), {})
  let t // intermediate variable to store class$="--appeared" if it exixts
  Object.keys(founded).length
    ? replaceInnerHTML(url, founded.data, founded.title, founded.headline)
    : ajaxLoad(url)
        .then(d =>
          replaceInnerHTML(
            url,
            d.querySelector('main').outerHTML,
            d.querySelector('title').text,
            (t = d.querySelector('[class$="--appeared"] .at_menu__title')) && t.innerHTML,
            true,
          ),
        )
        .catch(err => console.log('Error in getData:', err))
}

const getPreviousUrl = () => sessionHistory[sessionHistory.length - 1]

export { getData, getPreviousUrl }
