import { Back, Power4, TweenMax, TimelineMax } from 'gsap'
import { isInViewport, debounce, matchRoutePattern, homeBackgroundColor, initialBodyColor } from 'helpers'

const getSelectors = () => {
  const body = document.querySelector('body')
  const container = document.querySelector('.at_timeline__container')
  const html = document.querySelector('html')
  const items = document.querySelectorAll('.at_timeline__element')
  const timeline = document.querySelector('.at_timeline')
  const list = document.querySelector('.at_timeline__list')
  const main = document.querySelector('main')

  return { body, container, items, html, timeline, list, main }
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
    const { items, html, timeline } = getSelectors()
    const callbackFn = debounce(_ => items.forEach(i => isInViewport(i) && i.classList.add('in-view')), 50)

    TweenMax.to(timeline, 1, {
      height: '100vh',
      ease: Back.easeInOut,
      immediateRender: true,
      autoCSS: true,
      onComplete: () => {
        html.style.backgroundColor = getComputedStyle(timeline).backgroundColor // fill whole page with the same color
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
    const showPage = matchRoutePattern()
    const { body, html, list, timeline } = getSelectors()

    if (showPage) {
      if (url === '/') {
        // go back from show page to home
        TweenMax.to(timeline, 0.5, { opacity: 0, onComplete: resolve })
      } else resolve()
    } else {
      if (url === '/') {
        // if going back to home
        const tl = new TimelineMax({ onStart: resolve })
        tl
          .to(list, 1.2, { opacity: 0, ease: Power4.easeInOut })
          .to(timeline, 1, { height: 0, ease: Power4.easeIn }, 0) // run in parallel with first step thanks to last argument 0
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
