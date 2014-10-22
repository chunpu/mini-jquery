describe('querystring', function() {
    it ('stringify', function() {
        var qs = $.querystring.stringify({
            a: 1,
            b: 'foo'
        }) // is order the problem?
        assert(qs == 'a=1&b=foo' || qs == 'b=foo&a=1', 'should be same')
    })

    it ('parse', function() {
        var query = $.querystring.parse('a=1&b=foo')
        assert.deepEqual(query, {
            a: 1,
            b: 'foo'
        })
    })

})
