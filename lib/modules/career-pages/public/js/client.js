import { addEventListeners } from 'helpers/utils'

const animateCareer = () => {
  const html = document.querySelector('html')
  const timeline = document.querySelector('.at_timeline')
  html.style.backgroundColor = getComputedStyle(timeline).backgroundColor // fill whole page with the same color

  const items = document.querySelectorAll('.at_timeline__element')
  addEventListeners(items)
}

export default animateCareer
