import { debounce, isElementInViewport, titlePosition } from 'helpers/utils'
import { replaceInnerHTML } from 'helpers/pageHistory'
import ajaxLoad from 'helpers/ajax'

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

  const elements = document.querySelectorAll('.timeline__element')
  elements.forEach(element => {
    const link = element.querySelector('.timeline__link')
    const div = element.querySelector('div')

    link.addEventListener('click', e => {
      e.preventDefault()
      // document // hide every div in element unless the current one
      //   .querySelectorAll('.timeline__element div')
      //   .forEach(el => el !== div && el.classList.add('remove'))
      // elements.forEach(el => el.classList.add('hide')) // hide every element (in order to hide the bullet in timeline)
      // element.classList.add('zoom') // widen current <li>
      // link.classList.add('remove') // hide button "See more"
      // element.querySelector('.checkmark').classList.remove('remove')
      ajaxLoad(link.dataset.url, data =>
        replaceInnerHTML(link.dataset.url, data, true)
      )
    })
  })
}

export default animateCareer
