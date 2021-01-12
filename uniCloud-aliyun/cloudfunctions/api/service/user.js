const {
	Service
} = require("uni-cloud-router");
const uniID = require("uni-id");
const db = uniCloud.database();

module.exports = class UserService extends(
	Service
) {

	async set_visit_account() {
		const collection = db.collection('user_visit_account');
		let time = new Date(this.ctx.data.time);
		let formatTime = time.getFullYear() + '-' + ((time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() +
			1)) + '-' + time.getDate()
		let user_id = this.ctx.data.uid;
		let data = await collection.where({
			user_id
		}).get();

		console.log("data", data)

		if (data && data.data[0]) {
			let find = false
			data.data[0].visit_time.map(v => {
				if (v.date == formatTime) {
					find = true;
					v.total_count++;
					v.more += v.more ? "," + this.ctx.data.time : this.ctx.data.time
				}
			})
			if(find) {
				collection.where({
					user_id
				}).update({
					visit_time: data.data[0].visit_time
				})
			}else {
				let arr = data.data[0].visit_time
				arr.push({
					date: formatTime,
					total_count: 1,
					total_time: 0,
					more: '' + this.ctx.data.time
				})
				collection.where({
					user_id
				}).update({
					visit_time: arr
				})
			}
			
		} else {
			collection.add({
				user_id,
				visit_time: [{
					date: formatTime,
					total_count: 1,
					total_time: 0,
					more: '' + this.ctx.data.time
				}]
			})
		}
	}
	async get_visit_account() {
		const collection = db.collection('user_visit_account');
		return await collection.get()
	}
	async setInfo() {
		const collection = db.collection("uni-id-users")
		let res = await collection.doc(this.ctx.data.uid).update(this.ctx.data.info)
		return res
	}
};
