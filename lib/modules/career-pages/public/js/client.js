import { Back, Power4, TweenMax, TimelineMax } from 'gsap'
import { isInViewport, debounce } from 'helpers'

const getSelectors = () => {
  const html = document.querySelector('html')
  const timeline = document.querySelector('.at_timeline')
  const list = document.querySelector('.at_timeline__list')
  return { html, timeline, list }
}

const enterCareer = () => {
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

const leaveCareer = () => {
  const { timeline, list } = getSelectors()
  if (timeline) {
    const tl = new TimelineMax()
    tl.to(list, 1.2, { opacity: 0, ease: Power4.easeInOut }).to(timeline, 1, { height: 0, ease: Power4.easeIn }, 0) // run in parallel with first step thanks to last argument 0
  }
}

export { enterCareer, leaveCareer }
