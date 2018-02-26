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

export { isInViewport, debounce }
