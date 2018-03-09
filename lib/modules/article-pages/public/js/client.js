import { Back, Power4, TimelineMax } from 'gsap'

const getSelectors = () => {
  const article = document.querySelector('.at_article')
  const list = document.querySelector('.at_article__list')
  return { article, list }
}

const enterArticle = () => {
  const { article, list } = getSelectors()
  const html = document.querySelector('html')

  if (list) {
    const tl = new TimelineMax()
    tl
      .to(article, 1, { height: '91vh', ease: Back.easeInOut })
      .to(list, 1, { opacity: 1, paddingTop: '10px' })
      .to(html, 1, { backgroundColor: getComputedStyle(article).backgroundColor }, 0)
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
