const {
	Service
} = require("uni-cloud-router");
const uniID = require("uni-id");
module.exports = class LoginService extends(
	Service
) {
	async login() {
		let code = this.ctx.data.code;
		let provider = this.ctx.data.provider;
		console.log(code,provider)
		if (provider == 'weixin') {
			return await uniID.loginByWeixin({
				code
			});
		} else if (provider == 'alipay') {
			return await uniID.loginByAlipay({
				code
			});
		} else {
			return {
				result: {
					code: ''
				}
			};
		}
	}
};
