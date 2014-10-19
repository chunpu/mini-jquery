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
        assert.equal($li.length, 2)
    })

    it('$([dom1, dom2])', function() {
        var $ul = document.getElementsByTagName('ul')
        var len = $ul.length
        assert(!$ul.jquery, 'not jquery nodes')
        var $ul2 = $($ul)
        assert($ul2.jquery, 'jquery nodes')
        assert.equal($ul2.length, $ul.length)
    })

    it('$($nodes)', function() {
        var $nodes1 = $('ul')
        var $nodes2 = $($nodes1)
        assert.equal($nodes2.length, $nodes1.length, '$($nodes) same length')
        assert($nodes2 != $nodes1, 'not the same object')
    })

    it('$(<div>div</div>)', function() {
        var $div = $('<div>div</div>')
        assert.equal($div.length, 1)
        var div = $div[0]
        assert.equal(div.innerHTML, 'div')
        assert.equal(div.tagName.toUpperCase(), 'DIV')
    })
    
    it('$(<div>)', function() {
        var $div = $('<div>')
        assert.equal($div.length, 1)
        var div = $div[0]
        assert.equal(div.tagName.toUpperCase(), 'DIV')
        assert.equal(div.innerHTML, '')
    })

})
