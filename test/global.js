if (!window.inited) {
    var assert = require('assert')
    var $ = require('../')
    window.assert = assert
    window.$ = $
    var __div = document.createElement('div')
    var __div2 = document.createElement('div')
    document.body.appendChild(__div)
    document.body.appendChild(__div2)
    var init = function(html) {
        __div.innerHTML = html
    }
    var initWithoutClear = function(html) {
        __div2.innerHTML += html
    }
    window.init = init
    window.initWithoutClear = initWithoutClear
    window.inited = true
}
