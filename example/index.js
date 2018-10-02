const http = require('http')
const fs = require('fs')
const render = require('./../src/renderermen').render


fs.readFile('./index.html', function (err, data) {
    if (err) {
        throw err
    }
    var cache = render(data.toString())
    http.createServer(function (request, response) {
        response.end(cache({name: '我是作者',sex:0,book:["书1","书2","书3","书4"]}))
    }).listen(8888)

})
