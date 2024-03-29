import { Back, Elastic, Linear, TimelineMax, TweenMax } from 'gsap'
import TextPlugin from 'gsap/TextPlugin'

const enterHome = () => {
  const tl = new TimelineMax()
  const background = '.at'
  const bgd = '#background rect'
  const table = '#table_legs, #table'
  const lampLeg = '#lamp > .lamp-leg'
  const lampbt = '#lamp-bottom'
  const lampLight = '#lamp > .light'
  const lampLine = '#lamp-line'
  const lampLineB = '#lamp-line-b'
  const lampLineT = '#lamp-line-t'
  const lampCircle = '#lamp-circle'
  const lampHead = '#lamp-head'
  const lampHeader = '#lamp-header'
  const lampBody = '#lamp-body'
  const computer = '#computer > *'
  const keyboard = '#keyboard > *'
  const asset = '#computer_mouse > * , #coffee_mug > *'
  const text_start = '#text_start'
  const text_line_1 = '#text_line_1'
  const text_line_2 = '#text_line_2'
  const text_line_3 = '#text_line_3'
  const text_line_4 = '#text_line_4'
  const text_line_5 = '#text_line_5'
  const text_line_6 = '#text_line_6'
  const text_end = '#text_end'

  // animate svg
  document.querySelector('#intro').style.display = 'block'
  const content = document.querySelector('.at_content')
  content.style.top = `${window.innerHeight - content.clientHeight - 100}px`

  tl
    .to(background, 0, { background: '#2c3e50' })
    .from(bgd, 0.2, { opacity: 0, scale: 0, transformOrigin: 'center center' })
    .staggerFrom(table, 0.5, { x: '-100%', opacity: 0, ease: Back.easeOut }, 0.1)
    .from(lampLeg, 0.2, { opacity: 0, x: '-200', ease: Elastic.easeOut })
    .from(lampbt, 0.2, { opacity: 0, scale: 0, transformOrigin: 'center center' })
    .from(lampLineB, 0.2, { opacity: 0, transformOrigin: '100% 100%', rotation: '-180deg' })
    .from(lampCircle, 0.1, { opacity: 0, x: '-=100', y: '-=100' })
    .from(lampLineT, 0.2, { opacity: 0, transformOrigin: '0% 100%', rotation: '-180deg' })
    .from(lampHead, 0.2, { opacity: 0, scale: 0, ease: Elastic.easeOut })
    .from(lampHeader, 0.2, { transformOrigin: '60% 60%', rotation: '60deg' })
    .from(lampBody, 0.2, { transformOrigin: '70% 70%', rotation: '-25deg' })
    .from(computer, 0.4, { opacity: 0, scale: 0, transformOrigin: 'center center', ease: Back.easeOut }, '-=1')
    .to(background, 0.2, { fill: '#FDD10D' })
    .staggerFrom(keyboard, 0.5, { opacity: 0, y: '-=100', ease: Linear.easeInOut }, 0.05)
    .staggerFrom(asset, 0.5, { opacity: 0 }, 0.05)
    .to(text_start, 0.5, { text: 'const freelance = {', ease: Linear.easeNone }, '-=3')
    .to(text_line_1, 1, { text: 'name: "Anthony Tarlao",', ease: Linear.easeNone }, '-=2')
    .to(text_line_2, 1, { text: 'skills: ["Agile", "Dev", "Trainer"],', ease: Linear.easeNone }, '-=1')
    .to(text_line_3, 0.5, { text: 'props:', ease: Linear.easeNone })
    .to(text_line_4, 0.75, { text: '["Solution maker",', ease: Linear.easeNone })
    .to(text_line_5, 0.75, { text: '"Passionate",', ease: Linear.easeNone })
    .to(text_line_6, 0.75, { text: '"Great learner"]', ease: Linear.easeNone })
    .to(text_end, 0.5, { text: '}', ease: Linear.easeNone })
    .to(lampLight, 0.2, { opacity: 0.8, ease: Elastic.easeOut, delay: 0.5 }, 'a')
    .to(lampLight, 0.1, { opacity: 0 }, 'b')
    .to(lampLight, 0.1, { opacity: 0.2 }, 'c')
    .to(bgd, 0.2, { opacity: 0.1, delay: 0.5 }, 'a-=0.05')
    .to(bgd, 0.1, { opacity: 1 }, 'b-=0.05')
    .to(bgd, 0.1, { opacity: 0.5 }, 'c-=0.05')
    .to(bgd, 0.2, { opacity: 1, fill: '#FDD10D' })
    .to(background, 0.2, { opacity: 1, background: '#FDD10D' })
    .fromTo(lampLine, 0.2, { opacity: 0 }, { opacity: 0.2, delay: 0.5 }, 'a-=0.05')
    .to(lampLine, 0.1, { opacity: 1 }, 'b-=0.05')
    .to(lampLine, 0.1, { opacity: 0.5 }, 'c-=0.05')
}

const animateEnterHome = options =>
  new Promise((resolve, reject) => {
    const root = 'at_menu'
    // trim nav height to 100px
    const mainNav = document.querySelector(`nav.${root}`)
    mainNav.classList.toggle(`${root}--appear`)

    const navs = document.querySelectorAll('nav[page]')
    navs.forEach(
      (nav, i) =>
        options.number - 1 === i
          ? nav.classList.toggle(`${root}__${i + 1}--appear`)
          : nav.classList.toggle(`${root}__${i + 1}--disappear`),
    )

    const selector = `${root}__${options.number}`
    const currentNav = document.querySelector(`.${selector}`)
    if (!currentNav.classList.contains(`${selector}--appear`)) {
      // need to remove ASAP this class
      currentNav.classList.remove(`${selector}--appeared`)
    }

    // if necessary, toggle "--appeared" after other navs have disappeared
    const lastNav = document.querySelector(`.${root}__${navs.length}`)
    if (!lastNav) reject(`Error in handleTransitionEnd: missing selector .${root}__${navs.length}`)
    lastNav.addEventListener('transitionend', () =>
      resolve(
        currentNav.classList.contains(`${selector}--appear`) && currentNav.classList.add(`${selector}--appeared`),
      ),
    )
  })

const animateLeaveHome = () =>
  new Promise((resolve, reject) => {
    TweenMax.to('#intro', 1.5, { x: '100%', autoAlpha: 0, ease: Back.easeInOut })
    resolve()
  })

const orientationchange = () => {
  if (document.querySelector('.at_content--home')) {
    document.querySelector('.at').style.display = 'none'
    location.reload()
  }
}

window.removeEventListener('orientationchange', orientationchange)
window.addEventListener('orientationchange', orientationchange)

export { animateEnterHome, animateLeaveHome, enterHome }
