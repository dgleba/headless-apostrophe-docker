import { pages } from 'config'
import { Back, Power4, TimelineMax } from 'gsap'
import { ajaxLoad, getData, getPreviousUrl, enterScripts, leaveScripts, widgets } from 'helpers'

const root = 'at_menu'

/**
 * Add class to toggle menu animation and load page
 * @param {Number} number
 * @param {String} url
 */
const displayPage = (number, url, animate) => {
  const navs = document.querySelectorAll('nav[page]')
  const wait = animateBeforeLeaving(number, animate, navs)
  handleTransitionEnd(number, url, navs, wait)
    .then(() => getData(url))
    .catch(console.log)
}

/**
 * Animation when leaving current page
 */
const animateBeforeLeaving = (number, animate, navs) => {
  const atContentHome = document.querySelector('.at_content--home')
  const menuBar = document.querySelector(`.${root}__${number}`)
  let wait = false

  if (atContentHome) {
    const tl = new TimelineMax()
    tl.to('#intro', 1.5, { x: '100%', autoAlpha: 0, ease: Back.easeInOut })
  }

  if (animate === 'menu') {
    wait = true

    navs.forEach(
      (nav, i) =>
        number - 1 === i
          ? nav.classList.toggle(`${root}__${i + 1}--appear`)
          : nav.classList.toggle(`${root}__${i + 1}--disappear`),
    )
  }

  return wait
}

/**
 * Browse clickable menu tags with "page" attribute and attach click events
 */
const handleMenuClick = () => {
  const nav = document.querySelector('nav.at_menu')
  const elements = nav.querySelectorAll('[page]')
  elements.forEach(el => el.addEventListener('click', ev => click(ev, el)))
  const click = (ev, el) => {
    ev.preventDefault()
    ev.stopPropagation()
    const page = el.attributes.page.value
    const url = el.attributes.url.value
    const animate = el.attributes.animate && el.attributes.animate.value
    if (url !== window.location.pathname) {
      // block link to same page on index.html and show.html
      runLeaveScripts()
      displayPage(page, url, animate)
    }
  }
}

/**
 * Browse <a href> links and attach click events
 */
const handleHrefClick = () => {
  const elements = document.querySelectorAll('[href].ajax, [href][data-apos-page]') // ajax and pager links

  const click = (ev, el) => {
    ev.preventDefault()
    ev.stopPropagation()
    const menuBar = document.querySelector('[class$="--appeared"]') || ev.target
    const page = menuBar.attributes.page.value
    const url = el.attributes.href.value
    const animate = url === '/' && menuBar.attributes.animate.value
    displayPage(page, url, animate)
  }
  /**
   * Attach event listener on <a href> links
   */
  elements.forEach(el => {
    el.removeEventListener('click', ev => click(ev, el))
    el.addEventListener('click', ev => click(ev, el))
  })
}

/**
 * Listen to end of transition on the last menu bar on homepage
 * @param {Number} number
 * @param {String} url
 * @param {Object} navs
 * @param {Boolean} wait - true if needed to wait until the end of the animation
 */
const handleTransitionEnd = (number, url, navs, wait) => {
  return new Promise((resolve, reject) => {
    if (!wait) resolve()
    else {
      const selector = `.${root}__${navs.length}`
      const navSelector = `${root}__${number}`
      const element = document.querySelector(selector)
      const subNav = document.querySelector(`.${navSelector}`)
      const mainNav = document.querySelector(`.${root}`)

      if (!element) reject(`Error in handleTransitionEnd: missing selector ${selector}`)
      const toggleAppeared = () => {
        if (url === '/') {
          subNav.classList.remove(`${navSelector}--appeared`)
          mainNav.classList.remove(`${root}--appear`)
        } else {
          subNav.classList.add(`${navSelector}--appeared`)
          mainNav.classList.add(`${root}--appear`)
        }
        resolve()
      }

      element.removeEventListener('transitionend', toggleAppeared)
      element.addEventListener('transitionend', toggleAppeared)
    }
  })
}

/**
 * Find attached scripts to current page and widgets loaded in page
 */
const runEnterScripts = url => findScriptAndRunIt(url, 'enterScripts')
const runLeaveScripts = url => findScriptAndRunIt(url, 'leaveScripts')

const findScriptAndRunIt = (url = window.location.pathname, type) => {
  const scripts = { enterScripts, leaveScripts }
  pages.forEach(page => {
    // find page type attached to url in apostrophe-pages config
    if (url.split('/')[1] === page.slug.slice(1)) {
      // if script attached to current page, execute it
      scripts[type].forEach(r => r.type === page.type && r.script(r.args))
    }
  })

  const areas = document.querySelectorAll('.apos-area-widget')
  if (areas) {
    areas.forEach(a => widgets.forEach(w => w.type === a.attributes['data-apos-widget'].value && w.script()))
  }
}

/**
 * Handle history back, i.e when clicking on back button in browser
 */
const popstate = e => {
  // if not connected in back office
  if (!window.apos) {
    const menuBar = document.querySelector('[class$="--appeared"]')
    if (menuBar) {
      const previousUrl = getPreviousUrl()
      const currentUrl = window.location.pathname
      const animate = currentUrl === '/' && menuBar.attributes.animate.value
      const page = menuBar.attributes.page.value
      runLeaveScripts(previousUrl)
      displayPage(page, currentUrl, animate)
    } else document.location.reload()
  }
}
window.removeEventListener('popstate', popstate)
window.addEventListener('popstate', popstate)

/**
 * Browse <a href> links and menu bars, and attach click events
 */
const handleEvents = () => {
  handleHrefClick()
  runEnterScripts()
}

export { handleEvents, handleMenuClick }
