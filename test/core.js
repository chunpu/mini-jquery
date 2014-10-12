function noop() {}

describe('core', function() {

    it('basic', function() {
        assert($, '$')
        assert('object' == typeof $.fn, '$.fn')
    })

    describe('util', function() {
        it('test each', function() {
            $.each(undefined, noop)
            var valArr = []
            $.each([1, 2, 3], function(k, v) {
                assert(this == v)
                valArr.push(v)
            })
            assert.deepEqual([1, 2, 3], valArr, 'should equal')
            valArr.length = 0
            $.each([1, 2, 3], function(k, v) {
                valArr.push(v)
                if (v == 2) return false
            })
            assert.deepEqual([1, 2], valArr, 'break loop')
        })

        it('test extend', function() {
            $.extend({
                a: 1,
                b: 2
            })
            assert(1 === $.a)
            assert(2 === $.b)

            $.fn.extend({
                c: 3,
                d: 4
            })
            assert(3 === $.fn.c)
            assert(4 === $.fn.d)

            var raw = {a: 1, b: 2}
            var ret = $.extend(raw, {c: 3}, {d: 4})
            assert(ret === raw)
            assert.deepEqual(raw, {
                a: 1,
                b: 2,
                c: 3,
                d: 4
            })
        })
    })
})
