<template>
	<view>
		<button open-type="getUserInfo" @getuserinfo="getuserinfo">login</button>
		<button @click="checnktoken">是否过期</button>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {};
		},
		methods: {
			checnktoken(){
				let uid = uni.getStorageSync('uid');
				uniCloud.callFunction({
					name:'checkToken',
					data: {
						uid
					}
				}).then(r=>{
					if(r.result) {
						console.log('未过期')
					}else {
						console.log('过期')
					}
				})
			},
			getCode(provider) {
				return new Promise((resolve, reject) => {
					uni.login({
						provider,
						success(res) {
							console.log(res)
							resolve(res.code)
						},
						fail(err) {
							reject(new Error('登录失败'))
						}
					})
				})
			},
			login(code,provider) {
				uniCloud.callFunction({
					name: 'login',
					data: {
						provider,
						code
					}
				}).then((res) => {
					console.log('res',res)
					if (res.result.code === 0) {
						uni.setStorageSync('uni_id_token', res.result.token)
						uni.setStorageSync('uid', res.result.uid)
					}
				}).catch((e) => {
					console.log(e)
				})
			},
			getuserinfo() {
				uni.getProvider({
					service: "oauth",
					success: async (getProvider)=> {
						let provider = getProvider.provider;
						let code = await this.getCode(provider);
						this.login(code,provider);
					}
				})
			}
		}
	};
</script>

<style lang="scss"></style>
