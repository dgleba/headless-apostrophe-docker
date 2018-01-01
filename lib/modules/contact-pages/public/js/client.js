import { TweenMax } from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

export default () => {
  window.setTimeout(() => document.querySelectorAll('.at_content__slide').forEach(i => i.classList.add('in-view')), 0)
  const showButtons = document.querySelectorAll('.at_intro__btn')

  /**
   * Attach event listener on "See more" buttons
   */
  showButtons.forEach(el =>
    el.addEventListener('click', e => {
      const shown = el.classList.contains('shown')
      el.classList.toggle('shown')
      const paragraphs = el.parentElement.querySelectorAll('.at_intro .at_content__slide p:nth-child(n + 3)')
      paragraphs.forEach(paragraph => paragraph.classList.toggle('p--show'))

      if (shown) {
        // already show => need to go back to original state
        el.querySelector('.at_intro .icon').style.transform = 'rotate(90deg)'
        el.querySelector('.btn--label').innerHTML = 'Voir plus'
      } else {
        // not shown yet => need to rotate arrow and display "See less" message
        el.querySelector('.at_intro .icon').style.transform = 'rotate(270deg)'
        el.querySelector('.btn--label').innerHTML = 'Voir moins'
      }
    }),
  )

  const name = 'at_slider__btn'
  const sliderButtons = document.querySelectorAll(`.${name}`)
  const slides = document.querySelector('.at_slider__container')
  let step = 0
  let coordX = 0
  sliderButtons.forEach(el => el.addEventListener('click', e => swipe(e.target.classList.contains(`${name}--prev`))))
  slides.addEventListener('touchstart', e => (coordX = e.changedTouches[0].clientX))
  slides.addEventListener('touchend', e => swipe(!!(e.changedTouches[0].clientX > coordX)))

  function swipe(back) {
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
}
