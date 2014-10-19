describe('$.Callbacks', function() {

    it('init', function() {
        var cb = $.Callbacks()
        var cb2 = new $.Callbacks
        assert.deepEqual(cb, cb2)
        assert(cb != cb2, 'not equal')
    })

    it('simple add and fire', function() {
        var cb = $.Callbacks()
        var i = 0
        var fn = function() {
            i++
        }
        cb.add(fn).fire()
        assert.equal(i, 1)
    })
    
    it('multi add and fire', function() {
        var cb = $.Callbacks()
        var i = 0
        var fn1 = function() {
            assert.equal(i, 0)
            i += 1
        }
        var fn2 = function() {
            assert.equal(i, 1)
            i += 2
        }
        var fn3 = function() {
            assert.equal(i, 3)
            i += 3
        }
        cb.add(fn1).add(fn2).add(fn3).fire()
        assert.equal(i, 6)
    })

    it('unique', function() {
        var i = 0
        var cb = $.Callbacks({
            unique: true
        })
        var fn = function() {
            i++
        }
        cb.add(fn).add(fn).fire()
        assert.equal(i, 1)
    })

    it('default no unique', function() {
        var i = 0
        var cb = $.Callbacks()
        var fn = function() {
            i++
        }
        cb.add(fn).add(fn).fire()
        assert.equal(i, 2)
    })

    it('fireWith', function() {
        var i = 0
        var fn = function(foo, bar) {
            i++
            assert.equal(this, document)
            assert.equal(foo, 'foo')
            assert.equal(bar, 'bar')
        }
        var cb = $.Callbacks()
        cb.add(fn).fireWith(document, ['foo', 'bar'])
        assert.equal(i, 1)
    })

    it('fire', function() {
        var cb = $.Callbacks()
        var i = 0
        var fn = function(foo, bar) {
            i++
            assert.equal(this, cb)
            assert.equal(foo, 'foo')
            assert.equal(bar, 'bar')
        }
        cb.add(fn).fire('foo', 'bar')
        assert.equal(i, 1)
    })

    it('fire', function() {
        var cb = $.Callbacks()
        var i = 0
        var fn = function(foo, bar) {
            i++
            assert.equal(this, cb)
            assert.equal(foo, 'foo')
            assert.equal(bar, 'bar')
        }
        cb.add(fn).fire('foo', 'bar')
        assert.equal(i, 1)
    })

    it('remove', function() {
        var cb = $.Callbacks()
        var i = 0
        var removed = function() {
            assert(false, 'function is removed')
        }
        var notremoved = function() {
            i++
        }
        cb.add(removed).add(notremoved).add(removed).remove(removed).fire()
        assert.equal(i, 1)
        cb.add(removed).add(notremoved).add(removed).remove().fire()
        assert.equal(i, 1)
    })

    it('remove namespace', function() {
        var cb = $.Callbacks()
        var i = 0
        var removed = function() {
            assert(false, 'not the right namespace')
        }
        cb.add(removed, {
            namespace: 'removed'
        }).add(function() {
            i++
        }, {
            namespace: 'fire'
        }).add(removed, {
            namespace: 'removed'
        }).remove('.removed').fire()
        assert.equal(i, 1)
    })

})
