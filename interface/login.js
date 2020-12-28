export default function() {
	uniCloud.callFunction({
		name: 'add',
		data: {
			name: 'DCloud',
			subType: 'uniCloud',
			createTime: Date.now()
		}
	}).then(()=>{
		uni.showModal({
			content:'success'
		})
	})
}