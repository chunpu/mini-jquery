require('./global')
describe('$.type', function() {
    // different of jquery, $.type return class type
    it('array', function() {
        assert($.type([]), 'array')
    })
    it('function', function() {
        assert($.type(function() {}, 'function'))
    })
    it('object', function() {
        assert($.type({}, 'object'))
    })
    it('regexp', function() {
        assert($.type(/111/, 'regexp'))
    })
    it('undefined', function() {
        assert($.type(undefined, 'undefined'))
    })
    it('document should return object', function() {
        assert($.type(document), 'object')
    })
    it('window should return object', function() {
        assert($.type(window), 'object')
    })
    it('null', function() {
        assert($.type(null), 'null')
    })
    it('date', function() {
        assert($.type(new Date()), 'date')
    })
    it('error', function() {
        assert($.type(Error()), 'error')
    })
})
