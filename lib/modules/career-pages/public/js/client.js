import { debounce, isElementInViewport, titlePosition } from 'helpers/utils'

const animateCareer = () => {
  const at = document.querySelector('.at')
  const timeline = document.querySelector('.timeline')
  const items = document.querySelectorAll('.timeline > ul > li')

  const callbackFunc = debounce(
    () =>
      items.forEach(
        i => (isElementInViewport(i) ? i.classList.add('in-view') : null)
      ),
    250
  )

  // listen for events
  window.addEventListener('resize', callbackFunc)
  window.addEventListener('scroll', callbackFunc)
  callbackFunc()
  titlePosition()

  // fill whole page with the same color
  at.style.backgroundColor = getComputedStyle(timeline).backgroundColor

  const links = document.querySelectorAll('.timeline__link')
  links.forEach(link =>
    link.addEventListener('click', e => {
      e.preventDefault()
      document
        .querySelectorAll('.timeline__element div')
        .forEach(el => el.classList.add('remove'))
      document
        .querySelectorAll('.timeline__element')
        .forEach(el => el.classList.add('hide'))

      e.target.parentNode.parentNode.parentNode.classList.add('zoom')
      e.target.parentNode.parentNode.classList.remove('remove')
      // ajaxLoad(url, data => replaceInnerHTML(url, data, true))
    })
  )
}

export default animateCareer
