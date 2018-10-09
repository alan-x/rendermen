const tokenlize = require('./../src/tokenlize').tokenlize


describe('tokenlizer', () => {
    test(`text`, () => {
        expect(tokenlize(`123`)).toEqual([{"type": "string", "value": "123"}])
    })
    test(`variable`, () => {
        expect(tokenlize(`{{model.name}}`)).toEqual([{"type": "variable", "value": "model.name"}])
    })

    test(`text and variable`, () => {
        expect(tokenlize(`<p>{{model.name}}</p>`)).toEqual([{"type": "string", "value": "<p>"}, {
            "type": "variable",
            "value": "model.name"
        }, {"type": "string", "value": "</p>"}])
    })
    test(`if elseif endif`, () => {
        expect(tokenlize(`
            {{if model.name}}
                <p>{{model.name}}</p>
            {{elseif model.a=model.b}}
                <p>未填写名字</p>
            {{endif}}
        `)).toEqual([{"type": "if", "value": "model.name"}, {"type": "string", "value": "<p>"}, {
            "type": "variable",
            "value": "model.name"
        }, {"type": "string", "value": "</p>"}, {"type": "else", "value": "elseif model.a=model.b"}, {
            "type": "string",
            "value": "<p>未填写名字</p>"
        }, {"type": "endif", "value": "endif"}])
    })

    test(`foreach`, () => {
        expect(tokenlize(`
        {{for model.books}}
            <p>{{index}}:{{value}}</p>  
        {{endfor}}
        `)).toEqual([
            {"type": "for", "value": "model.books"},
            {"type": "string", "value": "<p>"},
            {"type": "variable", "value": "index"},
            {"type": "string", "value": ":"},
            {"type": "variable", "value": "value"},
            {"type": "string", "value": "</p>"},
            {"type": "endfor", "value": "endfor"}
        ])
    })

})

