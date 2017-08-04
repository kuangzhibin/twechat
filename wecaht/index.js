var sha1 = require('sha1')
var getRawBody = require('raw-body')
var Wechat = require('./wechat')

module.exports = function (opts) {
  var wechat = new Wechat(opts)

  return function *(next) {
    var query = this.query
    var token = opts.token
    var signature = query.signature
    var echostr = query.echostr
    var timestamp = query.timestamp
    var nonce = query.nonce

    var str = [token, timestamp, nonce].sort().join('')
    var sha = sha1(str)

    if(this.method === 'GET'){
      if (sha === signature) {
        this.body = echostr + ''
        console.log(echostr)
      }else{
        this.body = 'error'
      }
    }else if(this.method === 'POST') {
      if (sha !== signature) {
        this.body = 'error'
        return false
      }
      var data = yield getRawBody(this.req, {
        length: this.length,
        limit: '1mb',
        encoding: this.charset
      })
    }
    console.log(data.toString())
  }
}
