const WrapperGET = require("../methods/get")

module.exports = function createApiSlice(obj) {
  const proxyWithGet = (obj) => new Proxy(obj, {
    get(obj, p) {
      if (obj[p]) return obj[p]
      if (p === "get") return obj.defaultGet || (() => {})

      return {
        get: obj[WrapperGET] ? () => obj[WrapperGET](p) : undefined
      }
    }
  })
      
  function parseApiSliceObject(slice) {
    let newSlice = {};
    if (slice[WrapperGET]) newSlice = proxyWithGet(slice)

    for (let key in slice) {
      if (slice[key][WrapperGET]) {
        newSlice[key] = parseApiSliceObject(slice[key]);
      } else newSlice[key] = slice[key];
    }

    return newSlice;
  }

  const proxyObject = parseApiSliceObject(obj)

  return new Proxy(obj, {
    get(obj, p) {
      if (obj[p]) return proxyObject[p]
      if (p === "get") return obj.defaultGet || (() => {})
      
      return {
        get: obj[WrapperGET] ? () => obj[WrapperGET](p) : undefined
      }
    }
  })
}