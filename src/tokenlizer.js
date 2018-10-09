let result = []

function tokenlize(input) {
    result = []
    input = input.trim().replace(/\n/g, '').split('').reverse()
    let type = 'string'
    let value = ''

    while (input.length) {
        let token = input.pop()

        switch (token) {
            case '{': {
                let next = input.pop()
                switch (next) {
                    case '{': {
                        push(type, value)
                        type = 'code'
                        value = ''
                        break
                    }
                    default: {
                        value += token
                        value += next
                    }
                }
                break
            }
            case '}': {
                let next = input.pop()
                switch (next) {
                    case '}': {
                        if (value.match(/^if/)) {
                            type = 'if'
                            value = value.replace('if','')
                        } else if (value.match(/^else/)) {
                            type = 'else'
                        } else if (value.match(/^elseif/)) {
                            type = 'elseif'
                            value = value.replace('elseif','')

                        } else if (value.match(/^endif/)) {
                            type = 'endif'
                        } else if (value.match(/^for/)) {
                            type = 'for'
                            value = value.replace('for','')

                        } else if (value.match(/^endfor/)) {
                            type = 'endfor'
                        } else if (value.match(/^=/)) {
                            type = 'string'
                        } else {
                            type = 'variable'
                        }
                        push(type, value)
                        type = 'string'
                        value = ''
                        break
                    }
                    default: {
                        value += token
                        value += next
                    }
                }
                break
            }
            default: {
                value += token
            }
        }
    }
    push(type, value)

    return result
}

function push(type, value) {
    if (typeof value !== 'object'){
        value = value.trim()
    }
    if (value === null || value === '' || value === undefined) return

    result.push({
        type: type,
        value: value
    })
}

module.exports = {
    tokenlize
}