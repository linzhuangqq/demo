function proxyApi (entry) {
    return new Proxy(entry, {
      get (target, name) {
        if (name === 'bind') { // @NOTE vue 2.5 使用了bind
          return () => entry
        }
        return (payload, fetch) => {
          return entry(name, payload, fetch)
        }
      }
    })
}
var _dispatch = {a: (e) => {console.log('a', e)}, b: (e) => {console.log('b', e)}, c: (e)=> {console.log('c', e)}}
var dispatch = (type, payload) => {return _dispatch[type](payload)}
dispatch('a', 1)
dispatch('b', 1)
dispatch('c', 1)
var p = proxyApi(dispatch)
p.a(2)
p.b(2)
p.c(2)
