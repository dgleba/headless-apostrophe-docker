import { TweenMax } from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin' // used in scrollTo

const sliderContainer = '.at_slider__container'
let step = 0

/**
 * Calculate what slide to scroll to
 * @param {Boolean} back - if "back" button was clicked or touch was in backwards direction
 */
const swipe = back => {
  const slides = document.querySelector(sliderContainer)
  const maxStep = document.querySelectorAll('.at_slider__slides').length // number of slides
  const widthToWalk = slides.scrollWidth / maxStep
  if (back) {
    // if on first slide, go on the slide where the last slide is visible
    // that is to say, last slide - (number of visible slides (slides.clientWidth) / total width (slides.scrollWidth) * last slide)
    step = step <= 0 ? maxStep - Math.floor(slides.clientWidth / slides.scrollWidth * maxStep) : step - 1
  } else {
    // if last slide is visible that is to say: number of visible slides (slides.clientWidth) + next slide (step * widthToWalk) is above total width (slides.scrollWidth), go back to the first slide
    // otherwise, walk to next slide
    step = slides.clientWidth + step * widthToWalk > slides.scrollWidth ? 0 : step + 1
  }
  TweenMax.to(slides, 1, { scrollTo: { x: step * widthToWalk } })
}

/**
* Event listeners on slider buttons
*/
const sliderButtonClick = el => {
  const click = e => swipe(e.target.classList.contains('at_slider__btn--prev'))
  el.removeEventListener('click', click)
  el.addEventListener('click', click)
}

/**
* Event listeners on slider touch
*/
const sliderButtonTouch = () => {
  const slides = document.querySelector(sliderContainer)
  const touchstart = e => (coordX = e.changedTouches[0].clientX)
  const touchend = e => swipe(!!(e.changedTouches[0].clientX > coordX))
  let coordX = 0

  slides.removeEventListener('touchstart', touchstart)
  slides.removeEventListener('touchend', touchend)

  slides.addEventListener('touchstart', touchstart)
  slides.addEventListener('touchend', touchend)
}

const playSlideShowWidget = () => {
  const sliderButtons = document.querySelectorAll('.at_slider__btn')

  // Event listeners on buttons
  sliderButtons.forEach(sliderButtonClick)
  sliderButtonTouch()
}

export default playSlideShowWidget
