import { Back, Power1, Power4, TimelineMax, TweenMax } from 'gsap'

const getSelectors = () => {
  const at = document.querySelector('.at')
  const article = document.querySelector('.at_article')
  const html = document.querySelector('html')
  const list = document.querySelector('.at_article__list')

  return { at, article, html, list }
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
      { x: '0%', display: 'block', ease: Power1.easeIn },
      { x, display: 'none', ease: Power1.easeIn, onComplete: resolve },
    )
  })
}

const enterArticle = () => {
  const { at, article, html, list } = getSelectors()

  const tl = new TimelineMax()
  if (list) {
    // index page
    tl
      .to(article, 1, { height: '100vh', ease: Back.easeInOut })
      .to(list, 1, { opacity: 1, paddingTop: '100px' })
      .to(html, 1, { backgroundColor: getComputedStyle(article).backgroundColor }, 0)
      .to(at, 1, { backgroundColor: getComputedStyle(article).backgroundColor }, 0)
  } else {
    // show page
    html.style.backgroundColor = '#f7f6f5'
    const x = window.previous ? '100%' : '-100%'
    // enter animation : slide new page to make it appear
    TweenMax.fromTo(
      at,
      0.8,
      { x, display: 'none', ease: Power1.easeOut },
      { x: '0%', display: 'block', ease: Power1.easeOut },
    )
  }
}

const leaveArticle = () => {
  const { article, list } = getSelectors()

  const tl = new TimelineMax()
  if (list) {
    tl.to(list, 0.5, { opacity: 0, paddingTop: '50px' }).to(article, 0.8, { height: 0, ease: Power4.easeIn }, 0) // run in parallel
  }
}

export { animateArticle, enterArticle, leaveArticle }
