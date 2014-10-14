describe('dom', function() {

    var div = document.createElement('div')
    div.innerHTML = '<ul id="ul"></ul>'
    document.body.appendChild(div)

    it('count', function() {
        var $ul = $('#ul')
        assert.equal(1, $ul.length)
        assert.equal('ul', $ul[0].id)
    })
})
