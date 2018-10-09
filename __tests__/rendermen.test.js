const render = require('./../src/renderermen').render

describe('text',()=>{
    test('text',()=>{
        expect(render(`123`)()).toBe(`123`)
    })
})

describe("variable", () => {
    test("render variable", () => {
        expect(render('<%=model.username%>')).toBe('var template=\'\';template+=\'\';template+=model.username;template+=\'\';return template;')
    })
    test('render variable', () => {
        expect(render('<%=model.username%>')({username: '111'})).toBe("111")
    })

})

describe('do not render', () => {
    test("do not render", () => {
        expect(factory('<%-username%>')).toBe(`var template='';template+='';template+=escape('username');template+='';return template;`)
    })
    test('do not render', () => {
        expect(render('<%-username%>')({username: '111'})).toBe("escape(username)")
    })
})

describe('render ifelse', () => {
    test("render ifelse", () => {
        expect(factory(`<% if (model.user) { %><h2><%= model.user.name %></h2><%} else {%><h2>􏴣名用户</h2><%} %>`))
            .toBe("var template='';template+=''; if (model.user) { template+='<h2>';template+= model.user.name ;template+='</h2>';} else {template+='<h2>􏴣名用户</h2>';} template+='';return template;"
            )
    })
    test('render ifelser', () => {
        expect(render(`<% if (model.user) { %><h2><%= model.user.name %></h2><%} else {%><h2>􏴣名用户</h2><%} %>`)({
            user: {
                name: 'me'
            }
        })).toBe("<h2>me</h2>")
    })
})


describe('render for', () => {
    test("render for", () => {
        expect(factory(`<% for (var i=0;i<10;i++) { %><h2><%= i %></h2><%}%>`))
            .toBe("var template='';template+=''; for (var i=0;i<10;i++) { template+='<h2>';template+= i ;template+='</h2>';}template+='';return template;"
            )
    })
    test('render for', () => {
        expect(render(`<% for (var i=0;i<10;i++) { %><h2><%= i %></h2><%}%>`)({
            user: {
                name: 'me'
            }
        })).toBe("var template='';template+=''; for (var i=0;i<10;i++) { template+='<h2>';template+= i ;template+='</h2>';}template+='';return template;")
    })
})

describe('render ', () => {
    test("text", () => {
        expect(render(`123`)())
            .toBe(
                "var template='';template+=''; for (var i=0;i<10;i++) { template+='<h2>';template+= i ;template+='</h2>';}template+='';return template;"
            )
    })
    test('render for', () => {
        expect(render(`<% for (var i=0;i<10;i++) { %><h2><%= i %></h2><%}%>`)({
            user: {
                name: 'me'
            }
        })).toBe("var template='';template+=''; for (var i=0;i<10;i++) { template+='<h2>';template+= i ;template+='</h2>';}template+='';return template;")
    })
})
