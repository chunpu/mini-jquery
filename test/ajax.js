describe('ajax', function() {
    it('$.request', function(done) {
        $.request('/build.js', function(err, res, body) {
            assert(!err, 'err is falsy')
            assert(body.length > 1000, 'build.js is long > 1000')
            assert.equal(typeof res, 'object', 'res is a object')
        })
        done()
    })
})


