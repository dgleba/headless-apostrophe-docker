import { pages } from 'config'

/**
 * Load template with ajax
 * @param {String} url
 * @param {Function} cb - callback called after ajax is done
 */
const ajaxLoad = (url, cb) => {
  // no ajax if connected in back office (load of apostrophe tools necessary)
  if (window.apos) {
    window.location.href = url
  } else {
    const loader = document.querySelector('.loader')
    const timer = setTimeout(_ => (loader.style.display = 'block'), 300)

    let xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.send()
    xhr.onreadystatechange = () => {
      clearTimeout(timer)
      loader.style.display = 'none'
      if (xhr.readyState === 4 && xhr.status === 200) cb(xhr.responseText)
    }
  }
}

export default ajaxLoad
