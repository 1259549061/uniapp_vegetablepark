<template>
	<view>
		<button open-type="getUserInfo" @getuserinfo="getuserinfo">login</button>
		<button @click="checktoken">是否过期</button>
	</view>

</template>

<script>
	export default {
		data() {
			return {};
		},
		methods: {
			async checktoken() {
				let token = uni.getStorageSync("uni_id_token")
				let r = await this.request('login/checktoken', {token})
				if(r.code) {
					uni.showToast({
						title:"过期"
					})
				}else{
					uni.showToast({
						title: "未过期"
					})
				}
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
				let res = await this.request("login/login", {
					provider,
					code
				})
				console.log("res", res)
				if (res.result.code === 0) {
					uni.setStorageSync('uni_id_token', res.result.token)
					uni.setStorageSync('uid', res.result.uid)
					uni.showToast({
						title: "登陆成功"
					})

				} else {
					uni.showToast({
						title: "登陆失败"
					})
				}

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
