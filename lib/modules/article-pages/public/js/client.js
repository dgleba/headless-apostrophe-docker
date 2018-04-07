import { Back, Power1, Power4, TimelineMax, TweenMax } from 'gsap'

import { pages } from 'config'
const homeBackgroundColor = pages.reduce((acc, cur) => (acc = cur.type === 'home' ? cur.background : acc), '')
const initialBodyColor = getComputedStyle(document.querySelector('body')).backgroundColor

const getSelectors = () => {
  const article = document.querySelector('.at_article')
  const at = document.querySelector('.at')
  const body = document.querySelector('body')
  const html = document.querySelector('html')
  const list = document.querySelector('.at_article__list')
  const pager = document.querySelector('.apos-pager')

  return { at, article, body, html, list, pager }
}

const enterArticle = () => {
  const { at, article, html, list, pager } = getSelectors()

  if (list) {
    // index page
    const tl = new TimelineMax()
    tl
      .to(article, 1, { height: '100vh', ease: Back.easeInOut })
      .to(list, 1, { opacity: 1, paddingTop: '50px' })
      .to(html, 1, { backgroundColor: getComputedStyle(article).backgroundColor }, 0)
      .to(at, 1, { backgroundColor: getComputedStyle(article).backgroundColor }, 0)
      .to(pager, 1, { opacity: 1 })
  } else {
    // show page
    const main = document.querySelector('main')
    html.style.backgroundColor = getComputedStyle(main).backgroundColor
    const x = window.previous ? '100%' : '-100%'
    // enter animation : slide new page to make it appear
    TweenMax.fromTo(at, 0.8, { x, display: 'none' }, { x: '0%', display: 'block', ease: Power1.easeOut })
  }
}

const animateEnterArticle = options =>
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

const animateLeaveArticle = url =>
  new Promise((resolve, reject) => {
    const { article, at, body, html, list } = getSelectors()

    if (list) {
      if (url === '/') {
        at.style.backgroundColor = homeBackgroundColor
        html.style.backgroundColor = homeBackgroundColor
        const tl = new TimelineMax({ onStart: resolve })
        tl.to(list, 0.8, { opacity: 0 }).to(article, 0.5, { height: 0, ease: Power4.easeIn }, 0) // run in parallel
      } else {
        const tl = new TimelineMax({ onComplete: resolve })
        tl.to(list, 0.5, { opacity: 0, paddingTop: '50px' }).to(article, 0.8, { height: 0, ease: Power4.easeIn }, 0) // run in parallel
      }
    } else {
      if (url === '/') {
        const tl = new TimelineMax({
          onComplete: () => {
            body.style.backgroundColor = initialBodyColor
            resolve()
          },
        })
        tl
          .to(article, 0.5, { opacity: 0, ease: Power4.easeIn })
          .to(at, 0.5, { backgroundColor: homeBackgroundColor }, 1)
          .to(body, 0.5, { backgroundColor: homeBackgroundColor }, 1)
          .to(html, 0.5, { backgroundColor: homeBackgroundColor }, 1)
      } else resolve()
    }
  })

export { animateEnterArticle, animateLeaveArticle, enterArticle }
