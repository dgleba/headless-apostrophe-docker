let callbackFn

export const addEventListeners = items => {
  callbackFn = debounce(_ => items.forEach(i => (isInViewport(i) ? i.classList.add('in-view') : null)), 250)

  // listen for events
  window.addEventListener('resize', callbackFn)
  window.addEventListener('scroll', callbackFn)
  callbackFn()
}

export const removeEventListeners = _ => {
  document.querySelector('html').style = 'none' // remove styling put on career pages
  window.removeEventListener('resize', callbackFn)
  window.removeEventListener('scroll', callbackFn)
}

/**
 * Check if element in in viewport
 * @param {Element} el
 */
const isInViewport = el =>
  el.getBoundingClientRect().top >= 0 &&
  el.getBoundingClientRect().top < (window.innerHeight || document.documentElement.clientHeight) - 200

/**
 * Debounce
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
