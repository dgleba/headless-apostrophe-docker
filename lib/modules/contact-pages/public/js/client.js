import { TimelineMax } from 'gsap'
import { homeBackgroundColor, initialBodyColor } from 'helpers'

/**
* Event listeners on "See more" buttons
*/
const showButtonClick = el => {
  el.removeEventListener('click', () => click(el))
  el.addEventListener('click', () => click(el))

  const click = el => {
    const shown = el.classList.contains('shown')
    el.classList.toggle('shown')
    const paragraphs = el.parentElement.querySelectorAll(
      '.at_intro .at_content__slide p:nth-child(n + 3), .at_content__slide--hidden',
    )
    paragraphs.forEach(paragraph => paragraph.classList.toggle('p--show'))

    // already shown => need to go back to original state
    // not shown yet => need to rotate arrow and display "See less" message
    shown ? transform(90, 'plus') : transform(270, 'moins')
  }

  const transform = (deg, label) => {
    el.querySelector('.at_intro .icon').style.transform = `rotate(${deg}deg)`
    el.querySelector('.btn--label').innerHTML = `Voir ${label}`
  }
}

const enterContact = () => {
  document.querySelector('.at').style.backgroundColor = homeBackgroundColor
  window.setTimeout(() => document.querySelectorAll('.at_content__slide').forEach(i => i.classList.add('in-view')), 300)
  const showButtons = document.querySelectorAll('.at_intro__btn')

  // Event listeners on buttons
  showButtons.forEach(showButtonClick)
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
