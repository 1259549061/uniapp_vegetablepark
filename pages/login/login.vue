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
			checnktoken() {

			},
			getCode(provider) {
				return new Promise((resolve, reject) => {
					uni.login({
						provider,
						success(res) {
							console.log(res);
							resolve(res.code)
						},
						fail(err) {
							reject(new Error('登录失败'))
						}
					})
				})
			},
			async login(code, provider) {
				console.log(code, provider);
				uniCloud.callFunction({
					name: "myRouter",
					data: {
						action: "login/login",
						data: {
							provider,
							code
						}
					}
				}).then(res => {
					console.log('login', res)
					if (res.result.code === 0) {
						uni.setStorageSync('uni_id_token', res.result.token)
						uni.setStorageSync('uid', res.result.uid)
					}
				})
			},
			getuserinfo() {
				uni.getProvider({
					service: "oauth",
					success: async (getProvider) => {
						let provider = getProvider.provider[0];
						let code = await this.getCode(provider);
						this.login(code, provider);
					}
				})
			}
		}
	};
</script>

<style lang="scss"></style>
