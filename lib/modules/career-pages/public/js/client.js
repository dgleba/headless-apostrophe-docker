const animateCareer = () => {
  var items = document.querySelectorAll('.timeline > ul > li')

  // check if an element is in viewport
  const isElementInViewport = el =>
    el.getBoundingClientRect().top >= 0 &&
    el.getBoundingClientRect().top <
      (window.innerHeight || document.documentElement.clientHeight) - 200

  const callbackFunc = () =>
    items.forEach(
      i => (isElementInViewport(i) ? i.classList.add('in-view') : null)
    )

  // listen for events
  window.addEventListener('resize', callbackFunc)
  window.addEventListener('scroll', callbackFunc)
  callbackFunc()
}

export default animateCareer
