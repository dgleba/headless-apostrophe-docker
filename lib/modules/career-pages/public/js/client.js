import { addEventListeners } from 'helpers/utils'

const animateCareer = () => {
  const at = document.querySelector('.at')
  const timeline = document.querySelector('.at_timeline')
  at.style.backgroundColor = getComputedStyle(timeline).backgroundColor // fill whole page with the same color

  const items = document.querySelectorAll('.at_timeline__element')
  addEventListeners(items)
}

export default animateCareer
