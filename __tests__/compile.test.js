const compile = require('./../src/compile').compile
const tokenlize = require('./../src/tokenlize').tokenlize

describe('tokenlizer', () => {
    test(`text`, () => {
        let tokenlizedArr = tokenlize('123')
        expect(compile(tokenlizedArr)).toEqual(`var t='';t+='123';return t;`)
    })
    test(`variable`, () => {
        let tokenlizedArr = tokenlize('{{model.name}}')

        expect(compile(tokenlizedArr)).toEqual(`var t='';t+=model.name;return t;`)
    })

    test(`text and variable`, () => {
        let tokenlizedArr = tokenlize(`<p>{{model.name}}</p>`)

        expect(compile(tokenlizedArr)).toEqual(`var t='';t+='<p>';t+=model.name;t+='</p>';return t;`)
    })

    test(`if elseif endif`, () => {
        let tokenlizedArr = tokenlize(`
            {{if model.name}}
                <p>{{model.name}}</p>
            {{elseif model.a=model.b}}
                <p>未填写名字</p>
            {{endif}}
        `)

        expect(compile(tokenlizedArr)).toEqual(`var t='';if (model.name) {t+='<p>';t+=model.name;t+='</p>';} else {t+='<p>未填写名字</p>';};return t;`)
    })

    test(`foreach`, () => {
        let tokenlizedArr = tokenlize(`
        {{for model.books}}
            <p>{{index}}:{{value}}</p>  
        {{endfor}}
        `)

        expect(compile(tokenlizedArr)).toEqual(`var t='';for(var index=0;index<model.books.length;index++){ var value=model.books[index];t+='<p>';t+=index;t+=':';t+=value;t+='</p>';};return t;`)
    })
})