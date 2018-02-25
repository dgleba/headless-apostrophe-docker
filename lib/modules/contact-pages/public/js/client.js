import { showButtonClick, sliderButtonClick, sliderButtonTouch } from './events'

export default () => {
  window.setTimeout(() => document.querySelectorAll('.at_content__slide').forEach(i => i.classList.add('in-view')), 0)
  const showButtons = document.querySelectorAll('.at_intro__btn')
  const sliderButtons = document.querySelectorAll('.at_slider__btn')

  // Event listeners on buttons
  showButtons.forEach(showButtonClick)
  sliderButtons.forEach(sliderButtonClick)
  sliderButtonTouch()
}
