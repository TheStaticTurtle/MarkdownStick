---
title: Code highlights?
subtitle: Advanced stuff
icon: mdi-laptop
order: 30
---

# Highlights
Code highlight is supported for all majors languages
```js{1,3-5}[server.js]
const http = require('http')
const bodyParser = require('body-parser')

http.createServer((req, res) => {
  bodyParser.parse(req, (error, body) => {
    res.end(body)
  })
}).listen(3000)
```
