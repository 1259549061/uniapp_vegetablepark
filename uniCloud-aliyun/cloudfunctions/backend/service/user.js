const {
	Service
} = require("uni-cloud-router");
const uniID = require("uni-id");
const db = uniCloud.database();

module.exports = class UserService extends(
	Service
) {
	async visit_account() {
		try {
			const collection = db.collection('user_visit_account');
			return await collection.get()
		}catch (e){
			console.log(e)
			return {}
		}
		
	}
};
