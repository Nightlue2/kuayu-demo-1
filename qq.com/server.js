var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    console.log("路径是" + pathWithQuery)
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/









    if (path === '/') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(fs.readFileSync('./public/index.html'))
        response.end()
    } else if (path === '/style.css') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write(fs.readFileSync('./public/style.css'))
        response.end()
    } else if (path === '/qq.js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('public/qq.js'))
        response.end()
    } else if (path === "/friend.js") {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        if (request.headers['referer'].indexOf("http://frank.com:9999") === 0) {
            let string = fs.readFileSync('public/friend.js').toString()
            let data = fs.readFileSync('public/friend.json').toString()
            let string2 = string.replace("data", data).replace("{{xxx}}", query.callback)
            response.write(string2)
            response.end()
        } else {
            response.statusCode = 404
            response.end()
        }
        //console.log(typeof request.headers['referer'])
    } else if (path === '/friend.json') {
        response.statusCode = 200
        response.setHeader("Content-Type", 'text/json;charset=utf-8')
        response.setHeader('Access-Control-Allow-Origin', 'http://frank.com:9999')
        response.write(fs.readFileSync('public/friend.json'))
        response.end()
    } else {
        response.statusCode = 404
        response.end()
    }










    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)