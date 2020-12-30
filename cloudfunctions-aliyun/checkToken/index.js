const db = uniCloud.database();
const collection = db.collection('uni-id-users');
exports.main = async (event, context) => {
	//根据用户id去查找最后一次登陆时间 与现在的时间比较
	//过期了 或者将要过期(1分钟)，返回false
	return collection.doc(event.uid).get().then(r=>{
		if(!r.result || !r.result.data || !r.result.data[0])  {
			return {
				result: false,
				msg: '没有此用户'
			}
		}else {
			let lastLogin = r.result.data[0].last_login_date; //毫秒
			let now = new Date().getTime()
			if(now - lastLogin > 119 * 60 * 1000) {
				return {
					result: false,
					msg: "token已过期"
				}
			}else{
				return {
					result: true,
					msg: ""
				}
			}
		}
	})
};
