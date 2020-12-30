const uniID = require('uni-id')
const db = uniCloud.database();
// 获取 `user` 集合的引用
const collection = db.collection('user');
exports.main = async function(event, context) {
	// 如下旧写法依然支持
	// const res = await uniID.loginByWeixin(event.code)
	if(event.provider == 'weixin'){
		return await uniID.loginByWeixin({
			code: event.code
		})
	}else if(event.provider == 'alipay'){
		return await uniID.loginByAlipay({
		    code: event.code
		  })
	}
}
