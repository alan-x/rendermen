const compiler = require('./../src/compiler')
const tokenlizer = require('./../src/tokenlizer')

describe('tokenlizer', () => {
    test(`text`, () => {
        let tokenlizedArr = tokenlizer.tokenlize('123')
        expect(compiler.compile(tokenlizedArr)).toEqual(`var t='';t+='123'`)
    })
    test(`variable`, () => {
        let tokenlizedArr = tokenlizer.tokenlize('{{model.name}}')

        expect(compiler.compile(tokenlizedArr)).toEqual(`var t='';t+=model.name;`)
    })

    test(`text and variable`, () => {
        let tokenlizedArr = tokenlizer.tokenlize(`<p>{{model.name}}</p>`)

        expect(compiler.compile(tokenlizedArr)).toEqual(`var t='';t+='<p>'t+=model.name;t+='</p>'`)
    })

    test(`if elseif endif`, () => {
        let tokenlizedArr = tokenlizer.tokenlize(`
            {{if model.name}}
                <p>{{model.name}}</p>
            {{elseif model.a=model.b}}
                <p>未填写名字</p>
            {{endif}}
        `)

        expect(compiler.compile(tokenlizedArr)).toEqual(`var t='';if (model.name) {t+='<p>'t+=model.name;t+='</p>'} else {t+='<p>未填写名字</p>'};`)
    })

    test(`foreach`, () => {
        let tokenlizedArr = tokenlizer.tokenlize(`
        {{for model.books}}
            <p>{{index}}:{{value}}</p>  
        {{endfor}}
        `)

        expect(compiler.compile(tokenlizedArr)).toEqual(`var t='';for(var index=0;index<model.books.length;index++){ var value=model.books[index];t+='<p>'t+=index;t+=':'t+=value;t+='</p>'};`)
    })
})