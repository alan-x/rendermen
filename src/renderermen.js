function escape(html) {
    return String(html)
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function factory(template) {
    template = template
        .replace(/\n/g, '')
        .replace(/<%=([\s\S]+?)%>/g, function (match, code) {
            return `';template+=${code};template+='`;
        }).replace(/<%-([\s\S]+?)%>/g, function (match, code) {
            return `';template+'${code}';template+='`;
        }).replace(/<%([\s\S]+?)%>/g, function (match, code) {
            return `';${code}template+='`;
        })
    template = `var template='';template+='${template}';return template;`
    return template
}

function render(template) {
    return new Function('model', factory(template))
}


module.exports = {
    render,
    factory
}