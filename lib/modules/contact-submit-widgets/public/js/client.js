import { site } from 'config'

const playContactWidget = () => {
  const form = document.querySelector('form')
  const msgField = form.querySelector('[data-validation-msg]')

  for (let el of form) {
    if (el.type === 'hidden') {
      // get hidden elements
      const set = el.dataset
      if (set.name && set.required) {
        // add attributes to visible elements if needed
        const input = form.querySelector(`[name="${set.name}"]`)
        input.required = set.required
        set.name === 'email' ? (input.type = 'email') : null
      }
    }
  }

  form.addEventListener('submit', e => {
    e.preventDefault()
    let data = {}
    for (let el of form) {
      // build "data" object that will be sent to server
      el.type !== 'fieldset' && el.type !== 'submit' ? (data[el.name] = el.value) : null
    }

    const token = document.cookie
      .split(`${site}.csrf=`)
      .pop()
      .split(';')
      .shift()
    msgField.innerHTML =
      "Oups, problème détecté lors de l'envoi de l'email&nbsp;&nbsp;:(<br>Veuillez réessayer ultérieurement"

    if (token) {
      const module = __dirname.split('/')
      const xhr = new XMLHttpRequest()
      xhr.open('POST', `/modules/${module[2]}/submit`, true)
      xhr.setRequestHeader('X-XSRF-Token', token)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const response = JSON.parse(xhr.responseText)
          let msg
          if (response.status === 'ok') {
            msg = 'Votre message a bien été envoyé'
          } else {
            msg = ''
            response.status.map(res => {
              if (res.param) {
                msg += res.value
                  ? `La valeur ${res.value} n'est pas valide pour le champ ${res.param}<br>`
                  : `Le champ ${res.param} ne peut pas être vide<br>`
                form.querySelector(`[name=${res.param}]`).style.border = '1px red solid'
              }
            })
          }
          msgField.innerHTML = msg
        }
      }
      xhr.send(JSON.stringify(data))
    }
    msgField.style.display = 'block'
  })

  const initialBorder = e => {
    e.target.style.border = 'none'
    msgField.innerHTML = ''
  }
  form.querySelector('input').addEventListener('change', initialBorder)
  form.querySelector('textarea').addEventListener('change', initialBorder)
}

export default playContactWidget
