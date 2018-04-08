import { pages } from 'config'

/**
 * @param {Element} el
 */
const isInViewport = el =>
  el.getBoundingClientRect().top >= 0 &&
  el.getBoundingClientRect().top < (window.innerHeight || document.documentElement.clientHeight) - 200

/**
 * @param {Function} fn
 * @param {Number} wait
 * @param {Boolean} immediate - optional
 */
const debounce = (fn, wait, immediate = false) => {
  let timeout
  return () => {
    const context = this,
      args = arguments
    const later = () => {
      timeout = null
      if (!immediate) fn.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) fn.apply(context, args)
  }
}

/**
 * Match a pattern against an url
 * @param {String} url
 * @param {String} pattern - route with name parameters
 */
const matchRoutePattern = (url = window.location.pathname, pattern = '/:index/:show') => {
  const regex = pattern.replace(/:([^/]+)/g, '([^/]+)')
  const r = new RegExp(`^${regex}$`)
  return r.test(url)
}

/**
 * Find default homepage background color in config
 */
const homeBackgroundColor = pages.reduce((acc, cur) => (acc = cur.type === 'home' ? cur.background : acc), '')
/**
* Find default body background color
*/
const initialBodyColor = getComputedStyle(document.querySelector('body')).backgroundColor

export { isInViewport, debounce, matchRoutePattern, homeBackgroundColor, initialBodyColor }
