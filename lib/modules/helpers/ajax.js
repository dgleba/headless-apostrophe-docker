import { pages } from 'config'

/**
 * Load template with ajax
 * @param {String} url
 * @param {Function} cb - callback called after ajax is done
 */
const ajaxLoad = (url, cb) => {
  const contactUrl = pages.filter(
    (value, index, array) => value.type === 'contact-page',
    []
  )

  // no ajax if connected in back office or for contact page (load of apostrophe tools necessary)
  if (window.apos || url === contactUrl[0].slug) {
    window.location.href = url
  } else {
    let xhr = new XMLHttpRequest()

    xhr.open('GET', url, true)
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == '200') cb(xhr.responseText)
    }
    xhr.send()
  }
}

export default ajaxLoad
