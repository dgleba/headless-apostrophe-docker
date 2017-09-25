/**
 * Check if element in in viewport
 * @param {Element} el
 */
export const isElementInViewport = el =>
  el.getBoundingClientRect().top >= 0 &&
  el.getBoundingClientRect().top <
    (window.innerHeight || document.documentElement.clientHeight) - 200

/**
 * Debounce
 * @param {Function} fn
 * @param {Number} wait
 * @param {Boolean} immediate - optional
 */
export const debounce = (fn, wait, immediate) => {
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
 * Place titles in menu bar at the right position
 */
export const titlePosition = () => {
  const titles = document.querySelectorAll('[title]')
  const center = (window.innerWidth + window.innerHeight) / 2 - 50
  titles.forEach(t => (t.style.left = `${center}px`))
}
