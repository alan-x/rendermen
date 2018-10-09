function compile(tokenlizedArr) {
    tokenlizedArr = tokenlizedArr.reverse()

    let result = `var t='';`

    while (tokenlizedArr.length) {
        let token = tokenlizedArr.pop()

        switch (token.type) {
            case 'variable': {
                result += `t+=${token.value};`
                break
            }
            case 'if': {
                result += `if (${token.value}) {`
                break
            }
            case 'endif': {
                result += `};`
                break
            }
            case 'else': {
                result += `} else {`
                break
            }
            case 'elseif': {
                result += `} else if (${token.value}) { `
                break
            }
            case 'for': {
                result += `for(var index=0;index<${token.value}.length;index++){ var value=${token.value}[index];`
                break
            }
            case 'endfor': {
                result += `};`
                break
            }
            default: {
                result += `t+='${token.value}';`
            }
        }
    }
    result+='return t;'
    return result
}

module.exports = {
    compile
}