import { Back, Power1, Power4, TimelineMax, TweenMax } from 'gsap'
import { homeBackgroundColor, initialBodyColor, getPreviousUrl, matchRoutePattern } from 'helpers'

const getSelectors = () => {
  const project = document.querySelector('.at_project')
  const at = document.querySelector('.at')
  const body = document.querySelector('body')
  const html = document.querySelector('html')
  const list = document.querySelector('.at_project__list')
  const pager = document.querySelector('.apos-pager')

  return { at, project, body, html, list, pager }
}

const enterProject = () => {
  const { at, project, html, list, pager } = getSelectors()

  if (list) {
    // index page
    const tl = new TimelineMax()
    tl
      .to(project, 1, { height: '100vh', ease: Back.easeInOut })
      .to(list, 1, { opacity: 1, paddingTop: '50px' })
      .to(html, 1, { backgroundColor: getComputedStyle(project).backgroundColor }, 0)
      .to(at, 1, { backgroundColor: getComputedStyle(project).backgroundColor }, 0)
    // .to(pager, 1, { opacity: 1 })
  } else {
    // show page
    const main = document.querySelector('main')
    html.style.backgroundColor = getComputedStyle(main).backgroundColor
    const x = window.previous ? '100%' : '-100%'
    // enter animation : slide new page to make it appear
    TweenMax.fromTo(at, 0.8, { x, display: 'none' }, { x: '0%', display: 'block', ease: Power1.easeOut })
  }
}

const animateEnterProject = options =>
  new Promise(resolve => {
    window.previous = options['animate-direction'] === 'back'
    const { at } = getSelectors()
    const x = window.previous ? '-100%' : '100%'
    // leave animation : slide current page to make it disappear
    TweenMax.fromTo(
      at,
      0.8,
      { x: '0%', display: 'block' },
      { x, display: 'none', ease: Power1.easeIn, onComplete: resolve },
    )
  })

const animateLeaveProject = url =>
  new Promise((resolve, reject) => {
    const showPage = matchRoutePattern(getPreviousUrl())
    const { project, at, body, html, list } = getSelectors()

    if (showPage) {
      if (url === '/') {
        // go back from show page to home
        const tl = new TimelineMax({ onStart: resolve })
        tl
          .to(project, 0.5, { opacity: 0, ease: Power4.easeIn })
          .to(body, 0.5, { backgroundColor: initialBodyColor }, '+=2')
      } else resolve()
    } else {
      if (url === '/') {
        const tl = new TimelineMax({ onStart: resolve })
        tl
          .to(list, 0.8, { opacity: 0 })
          .to(project, 0.5, { height: 0, ease: Power4.easeIn }, 0) // run in parallel
          .to(html, 0.1, { backgroundColor: homeBackgroundColor }, 0)
          .to(at, 0.1, { backgroundColor: homeBackgroundColor }, 0)
      } else {
        const tl = new TimelineMax({ onComplete: resolve })
        tl.to(list, 0.5, { opacity: 0, paddingTop: '50px' }).to(project, 0.8, { height: 0, ease: Power4.easeIn }, 0) // run in parallel
      }
    }
  })

export { animateEnterProject, animateLeaveProject, enterProject }
