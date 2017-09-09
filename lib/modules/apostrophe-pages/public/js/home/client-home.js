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
const text_end = '#text_end'

// TweenPlugin.activate([TextPlugin])

const animateHome = () => {
  document.querySelector('#intro').style.display = 'block'
  tl
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
    .from(lampLineB, 0.3, {
      opacity: 0,
      transformOrigin: '100% 100%',
      rotation: '-180deg'
    })
    .from(lampCircle, 0.1, { opacity: 0, x: '-=100', y: '-=100' })
    .from(lampLineT, 0.3, {
      opacity: 0,
      transformOrigin: '0% 100%',
      rotation: '-180deg'
    })
    .from(lampHead, 0.2, { opacity: 0, scale: 0, ease: Elastic.easeOut })
    .from(lampHeader, 0.5, { transformOrigin: '60% 60%', rotation: '60deg' })
    .from(lampBody, 0.5, { transformOrigin: '70% 70%', rotation: '-25deg' })
    .from(
      computer,
      0.5,
    {
      opacity: 0,
      scale: 0,
      transformOrigin: 'center center',
      ease: Back.easeOut
    },
      '-=1'
    )
    .staggerFrom(
      keyboard,
      0.5,
      { opacity: 0, y: '-=100', ease: Linear.easeInOut },
      0.05
    )
    .to(text_start, 1, { text: 'const dev = {', ease: Linear.easeNone })
    .to(text_line_1, 2, {
      text: 'firstName: "Anthony",',
      ease: Linear.easeNone
    })
    .to(text_line_2, 2, { text: 'lastName: "Tarlao', ease: Linear.easeNone })
    .to(text_end, 1, { text: '}', ease: Linear.easeNone })
    .staggerFrom(asset, 0.5, { opacity: 0 }, 0.05)
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

export default animateHome
