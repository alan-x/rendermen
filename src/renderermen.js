const tokenlizer = require('./tokenlizer')
const compiler = require('./compiler')

function render(template) {
    return new Function('model', compiler.compile(tokenlizer.tokenlize(template)))
}

module.exports = {
    render
}