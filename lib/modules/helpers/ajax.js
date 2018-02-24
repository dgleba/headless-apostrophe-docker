/**
 * Load template with ajax
 * @param {String} url
 */
const ajaxLoad = url => {
  // no ajax if connected in back office (load of apostrophe tools necessary)
  if (window.apos) {
    window.location.href = url
  } else {
    return new Promise((resolve, reject) => {
      const loader = document.querySelector('.loader')
      const timer = setTimeout(_ => (loader.style.display = 'block'), 300)

      let xhr = new XMLHttpRequest()
      xhr.responseType = 'document'
      xhr.open('GET', url, true)
      xhr.send()
      xhr.onerror = e => reject(e)
      xhr.onreadystatechange = () => {
        clearTimeout(timer)
        loader.style.display = 'none'
        if (xhr.readyState === 4 && xhr.status === 200) resolve(xhr.response)
      }
    })
  }
}

export default ajaxLoad
