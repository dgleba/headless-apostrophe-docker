import { pages } from 'config'
import { Back, Power4, TimelineMax } from 'gsap'
import { ajaxLoad, getData, getPreviousUrl, enterScripts, leaveScripts, widgets } from 'helpers'

const root = 'at_menu'

/**
 * Wait end of animation before loading page
 * @param {Number} number
 * @param {String} url
 */
const displayPage = (number, url, animate) =>
  handleTransitionEnd(number, animate)
    .then(() => getData(url))
    .catch(console.log)

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

    // block link to same page on index.html and show.html
    const url = el.attributes.url.value
    if (url !== window.location.pathname) {
      const page = el.attributes.page.value
      const animate = el.attributes.animate && el.attributes.animate.value
      runLeaveScripts()
      displayPage(page, url, animate)
    }
  }
}

/**
 * Browse <a href> links and attach click events
 */
const handleHrefClick = () => {
  const elements = document.querySelectorAll('[href].ajax, [href][data-apos-page], svg[page]') // ajax and pager links

  const click = (ev, el) => {
    console.log('click ====> ', ev.target)
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
 * @param {String} animate
 */
const handleTransitionEnd = (number, animate) => {
  return new Promise((resolve, reject) => {
    if (animate !== 'menu') resolve()
    else {
      const navs = document.querySelectorAll('nav[page]')
      navs.forEach(
        (nav, i) =>
          number - 1 === i
            ? nav.classList.toggle(`${root}__${i + 1}--appear`)
            : nav.classList.toggle(`${root}__${i + 1}--disappear`),
      )

      const selector = `${root}__${number}`
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
