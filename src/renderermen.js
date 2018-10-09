const tokenlize = require('./tokenlize').tokenlize
const compile = require('./compile').compile

function render(template) {
    return new Function('model', compile(tokenlize(template)))
}

module.exports = {
    render
}