var Koa = require('koa')
var access = require('./wecaht/index')
var path = require('path')

var util = require('./libs/util')
var wecaht_file = path.join(__dirname, './config/wechat.txt')
 
var config = {
  wechat: {
    appID: 'wx54a166cad26165e9',
    appSecret: 'd8921274fcdbebf56209a14f0579cb37',
    token: 'helloworld',
    encodingAESKey: 'emtj9uI1khP0w07NVfdo4fMupxvrTa8uTKJtbFzZZSE',
    getAccessToken: function () {
      return util.readFileAsync(wecaht_file)
    },
    saveAccessToken: function (data) {
      data = JSON.stringify(data)
      return util.writeFileAsync(wecaht_file, data)
    }
  }
}

var app = new Koa()
var port = 2333

app.use(access(config.wechat))

app.listen(port, function(){
  console.log('listening at port ' + port)
})