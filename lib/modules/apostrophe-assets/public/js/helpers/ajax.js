/**
 * Load template with ajax
 * @param {String} url
 * @param {Function} cb - callback called afte ajax is done
 */
const ajaxLoad = (url, cb) => $.ajax({ url }).done(data => cb(url, data))

export default ajaxLoad
