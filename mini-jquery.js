!function(f) {
    if ('object' == typeof exports) module.exports = f()
    else if ('function' == typeof define && define.amd) define(f)
    else if ('undefined' !== typeof window) window.$ = f()
}(function() {

var $ = function(selector, context) {
    return new $.fn.init(selector, context)
}

// var

var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
    , rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g
    , slice = [].slice
    , doc = document
    , expando = function() {
        return Math.random() + 1
    }
    , classes = 'boolean number string function array date regexp object error'.split(' ')

// core
$.fn = $.prototype = {
    version: '0.0.1',
    constructor: $,
    length: 0,
    jquery: true,
    toArray: function() {
        return $.toArray(this)
    },
    get: function(i) {
        return null == i ? (num < 0 ? this[i + this.length] : this[i]) : this.toArray()
    },
    find: function(str) {
        return $($.find(str, this))
    },
    each: function(fn) {
        return $.each(this, fn)
    },
    pushStack: function(elems) {
        var ret = $.merge($(), elems)
        ret.prevObject = this
        ret.context = this.context
        return ret
    },
    end: function() {
        return this.prevObject || $()
    },
    eq: function(i) {
        var len = this.length
        i = +i
        if (i < 0) {
            i = len + i
        }
        return this.pushStack([this[i]] || [])
    },
    first: function() {
        return this.eq(0)
    },
    last: function() {
        return this.eq(-1)
    },
    slice: function() {
        return this.pushStack(slice.apply(this, arguments))
    }
}

var root

$.fn.init = function (selector, context) {
    if (!selector) return this
    var len = selector.length
    if ('function' == typeof selector) {
        // TODO ready
        return selector($)
    } else if (selector.nodeType) {
        this.context = this[0] = selector
        this.length = 1
    } else if (len && selector[0].nodeType) {
        $.toArray(selector, this)
    } else if ('string' == typeof selector) {
        if (-1 != selector.indexOf('<')) {
            var div = doc.createElement('div')
            div.innerHTML = selector
            return $(div.childNodes)
        }
        // TODO parse html
        else if (!context || context.jquery) {
            return (context || root).find(selector)
        }
        
    }
    return this
}
// the order...
$.fn.init.prototype = $.fn
root = $(doc)

$.extend = $.fn.extend = function() {
    var len = arguments.length
    var i = 1, obj
    var target = arguments[0] || {}
    if (1 == len) {
        target = this
        i--
    }
    for (; i < len; i++) {
        obj = arguments[i]
        if (obj && 'object' == typeof obj) {
            for (var k in obj) {
                target[k] = obj[k]
            }
        }
    }
    return target
}

$.extend({
    expando: expando(),
    toArray: function(arr, ret) {
        return [].push.apply(ret || [], arr)
    },
    noop: function() {},
    each: function(arr, fn) {
        var len = arr ? arr.length : 0
        if (len && len > 0 && 'function' == typeof fn) {
            for (var i = 0; i < len; i++) {
                if (false === fn.call(arr[i], i, arr[i], arr)) break
            }
        }
        return arr
    },
    filter: function(arr, fn) {
        var ret = []
        $.each(arr, function(k, v) {
            if (fn.call(this, k, v, arr)) {
                ret.push(v)
            }
        })
        return ret
    },
    map: function(arr, fn) {
        var ret = []
        $.each(arr, function(k, v) {
            ret[k] = fn.call(this, k, v, arr)
        })
        return ret
    },
    trim: function(str) {
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
        return null == str ? '' : (str + '').replace(rtrim, '')
    },
    proxy: function(fn, context) {
        var tmp
        if ('string' == typeof context) {
            tmp = fn
            fn = fn[context]
            context = tmp
        }
        var args = slice.call(arguments, 2)
        return function() {
            return fn.apply(context || this, args.concat(slice.call(arguments)))
        }
    },
    indexOf: function(arr, val, from) {
        var i = (from  || 0) - 1
        var len = arr.length
        while (++i < len) {
            if (arr[i] === val) {
                return i
            }
        }
        return -1
    },
    now: function() {
        return +new Date()
    },
    merge: function(a, b) {
        var len = +b.length
        , j = 0
        , i = a.length
        for (; j < len; j++) {
            a[i++] = b[j]
        }
        a.length = i
        return a
    },
    find: function(str, context, ret) {
        ret = ret || []
        if (context && context.length) {
            for (var i = 0, node; node = context[i++];) {
                ret.push.apply(ret, $.findOne(str, node))
            }
        } else {
            ret.push.apply(ret, $.findOne(str, context))
        }
        return ret
    },
    findOne: function(str, node) {
        node = node || doc
        var ret = []
        if ($.customFind) {
            ret = slice.call($.customFind(str, node))
        } else if (node.querySelectorAll) {
            var nodes = node.querySelectorAll(str)
            ret = slice.call(nodes)
        }
        return ret
    },
    error: function(msg) {
        throw new Error(msg)
    },
    parseJSON: function(str) {
        if (window.JSON && JSON.parse) {
            return JSON.parse(str + '')
        }

        str = $.trim(str + '')
        var depth, requireNonComma

        return str && !$.trim(str.replace(rvalidtokens, function(token, comma, open, close) {
            if (requireNonComma && comma) depth = 0
            if (depth = 0) return token
            requireNonComma = open || comma
            depth += !close - !open
            return ''
        })) ? (Function('return ' + str))() : $.error("Invalid JSON: " + data)
    },
    getClassName: function(val) {
        var ret = {}.toString.call(val).split(' ')[1]
        return ret.substr(0, ret.length - 1).toLowerCase()
    },
    type: function(val) {
        var tp = typeof val
        if (tp == 'object' || tp == 'function') {
            var className = $.getClassName(val)
            if (-1 == $.indexOf(classes, className)) {
                return 'object'
            }
            return className
        }
        return tp
    }
})

// access

$.access = function(elems, fn, key, val) {
    var i = 0
    if (key && 'object' === typeof key) {
        // set multi k, v
        for (i in key) {
            $.access(elems, fn, i, key[i], true)
        }
    } else if (undefined === val) {
        // get value
        return fn(elems[0], key)
    } else {
        // set one k, v
        for (i = 0; i < elems.length; i++) {
            fn(elems[i], key, val)
        }
    }
    return elems
}

// access
$.fn.extend({
    text: function(val) {
        return $.access(this, $.text, null, val)
    },
    html: function(val) {
        return $.access(this, $.html, null, val)
    },
    attr: function(key, val) {
        return $.access(this, $.attr, key, val)
    },
    prop: function(key, val) {
        return $.access(this, $.prop, key, val)
    },
    css: function(key, val) {
        return $.access(this, $.css, key, val)
    },
    data: function(key, val) {
        return $.access(this, $.data, key, val)
    }
})

// manipulation
$.fn.extend({
    domManip: function(args, fn) {
        // TODO 把 $().before('<h1>xx</h1>') 变为正常的
        return this.each(function() {
            fn.apply(this, args)
        })
    },
    remove: function() {
        return this.domManip(arguments, function() {
            if (this.parentNode) {
                this.parentNode.removeChild(this)
            }
        })
    },
    before: function() {
        return this.domManip(arguments, function(elem) {
            if (elem.parentNode) {
                elem.parentNode.insertBefore(elem, this)
            }
        })
    },
    after: function() {
        return this.domManip(arguments, function(elem) {
            if (elem.parentNode) {
                elem.parentNode.insertBefore(elem, this.nextSibling)
            }
        })
    }
})

var data_user = {
    expando: expando(),
    cache: []
}

var data_priv = {
    expando: expando(),
    cache: []
}

$.extend({
    attr: function(elem, key, val) {
        if (undefined === val) {
            return elem.getAttribute(key)
        } else if (null === val) {
            return elem.removeAttribute(key)
        }
        elem.setAttribute(key, '' + val)
    },
    text: function(elem, key, val) {
        // TODO innerText
        if (undefined === val) {
            return elem.textContent
        }
        elem.textContent = '' + val
    },
    html: function(elem, key, val) {
        if (undefined === val) {
            return elem.innerHTML
        }
        elem.innerHTML = '' + val
    },
    prop: function(elem, key, val) {
        if (undefined === val) {
            return elem[key]
        }
        elem[key] = val
    },
    css: function(elem, key, val) {
        var style = elem.style || {}
        if (undefined === val) {
            return style[key]
        }
        style[key] = val
    },
    data: function(elem, key, val) {
        if (undefined !== val) {
            // set val
            if (elem[data_user.expando] >= 0) {
                data_user.cache[elem[data_user.expando]][key] = val
            } else {
                var len = data_user.cache.length
                elem[data_user.expando] = len
                data_user.cache[len] = {}
                data_user.cache[len][key] = val
            }
        } else {
            var ret = data_user.cache[elem[data_user.expando]] || {}
            if (key) {
                return ret[key]
            }
            return ret
        }
    }
})

// Callbacks
$.Callbacks = function(opt) {
    if (!(this instanceof $.Callbacks)) {
        return new $.Callbacks(opt)
    }
    this.cache = []
}

var callback = $.Callbacks.prototype

callback.add = function(fn, opt) {
    opt = opt || {}
    opt.handler = fn
    this.cache.push(opt)
    return this
}

callback.remove = function(fn) {
    if (fn) {
        for (var i = 0, x; x = this.cache[i]; i++) {
            if ('string' == typeof fn && '.' === fn[0]) {
                if (fn.substr(1) == x.namepsace) {
                    this.cache.splice(i, 1)
                    break
                }
            }
            if (x.handler == fn) {
                this.cache.splice(i, 1)
                break
            }
        }
    } else {
        this.cache.length = 0
    }
    return this
}

callback.fire = function() {
    return this.fireWith(this, arguments)
}

callback.fireWith = function(ctx, args) {
    $.each(this.cache, function() {
        return this.handler.apply(ctx, args)
    })
}


// events
function _handler(e) {
    var events = $.data(this, '_events') || {}
    if (events[e.type]) {
        events[e.type].fireWith(this, [e])
    }
    // TODO prevent default
}

$.extend({
    on: function(elem, ev, handler) {
        var events = $.data(elem, '_events')
        var arr = ev.split('.')
        ev = arr[0]
        if (!events) {
            events = {}
            $.data(elem, '_events', events)
        }
        events[ev] = events[ev] || new $.Callbacks()
        elem.addEventListener(ev, _handler, false)
        events[ev].add(function(ev) {
            var ret = handler.call(this, ev)
            if (false === ret) {
                ev.preventDefault()
                ev.stopPropagation()
            }
            // TODO stopImmediatePropagation = return false
        }, {
            namespace: arr[1]
        })
    },
    // off click, .namespace, click handler, __
    off: function(elem, ev, handler) {
        // $.off(elem, 'click', [handler])
        var events = $.data(elem, '_events')
        if (!events) return
        if ('.' == ev[0]) {
            // namespace
            for (var key in events) {
                events[key].remove(ev)
            }
        } else if (events[ev]) {
            events[ev].remove(handler)
            if (!handler) {
                // the event is empty
                elem.removeEventListener(ev, _handler, false)
            }
        }
    }
})

$.fn.extend({
    eventHandler: function(events, handler, fn) {
        events = events.split(' ')
        return this.each(function() {
            for (var i = 0; i < events.length; i++) {
                fn(this, events[i], handler)
            }
        })
    },
    on: function(events, handler) {
        return this.eventHandler(events, handler, $.on)
    },
    off: function(events, handler) {
        return this.eventHandler(events, handler, $.off)
    }
})

// TODO ajax, jsonp, evalUrl
var ajaxSetting = {
    xhr: function() {
        try {
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest()
            }
            return new ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
    },
    jsonp: 'callback'
}

$.ajaxSetting = ajaxSetting

function request(url, opt, cb) {
    if (url && 'object' == typeof url) {
        return $.ajax(url.url, url, cb)
    }

    if ('function' == typeof opt) {
        cb = opt
        opt = {}
    }
    cb = cb || $.noop

    // TODO seperate by dataType, return {send, abort} 
    //if dataType == jsonp, script
    var dataType = opt.dataType

    var xhr = ajaxSetting.xhr()
    var type = opt.type || 'GET'
    xhr.open(type, url, !cb.async, opt.username, opt.password)
    var headers = opt.headers

    if (headers) {
        for (var key in headers) {
            xhr.setRequestHeader(key, headers[key])
        }
    }

    xhr.withCredentials = true
    xhr.send(opt.data)

    var handler = function() {
        if (handler &&  4 === xhr.readyState) {
            handler = undefined
            cb(null, xhr, xhr.responseText)
        }
    }
    if (false === opt.async) {
        handler()
    } else if (4 === xhr.readyState) {
        setTimeout(handler)
    } else {
        xhr.onreadystatechange = handler
    }

    if (opt.timeout) {
        setTimeout(function() {
            xhr.onreadystatechange = $.noop
            xhr.abort()
            cb('timeout', xhr)
        }, opt.timeout)
    }
}

$.ajax = function(url, opt) {
    // TODO fuck the status, statusText, even for jsonp
    request(url, opt, function(err, xhr, body) {
        if (err) {
            opt.error && opt.error(err, xhr.statusText, xhr)
        } else {
            opt.success && opt.success(body, xhr.statusText, xhr)
        }
        opt.complete && opt.complete(xhr, xhr.statusText)
    })
}

$.each(['get', 'post'], function(i, method) {
    $[method] = function(url, data, callback, dataType) {
        if ('function' == typeof data) {
            dataType = callback
            callback = data
            data = undefined
        }
        $.ajax(url, {
            type: method,
            dataType: dataType,
            data: data,
            success: callback
        })
    }
})

return $

})
