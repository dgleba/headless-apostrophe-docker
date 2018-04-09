import { Back, Power1, Power4, TimelineMax } from 'gsap'
import { homeBackgroundColor, initialBodyColor } from 'helpers'
import { showButtonClick, sliderButtonClick, sliderButtonTouch } from './events'

const enterContact = () => {
  document.querySelector('.at').style.backgroundColor = homeBackgroundColor
  window.setTimeout(() => document.querySelectorAll('.at_content__slide').forEach(i => i.classList.add('in-view')), 300)
  const showButtons = document.querySelectorAll('.at_intro__btn')
  const sliderButtons = document.querySelectorAll('.at_slider__btn')

  // Event listeners on buttons
  showButtons.forEach(showButtonClick)
  sliderButtons.forEach(sliderButtonClick)
  sliderButtonTouch()
}

const animateLeaveContact = () =>
  new Promise((resolve, reject) => {
    const at = document.querySelector('.at')
    const html = document.querySelector('html')
    const items = document.querySelectorAll('.at_content__slide')
    items.forEach(i => i.classList.remove('in-view'))
    const tl = new TimelineMax({ onComplete: resolve })
    tl.to(html, 1, { backgroundColor: homeBackgroundColor }, 0).to(at, 1, { backgroundColor: homeBackgroundColor }, 0)
  })

export { animateLeaveContact, enterContact }
