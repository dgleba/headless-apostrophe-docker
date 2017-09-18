import {
  TweenMax,
  TimelineMax,
  Elastic,
  Back,
  Linear,
  TweenPlugin,
  TweenLite
} from 'gsap'
import TextPlugin from 'gsap/TextPlugin'

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

const animateHome = () => {
  // animate menu bars
  const navs = document.querySelectorAll('nav[page]')
  navs.forEach((nav, i) => nav.classList.remove(`at_menu__${i + 1}--disappear`))

  // animate svg
  document.querySelector('#intro').style.display = 'block'
  const content = document.querySelector('.at_content')
  const top = document.body.clientHeight - content.clientHeight
  content.style.top = `${top}px`

  tl
    .to(background, 0, { background: '#2c3e50' })
    .from(bgd, 0.2, { opacity: 0, scale: 0, transformOrigin: 'center center' })
    .staggerFrom(
      table,
      0.2,
      { y: '-=200', opacity: 0, ease: Elastic.easeOut },
      0.1
    )
    .from(lampLeg, 0.2, { opacity: 0, x: '-200', ease: Elastic.easeOut })
    .from(lampbt, 0.2, {
      opacity: 0,
      scale: 0,
      transformOrigin: 'center center'
    })
    .from(lampLineB, 0.2, {
      opacity: 0,
      transformOrigin: '100% 100%',
      rotation: '-180deg'
    })
    .from(lampCircle, 0.1, { opacity: 0, x: '-=100', y: '-=100' })
    .from(lampLineT, 0.2, {
      opacity: 0,
      transformOrigin: '0% 100%',
      rotation: '-180deg'
    })
    .from(lampHead, 0.2, { opacity: 0, scale: 0, ease: Elastic.easeOut })
    .from(lampHeader, 0.2, { transformOrigin: '60% 60%', rotation: '60deg' })
    .from(lampBody, 0.2, { transformOrigin: '70% 70%', rotation: '-25deg' })
    .from(
      computer,
      0.4,
    {
      opacity: 0,
      scale: 0,
      transformOrigin: 'center center',
      ease: Back.easeOut
    },
      '-=1'
    )
    .to(background, 0.2, { fill: '#FDD10D' })
    .staggerFrom(
      keyboard,
      0.5,
      { opacity: 0, y: '-=100', ease: Linear.easeInOut },
      0.05
    )
    .staggerFrom(asset, 0.5, { opacity: 0 }, 0.05)
    .to(
      text_start,
      0.5,
      { text: 'const dev = {', ease: Linear.easeNone },
      '-=3'
    )
    .to(
      text_line_1,
      1,
    {
      text: 'name: "Anthony Tarlao",',
      ease: Linear.easeNone
    },
      '-=2'
    )
    .to(
      text_line_2,
      1,
      { text: 'tech: [ "JS", "PHP", "SCSS", ... ]', ease: Linear.easeNone },
      '-=1'
    )
    .to(text_line_3, 0.5, { text: 'prop:', ease: Linear.easeNone })
    .to(text_line_4, 0.75, {
      text: '[ "Solution maker",',
      ease: Linear.easeNone
    })
    .to(text_line_5, 0.75, { text: '"Passionate",', ease: Linear.easeNone })
    .to(text_line_6, 0.75, { text: '"Great learner" ]', ease: Linear.easeNone })
    .to(text_end, 0.5, { text: '}', ease: Linear.easeNone })
    .to(
      lampLight,
      0.2,
      { opacity: 0.8, ease: Elastic.easeOut, delay: 0.5 },
      'a'
    )
    .to(lampLight, 0.1, { opacity: 0 }, 'b')
    .to(lampLight, 0.1, { opacity: 0.2 }, 'c')
    .to(bgd, 0.2, { opacity: 0.1, delay: 0.5 }, 'a-=0.05')
    .to(bgd, 0.1, { opacity: 1 }, 'b-=0.05')
    .to(bgd, 0.1, { opacity: 0.5 }, 'c-=0.05')
    .to(bgd, 0.2, { opacity: 1, fill: '#FDD10D' })
    .to(background, 0.2, { opacity: 1, background: '#FDD10D' })
    .fromTo(
      lampLine,
      0.2,
      { opacity: 0 },
      { opacity: 0.2, delay: 0.5 },
      'a-=0.05'
    )
    .to(lampLine, 0.1, { opacity: 1 }, 'b-=0.05')
    .to(lampLine, 0.1, { opacity: 0.5 }, 'c-=0.05')
}

window.addEventListener('orientationchange', () => {
  if (document.querySelector('.at_content--home')) {
    document.querySelector('.at').style.display = 'none'
    location.reload()
  }
})

export default animateHome
