describe('dom', function() {

    it('$(#id)', function() {
        var $ul = $('#ul')
        assert.equal(1, $ul.length, '$(#id) always get one')
        assert.equal('ul', $ul[0].id, 'id is ul')
    })
})
