import { TimelineMax, TweenMax } from 'gsap'
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
      '.at_intro .at_content__slide p:nth-child(n + 3), .at_intro .at_content__slide p.p--hidden',
    )

    if (shown) {
      paragraphs.forEach(paragraph => {
        const tl = new TimelineMax({ onComplete: () => transform(90, 'plus') })
        tl.to(paragraph, 0.5, { autoAlpha: 0 }).to(paragraph, 0.7, { height: 0 }, 0.2)
      })
    } else {
      paragraphs.forEach(paragraph => {
        const tl = new TimelineMax({ onComplete: () => transform(270, 'moins') })
        tl.to(paragraph, 0.5, { height: paragraph.scrollHeight }).to(paragraph, 0.7, { autoAlpha: 1 }, 0.2)
      })
    }
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
