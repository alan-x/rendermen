/**
 * 将模板转化成代码
 *
 * @param template 模板字符串
 * @returns {string} 代码字符串
 */
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

/**
 * 将一个字符串渲染成模板函数
 * 执行该行数返回真正的渲染后的模板字符串
 *
 * @param template 模板
 * @returns {Function} 模板函数
 */
function render(template) {
    return new Function('model', factory(template))
}


module.exports = {
    render,
    factory
}