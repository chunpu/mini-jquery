var assert = require('assert')
var $ = require('../')
!function(global, document) {
    var __div = document.createElement('div')
    var __div2 = document.createElement('div')
    document.body.appendChild(__div)
    document.body.appendChild(__div2)
    $.extend(global, {
          assert: assert
        , $: $
        , init: function(html) {
            __div.innerHTML = html
        }
        , initWithoutClear: function(html) {
            __div2.innerHTML += html
        }
    })
}(window, document)
