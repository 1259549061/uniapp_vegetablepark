<template>
	<button open-type="getUserInfo" @click="login">login</button>
</template>

<script>
	export default {
		data() {
			return {};
		},
		methods: {
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
			loginByWeixin(code) {
				uniCloud.callFunction({
					name: 'login-by-weixin',
					data: {
						code
					}
				}).then((res) => {
					console.log('res',res)
					uni.showModal({
						showCancel: false,
						content: JSON.stringify(res.result)
					})
					if (res.result.code === 0) {
						uni.setStorageSync('uni_id_token', res.result.token)
					}
				}).catch((e) => {
					console.log(e)
					uni.showModal({
						showCancel: false,
						content: '微信登录失败，请稍后再试'
					})
				})
			},
			login() {
				uni.getProvider({
					service: "oauth",
					success: async (getProvider)=> {
						let provider = getProvider.provider;
						let code = await this.getCode(provider);
						console.log(code)
						this.loginByWeixin(code);
					}
				})
			}
		}
	};
</script>

<style lang="scss"></style>
