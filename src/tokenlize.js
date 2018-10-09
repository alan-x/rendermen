const types = require('./types')

let result = []

function tokenlize(input) {
    result = []
    input = input.trim().replace(/\n/g, '').split('').reverse()

    let type = types.TYPE_STRING
    let value = types.TYPE_EMPTY

    while (input.length) {
        let token = input.pop()

        switch (token) {
            case types.TYPE_LEFT_BRACE: {
                let next = input.pop()
                switch (next) {
                    case types.TYPE_LEFT_BRACE: {
                        push(type, value)
                        type = types.TYPE_CODE
                        value = types.TYPE_EMPTY
                        break
                    }
                    default: {
                        value += token
                        value += next
                    }
                }
                break
            }
            case types.TYPE_RIGHT_BRACE: {
                let next = input.pop()
                switch (next) {
                    case types.TYPE_RIGHT_BRACE: {
                        if (value.match(/^if/)) {
                            type = types.TYPE_IF
                            value = value.replace('if', '')
                        } else if (value.match(/^else/)) {
                            type = types.TYPE_ELSE
                        } else if (value.match(/^elseif/)) {
                            type = types.TYPE_ELSEIF
                            value = value.replace('elseif', '')

                        } else if (value.match(/^endif/)) {
                            type = types.TYPE_ENDIF
                        } else if (value.match(/^for/)) {
                            type = types.TYPE_FOR
                            value = value.replace('for', '')
                        } else if (value.match(/^endfor/)) {
                            type = types.TYPE_ENDFOR
                        } else if (value.match(/^=/)) {
                            type = types.TYPE_VARIABLE
                        } else {
                            type = types.TYPE_VARIABLE
                        }
                        push(type, value)
                        type = types.TYPE_STRING
                        value = types.TYPE_EMPTY
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
    if (typeof value !== 'object') {
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