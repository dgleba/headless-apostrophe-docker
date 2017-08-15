const aposRefreshable = document.querySelector('.apos-refreshable')
// loaded pages array, start by adding the current one when loading the first page
let loaded = [
  {
    url: window.location.pathname,
    data: aposRefreshable.innerHTML
  }
]

/**
 * displayPage : add class to toggle menu page
 * @param {Array} divs
 * @param {Number} number
 * @param {string} url
 */
const displayPage = (divs, number, url) => {
  const root = 'at_menu'
  const numberEl = document.querySelector(`.${root}__${number}`)
  const atContent = document.querySelector('.at_content')

  if (atContent) {
    atContent.classList.remove('slide-up')
    atContent.classList.add('slide-down')
  }

  // re-enable swing animation on menu bars in homepage
  numberEl.classList.remove(`${root}__${number}--appeared`)

  divs.forEach(
    (div, i) =>
      number - 1 === i
        ? div.classList.toggle(`${root}__${i + 1}--appear`)
        : div.classList.toggle(`${root}__${i + 1}--disappear`)
  )

  /**
   * chainify : enable chaining functions on objects
   * @param {Object} obj
   * @param {Array} fns - array of functions to attach to prototype and chain
   * @param {*} type - prototype of object
   */
  const chainify = (obj, fns, type) => {
    fns.forEach(fn => {
      /**
       * extend prototype native function
       * @param {String} args - argument
       * @param {Bool} getResult - if true, return result instead of object
       */
      obj[fn] = (args = null, getResult = false) => {
        const result = type.prototype[fn].call(obj, args)
        if (getResult) return result
        else return obj
      }
    })
  }

  handleTransitionEnd(`.${root}__${divs.length}`)
    .then(_ => ajaxLoad(url))
    .then(_ => {
      const title = numberEl.querySelector('.title')
      let array = document.title.split(' | ')
      chainify(array, ['pop', 'push', 'join'], Array) // add some Array functions to the array instance
      array = array.pop().push(title.innerText).join(' | ', true) // in order to chainify calls
      document.title = array // replace title document after ajax load
    })
}

const handleMenuClick = () => {
  const divs = document.querySelectorAll('[page]')
  /**
   * Attach event listener on menu elements
   * e.target.attributes.page.value : data attribute on div element
   */
  divs.forEach(div =>
    div.addEventListener('click', e => {
      let page, url
      if (e.target.attributes.page && e.target.classList.contains('attr')) {
        // click on nav element on home
        page = e.target.attributes.page.value
        url = e.target.attributes.url.value
        displayPage(divs, page, url)
      } else if (e.target.classList.contains('attr-1-level')) {
        // click on span element (page title) on home or breadcrumb on pages
        page = e.target.parentNode.attributes.page.value
        url = e.target.parentNode.attributes.url.value
        displayPage(divs, page, url)
      } else if (e.target.classList.contains('attr-2-levels')) {
        // click on svg back button in page
        page = e.target.parentNode.parentNode.attributes.page.value
        url = e.target.parentNode.parentNode.attributes.url.value
        displayPage(divs, page, url)
      }
    })
  )
}

const handleHrefClick = () => {
  const links = document.querySelectorAll('[href]')

  /**
   * Attach event listener on <a href> links
   * e.target.pathname: url to load
   */
  links.forEach(link =>
    link.addEventListener('click', e => {
      e.preventDefault()
      ajaxLoad(e.target.pathname)
    })
  )
}

const handleTransitionEnd = selector => {
  return new Promise((resolve, reject) => {
    document
      .querySelector(selector)
      .addEventListener('transitionend', _ => resolve())
  })
}

const handleEvents = () => {
  handleMenuClick()
  handleHrefClick()
}

/**
 * Handle history back, i.e when clicking on back button in browser
 */
window.addEventListener('popstate', _ => {
  loaded.pop() // remove last loaded page, that is to say the oen before going back
  const obj = loaded[loaded.length - 1] // get previous loaded page
  if (obj) {
    document.querySelector('.apos-refreshable').innerHTML = obj.data
    handleEvents()
  } else document.location.reload() // add it to the DOM // or reload in case of problem
})

/**
 * Load template with ajax
 * @param {string} url
 * @param {array} divs
 */
const ajaxLoad = url => {
  $.ajax({ url }).done(data => {
    loaded.push({ url, data }) // add page to loaded pages
    history.pushState(null, null, url)

    aposRefreshable.innerHTML = data
    handleEvents()
  })
}

handleEvents()
