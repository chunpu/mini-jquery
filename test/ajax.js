describe('ajax', function() {
    it('$.request', function(done) {
        $.request('/build.js', function(err, res, body) {
            assert(!err, 'err is falsy')
            assert(body.length > 1000, 'build.js is long > 1000')
            assert.equal(typeof res, 'object', 'res is a object')
            done()
        })
    })

    it('$.ajax success', function(done) {
        var i = 0
        var ret = $.ajax('/build.js', {
            success: function(body, text, xhr) {
                assert(i == 0)
                i++
                assert(ret === xhr, 'should be the same object')
                assert.equal('success', text)
                assert.equal('string', typeof body)
                assert(body.indexOf('function') > 0, 'always have function in build.js')
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
        var ret = $.ajax('/notexist', {
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
        var ret = $.ajax('/build.js', {
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

})


