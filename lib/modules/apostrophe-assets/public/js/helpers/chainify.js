/**
 * Enable chaining functions on objects
 * @param {Object} obj
 * @param {Array} fns - array of functions to attach to prototype and chain
 * @param {*} type - prototype of object
 */
const chainify = (obj, fns, type) => {
  fns.forEach(fn => {
    /**
     * extend prototype native function
     * @param {String} args - argument
     * @param {Boolean} getResult - if true, return result instead of object
     */
    obj[fn] = (args = null, getResult = false) => {
      const result = type.prototype[fn].call(obj, args)
      if (getResult) return result
      else return obj
    }
  })
}

export default chainify
