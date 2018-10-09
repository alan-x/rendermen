const render = require('./../src/renderermen').render

describe('renderment', () => {
    test('text', () => {
        expect(render(`123`)()).toBe(`123`)
    })
    test("render variable", () => {
        expect(render('{{model.username}}')({username: '111'})).toBe('111')
    })
    test("render ifelseif", () => {
        expect(render(`
           {{if model.sex===1}}
           <p>男</p>    
           {{else}}
           <p>女</p>
           {{endif}}
        `)({sex:0}))
            .toBe(`<p>女</p>`)
    })
    test("render for", () => {
        expect(render(`
           {{for model.book}}
                <p>{{index}}:{{value}}</p>
            {{endfor}}
        `)({book:[1,2,3,4]}))
            .toBe(`<p>0:1</p><p>1:2</p><p>2:3</p><p>3:4</p>`)
    })

})
