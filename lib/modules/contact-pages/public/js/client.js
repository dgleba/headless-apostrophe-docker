import { debounce, isElementInViewport } from 'helpers/utils'

const animateContact = () => {
  const items = document.querySelectorAll('.at_intro > div')
  const callbackFn = debounce(
    _ => items.forEach(i => (isElementInViewport(i) ? i.classList.add('in-view') : null)),
    250,
  )

  // listen for events
  window.addEventListener('resize', callbackFn)
  window.addEventListener('scroll', callbackFn)
  callbackFn()
}

export default animateContact
