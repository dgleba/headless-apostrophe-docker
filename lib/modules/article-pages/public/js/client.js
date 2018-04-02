import { Back, Power1, Power4, TimelineMax } from 'gsap'

const getSelectors = () => {
  const article = document.querySelector('.at_article')
  const list = document.querySelector('.at_article__list')

  return { article, list }
}

const enterArticle = () => {
  const { article, list } = getSelectors()
  const at = document.querySelector('.at')
  const html = document.querySelector('html')

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
    const previousLink = document.querySelector('.at_article__links--previous > a')
    previousLink.addEventListener('click', () => (window.previous = true))

    const x = window.previous ? '100%' : '-100%'
    tl
      .to(html, 0, { backgroundColor: '#f7f6f5' })
      .fromTo(at, 1.5, { x, display: 'none' }, { x: '0%', display: 'block', ease: Power1.easeOut })
    window.previous = false
  }
}

const leaveArticle = () => {
  const { article, list } = getSelectors()

  if (list) {
    const tl = new TimelineMax()
    tl.to(list, 0.5, { opacity: 0, paddingTop: '50px' }).to(article, 0.8, { height: 0, ease: Power4.easeIn }, 0) // run in parallel
  }
}

export { enterArticle, leaveArticle }
