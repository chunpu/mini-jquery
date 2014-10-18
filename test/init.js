describe('init', function() {
    it('$(empty)', function() {
        assert.equal($().length, 0, '$()')
        assert.equal($(undefined).length, 0, '$()')
        assert.equal($(null).length, 0, '$()')
        assert.equal($(0).length, 0, '$()')
        assert.equal($('').length, 0, '$()')
    })

    it('$(#id)', function() {
        var $ul = $('#ul')
        assert.equal(1, $ul.length, '$(#id) always get one')
        assert.equal('ul', $ul[0].id, 'id is ul')
    })

    it('$(tag)', function() {
        var ul = $('#ul')[0]
        assert(ul.nodeType, 'get ul first')
        var $li = $('li', ul)
        assert.equal($li.length, 2, 'get li in ul')
    })

    it('$([dom1, dom2])', function() {
        var $li = document.getElementsByTagName('li')
        assert(!$li.jquery, 'not jquery nodes')
        $li = $($li)
        assert($li.jquery, 'jquery nodes')
    })
})
