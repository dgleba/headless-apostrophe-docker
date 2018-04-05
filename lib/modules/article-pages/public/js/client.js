import { Back, Power1, Power4, TimelineMax, TweenMax } from 'gsap'

const getSelectors = () => {
  const at = document.querySelector('.at')
  const article = document.querySelector('.at_article')
  const html = document.querySelector('html')
  const list = document.querySelector('.at_article__list')
  const pager = document.querySelector('.apos-pager')

  return { at, article, html, list, pager }
}

const animateArticle = options => {
  return new Promise(resolve => {
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

const leaveArticle = () => {
  const { article, list } = getSelectors()

  if (list) {
    const tl = new TimelineMax()
    tl.to(list, 0.5, { opacity: 0, paddingTop: '50px' }).to(article, 0.8, { height: 0, ease: Power4.easeIn }, 0) // run in parallel
  }
}

export { animateArticle, enterArticle, leaveArticle }
