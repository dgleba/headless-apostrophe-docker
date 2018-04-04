import { Back, Power4, TweenMax, TimelineMax } from 'gsap'
import { isInViewport, debounce, matchRoutePattern } from 'helpers'

const initialBodyColor = getComputedStyle(document.querySelector('body')).backgroundColor

const getSelectors = () => {
  const container = document.querySelector('.at_timeline__container')
  const html = document.querySelector('html')
  const timeline = document.querySelector('.at_timeline')
  const list = document.querySelector('.at_timeline__list')
  return { container, html, timeline, list }
}

const animateCareer = options =>
  new Promise(resolve => {
    window.previous = options['animate-direction'] === 'back'
    const { container } = getSelectors()
    const x = window.previous ? '-150%' : '150%'
    // leave animation : slide current page to make it disappear
    TweenMax.fromTo(
      container,
      0.8,
      { x: '0%', display: 'block' },
      { x, display: 'none', ease: Power4.easeIn, onComplete: resolve },
    )
  })

const enterCareer = () => {
  const showPage = matchRoutePattern()

  if (showPage) {
    const main = document.querySelector('main')
    const body = document.querySelector('body')
    body.style.backgroundColor = getComputedStyle(main).backgroundColor

    // enter animation : slide new page to make it appear
    const { container } = getSelectors()
    const x = window.previous ? '150%' : '-150%'
    TweenMax.fromTo(container, 0.8, { x, display: 'none' }, { x: '0%', display: 'block', ease: Power4.easeIn })
  } else {
    const { html, timeline } = getSelectors()
    const items = document.querySelectorAll('.at_timeline__element')
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

const leaveCareer = () => {
  const showPage = matchRoutePattern()
  const { timeline, list } = getSelectors()

  // when leaving, give body its initial background color (in order not to mess up xith pages)
  const body = document.querySelector('body')
  body.style.backgroundColor = initialBodyColor

  if (timeline && !showPage) {
    const tl = new TimelineMax()
    tl.to(list, 1.2, { opacity: 0, ease: Power4.easeInOut }).to(timeline, 1, { height: 0, ease: Power4.easeIn }, 0) // run in parallel with first step thanks to last argument 0
  }
}

export { animateCareer, enterCareer, leaveCareer }
