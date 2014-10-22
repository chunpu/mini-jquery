describe('ajax', function() {
    var empty = '/test/asserts/empty.js'
    it('$.request', function(done) {
        $.request(empty, function(err, res, body) {
            assert(!err, 'err is falsy')
            assert.equal(typeof res, 'object', 'res is a object')
            done()
        })
    })

    it('$.ajax success', function(done) {
        var i = 0
        var ret = $.ajax(empty, {
            success: function(body, text, xhr) {
                assert(i == 0)
                i++
                assert(ret === xhr, 'should be the same object')
                assert.equal('success', text)
                assert.equal('string', typeof body)
                assert(body.indexOf('empty') > 0, 'has empty')
            },
            error: function() {
                assert(false, 'should success')
            },
            complete: function(xhr, text) {
                assert(ret === xhr, 'should be the same object')
                assert.equal('success', text)
                assert(i == 1)
                done()
            }
        })
    })

    it('$.ajax error', function(done) {
        var i = 0
        var ret = $.ajax('/not_exist', {
            success: function() {
                assert(false, 'should error')
            },
            error: function(xhr, text, statusText) {
                assert(i == 0)
                i++
                assert(ret === xhr, 'should be the same object')
                assert.equal(text, 'error')
                assert.equal('string', typeof statusText)
            },
            complete: function(xhr, text) {
                assert(ret === xhr, 'should be the same object')
                assert.equal('error', text)
                assert(i == 1)
                done()
            }
        })
    })

    it('$.ajax timeout', function(done) {
        var i = 0
        var ret = $.ajax(empty, {
            timeout: 1, // small enough
            success: function() {
                assert(false, 'should error')
            },
            error: function(xhr, text, statusText) {
                assert(i == 0)
                i++
                assert(ret === xhr, 'should be the same object')
                assert.equal(text, 'timeout')
                assert.equal('string', typeof statusText)
            },
            complete: function(xhr, text) {
                assert(ret === xhr, 'should be the same object')
                assert('timeout', text)
                assert(i == 1)
                done()
            }
        })
    })

    it('$.ajax dataType = script', function(done) {
        assert.equal(window.foo, undefined)
        $.ajax('/test/asserts/setvar.js', {
            dataType: 'script',
            complete: function() {
                assert.equal(window.foo, 'bar')
                done()
            }
        })
    })

    it('$.ajax dataType = jsonp', function(done) {
        var i = 0
        $.ajax('/test/asserts/jsonp.js', {
            dataType: 'jsonp',
            jsonpCallback: 'jsonpcallback',
            success: function(ret, text, xhr) {
                i++
                assert.deepEqual(ret, {foo: 'bar'})
            },
            error: function() {
                assert(false, 'should success')
            },
            complete: function(xhr, text) {
                assert(i == 1)
                done()
            }
        })
    })

    it('$.ajax dataType = jsonp timeout', function(done) {
        var i = 0
        $.ajax('/test/asserts/jsonp.js', {
            dataType: 'jsonp',
            timeout: 1,
            jsonpCallback: 'jsonpcallback',
            success: function(ret, text, xhr) {
                assert(false, 'should fail')
            },
            error: function(xhr, text) {
                i++
                assert.equal(text, 'timeout')
            },
            complete: function(xhr, text) {
                assert(i == 1)
                done()
            }
        })
    })

})

