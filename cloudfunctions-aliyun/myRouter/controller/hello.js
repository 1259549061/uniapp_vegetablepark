const { Controller } = require("uni-cloud-router");
module.exports = class HelloController extends (
  Controller
) {
  sayHello() {
	  // this.ctx：当前请求的上下文对象的实例，通过它我们可以拿到各种便捷属性和方法。
	  // this.service：应用定义的 service，通过它我们可以访问到抽象出的业务层，等同于 this.ctx.service。
	  // this.db：等同于 uniCloud.database()。
	  // this.curl：等同于 uniCloud.httpclient.request。
	  // this.throw：抛出异常信息，等同于 this.ctx.throw。

    return this.service.hello.sayHello();
  }
};