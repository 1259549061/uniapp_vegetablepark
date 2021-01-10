const {
	Service
} = require("uni-cloud-router");
const uniID = require("uni-id");
const db = uniCloud.database();

module.exports = class UserService extends(
	Service
) {
	
	async get_visit_account() {
		const collection = db.collection('user_visit_account');
		let time = this.ctx.data.time;
		let user_id = this.ctx.data.uid;
		let data = await collection.where({
			user_id
		}).get();
		// {visit_time : {
		// 	date: "",
		// 	total_count: "",
		// 	total_time: "",
		// 	more: ""
		// }}
		// console.log('data', data.data)
		return data
	}
	async setInfo() {
		const collection = db.collection("uni-id-users")
		let res = await collection.doc(this.ctx.data.uid).update(this.ctx.data.info)
		return res
	}
};
