import { pages } from 'config'
import { Back, Power4, TimelineMax, TweenMax } from 'gsap'
import {
  getData,
  getPreviousUrl,
  animateEnterScripts,
  animateLeaveScripts,
  enterScripts,
  matchRoutePattern,
  widgets,
} from 'helpers'

/**
 * Wait end of animation before loading page
 * @param {String} url
 * @param {String} animate - name of animation
 * @param {Object} options
 */
const displayPage = (url, animate, options = {}) => {
  runLeaveAnimation(url, options)
    .then(() => runEnterAnimation(animate, options))
    .then(() => getData(url))
    .catch(console.log)
}

/**
 * Run animation script and listen to end of transition/animation
 * Animation script must return a Promise
 * @param {String} animate
 * @param {Object} options
 * @returns {Promise}
 */
const runEnterAnimation = (animate, options) =>
  new Promise(
    (resolve, reject) =>
      animate
        ? animateEnterScripts.forEach(
            s =>
              s.type === animate &&
              s
                .script(options)
                .then(resolve)
                .catch(reject),
          )
        : resolve(),
  )

const runLeaveAnimation = (url, options) =>
  new Promise((resolve, reject) => {
    if (options.previousUrl) url = options.previousUrl
    const previousUrl = getPreviousUrl()
    pages.forEach(page => {
      // find page type attached to url in apostrophe-pages config
      if (previousUrl.split('/')[1] === page.slug.slice(1)) {
        // if script attached to current page, execute it
        if (url === '/' && matchRoutePattern(previousUrl)) {
          // go back from show page to home : update title before animation
          const titleBars = document.querySelectorAll('.at_menu__title')
          titleBars.forEach(titleBar => (titleBar.textContent = titleBar.attributes.title.value))
        }
        animateLeaveScripts.forEach(
          r =>
            r.type === page.type &&
            r
              .script(url)
              .then(resolve)
              .catch(reject),
        )
      }
    })
  })

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
    const url = el.attributes.url.value
    if (el.tagName !== 'NAV' || !window.location.pathname.includes(url)) {
      // block link to same page on index.html and show.html
      const options = { number: el.attributes.page.value }
      const animate = el.attributes.animate && el.attributes.animate.value
      // runLeaveScripts()
      displayPage(url, animate, options)
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

    // when link to other page type (eg: link in "intro" to "career"), update "appeared" page
    const type = el.attributes.type
    if (type) {
      const [selected] = pages.filter(page => page.type === type.value && page)
      const navs = document.querySelectorAll('nav[page]')
      navs.forEach(nav => {
        if (nav.attributes.url.value === selected.slug) {
          const newNumber = nav.attributes.page.value
          const newMenu = document.querySelector(`.at_menu__${newNumber}`)
          const currentMenu = document.querySelector('[class$="--appeared"]')
          const currentNumber = currentMenu.attributes.page.value

          currentMenu.classList.remove(`at_menu__${currentNumber}--appear`, `at_menu__${currentNumber}--appeared`)
          currentMenu.classList.add(`at_menu__${currentNumber}--disappear`)

          newMenu.classList.remove(`at_menu__${newNumber}--disappear`)
          newMenu.classList.add(`at_menu__${newNumber}--appear`, `at_menu__${newNumber}--appeared`)
        }
      })
    }

    const menuBar = document.querySelector('[class$="--appeared"]') || ev.target
    const url = el.attributes.href.value
    const animate =
      (el.attributes.animate && el.attributes.animate.value) || (url === '/' && menuBar.attributes.animate.value)
    // find any "animate-" attribute and add them as options for the animation
    const options = Object.values(el.attributes)
      .filter(a => /animate-.\w+/.test(a.name) && a)
      .reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), {})

    displayPage(url, animate, options)
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
 * Find attached scripts to current page and widgets loaded in page
 */
const runEnterScripts = url => findScriptAndRunIt(url, 'enterScripts')

const findScriptAndRunIt = (url = window.location.pathname, type) => {
  const scripts = { enterScripts }
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
      const options = { number: menuBar.attributes.page.value, previousUrl }
      displayPage(currentUrl, animate, options)
    } else document.location.reload()
  }
}
window.removeEventListener('popstate', popstate)
window.addEventListener('popstate', popstate)

/**
 * Browse <a href> links and menu bars, and attach click events
 */
const handleEvents = () => {
  handleMenuClick()
  handleHrefClick()
  runEnterScripts()
}

export { handleEvents }
