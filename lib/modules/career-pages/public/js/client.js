import { Back, Power4, TweenMax, TimelineMax } from 'gsap'
import {
  isInViewport,
  debounce,
  homeBackgroundColor,
  initialBodyColor,
  getPreviousUrl,
  matchRoutePattern,
} from 'helpers'

const getSelectors = () => {
  const body = document.querySelector('body')
  const container = document.querySelector('.at_career__container')
  const html = document.querySelector('html')
  const items = document.querySelectorAll('.at_career__element')
  const career = document.querySelector('.at_career')
  const list = document.querySelector('.at_career__list')
  const main = document.querySelector('main')

  return { body, container, items, html, career, list, main }
}

const enterCareer = () => {
  const showPage = matchRoutePattern()

  if (showPage) {
    const { body, container, main } = getSelectors()
    body.style.backgroundColor = getComputedStyle(main).backgroundColor

    // enter animation : slide new page to make it appear
    const x = window.previous ? '150%' : '-150%'
    TweenMax.fromTo(container, 0.8, { x, display: 'none' }, { x: '0%', display: 'block', ease: Power4.easeIn })
  } else {
    const { items, html, career } = getSelectors()
    const callbackFn = debounce(_ => items.forEach(i => isInViewport(i) && i.classList.add('in-view')), 50)

    TweenMax.to(career, 1, {
      height: '100vh',
      ease: Back.easeInOut,
      immediateRender: true,
      autoCSS: true,
      onComplete: () => {
        html.style.backgroundColor = getComputedStyle(career).backgroundColor // fill whole page with the same color
        callbackFn()
      },
    })

    const addEventListeners = _ => {
      window.addEventListener('resize', callbackFn)
      window.addEventListener('scroll', callbackFn)
    }

    const removeEventListeners = _ => {
      window.removeEventListener('resize', callbackFn)
      window.removeEventListener('scroll', callbackFn)
    }

    removeEventListeners()
    addEventListeners()
  }
}

const animateEnterCareer = options =>
  new Promise(resolve => {
    const { container, items } = getSelectors()

    // hide all "career" boxes before loading "show" page
    items.forEach(i => i.classList.remove('in-view'))

    window.previous = options['animate-direction'] === 'back'
    const x = window.previous ? '-150%' : '150%'
    // leave animation : slide current page to make it disappear
    TweenMax.fromTo(
      container,
      0.8,
      { x: '0%', display: 'block' },
      { x, display: 'none', ease: Power4.easeIn, onComplete: resolve },
    )
  })

const animateLeaveCareer = url =>
  new Promise((resolve, reject) => {
    const showPage = matchRoutePattern(getPreviousUrl())
    const { body, html, list, career } = getSelectors()

    if (showPage) {
      if (url === '/') {
        // go back from show page to home
        const tl = new TimelineMax({ onStart: resolve })
        tl.to(career, 0.5, { opacity: 0 }).to(body, 0.5, { backgroundColor: initialBodyColor }, '+=2')
      } else {
        body.style.backgroundColor = initialBodyColor
        html.style.backgroundColor = homeBackgroundColor
        resolve()
      }
    } else {
      if (url === '/') {
        // if going back to home
        const tl = new TimelineMax({ onStart: resolve })
        tl
          .to(list, 1.2, { opacity: 0, ease: Power4.easeInOut })
          .to(career, 1, { height: 0, ease: Power4.easeIn }, 0) // run in parallel with first step thanks to last argument 0
          .to(body, 0.5, { backgroundColor: homeBackgroundColor }, 1)
          .to(html, 0.5, { backgroundColor: homeBackgroundColor }, 1)
          .to(body, 0.5, { backgroundColor: initialBodyColor }, '+=2')
      } else {
        // if going to show page
        TweenMax.to(list, 1.2, { opacity: 0, ease: Power4.easeInOut, onComplete: resolve })
      }
    }
  })

export { animateEnterCareer, animateLeaveCareer, enterCareer }
