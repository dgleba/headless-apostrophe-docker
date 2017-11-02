import { pages } from 'config'
import ajaxLoad from 'helpers/ajax'
import chainify from 'helpers/chainify'
import { replaceInnerHTML, getDataIfLoaded, pop } from 'helpers/pageHistory'
import { routes, widgets } from 'helpers/scripts'

import { Back, TimelineMax } from 'gsap'

const root = 'at_menu'

/**
 * Add class to toggle menu animation and load page
 * @param {Number} number
 * @param {String} url
 */
const displayPage = (number, url, animate) => {
  const navs = document.querySelectorAll('nav[page]')
  const wait = animateBeforeLeaving(number, animate, navs)

  handleTransitionEnd(`.${root}__${navs.length}`, url, wait)
    .then(_ => getDataIfLoaded(url))
    .then(data => {
      if (data) replaceInnerHTML(url, data)
      else ajaxLoad(url, data => replaceInnerHTML(url, data, true))
    })
    .catch(err => {
      throw new Error(err)
    })
}

/**
 * Animation when leaving current page
 */
const animateBeforeLeaving = (number, animate, navs) => {
  const atContent = document.querySelector('.at_content')
  const atContentHome = document.querySelector('.at_content--home')
  const menuBar = document.querySelector(`.${root}__${number}`)
  let wait = false

  if (atContent && !atContentHome) {
    atContent.classList.remove('slide-up')
    atContent.classList.add('slide-down')
  } else if (atContentHome) {
    const tl = new TimelineMax()
    tl.to('#intro', 1.5, { x: '100%', autoAlpha: 0, ease: Back.easeInOut })
  }

  if (animate === 'menu') {
    wait = true
    // re-enable swing animation on menu bars in homepage
    menuBar.classList.remove(`${root}__${number}--appeared`)

    navs.forEach(
      (nav, i) =>
        number - 1 === i
          ? nav.classList.toggle(`${root}__${i + 1}--appear`)
          : nav.classList.toggle(`${root}__${i + 1}--disappear`)
    )
  }

  return wait
}

/**
 * Browse clickable HTML tags with "page" attribute and attach click events
 */
const handleMenuClick = () => {
  const clickableElements = document.querySelectorAll('[page]')

  /**
   * Attach event listener on "page" attribute
   */
  clickableElements.forEach(el =>
    el.addEventListener('click', e => {
      e.stopPropagation()
      const page = el.attributes.page.value
      const url = el.attributes.url.value
      const animate = el.attributes.animate && el.attributes.animate.value
      displayPage(page, url, animate)
    })
  )
}

/**
 * Browse <a href> links and attach click events
 */
const handleHrefClick = () => {
  const links = document.querySelectorAll('[href].ajax')

  /**
   * Attach event listener on <a href> links
   */
  links.forEach(link =>
    link.addEventListener('click', e => {
      e.preventDefault()
      const url = link.attributes.href.value
      ajaxLoad(url, data => replaceInnerHTML(url, data, true))
    })
  )
}

/**
 * Listen to end of transition on the last menu bar on homepage
 * @param {String} selector
 * @param {String} url
 * @param {Boolean} wait - true if needed to wait until the end of the animation
 */
const handleTransitionEnd = (selector, url, wait) => {
  return new Promise((resolve, reject) => {
    if (!wait) resolve()

    const element = document.querySelector(selector)
    if (!element) reject(new Error(`missing selector ${selector}`))
    element.addEventListener('transitionend', _ => resolve())
  })
}

/**
 * Find attached scripts to current page and widgets loaded in page
 */
const runScripts = () => {
  pages.forEach(page => {
    // find page type attached to url in apostrophe-pages config
    if (window.location.pathname.split('/')[1] === page.slug.slice(1)) {
      // if script attached to current page, execute it
      routes.forEach(r => (r.type === page.type ? r.script() : null))

      const areas = document.querySelectorAll('.apos-area-widget')
      if (areas) {
        areas.forEach(a =>
          widgets.forEach(
            w =>
              w.type === a.attributes['data-apos-widget'].value
                ? w.script()
                : null
          )
        )
      }
    }
  })
}

/**
 * Handle history back, i.e when clicking on back button in browser
 */
window.addEventListener('popstate', e => {
  const menuBar = document.querySelector('[class$="--appeared"]')
  if (menuBar) {
    const page = menuBar.attributes.page.value
    const url = pop()
    const animate = url === '/' && menuBar.attributes.animate.value
    displayPage(page, url, animate)
  } else document.location.reload()
})

/**
 * Browse <a href> links and menu bars, and attach click events
 */
const handleEvents = () => {
  handleMenuClick()
  handleHrefClick()
  runScripts()
}

export default handleEvents
