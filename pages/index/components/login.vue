<template>
	<view class="login">
		<image class="logo" :src="userLogo"></image>
		<text>{{userName}}</text>
		<button type="text" v-show="!hasLogin" open-type="getUserInfo" @getuserinfo="getuserinfo">login</button>
	</view>

</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex";
	export default {
		data() {
			return {
				userLogo: "",
				userName: ""
			};
		},
		computed:{
			...mapState(['userInfo',"hasLogin", "uid"])
		},
		methods: {
			...mapMutations(["set_data"]),
			async checktoken(token) {
				let r = await this.request('login/checkToken', {
					token
				})
				return r
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
				console.log(code, provider)
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
					this.set_data({key:"hasLogin", value: true})
					this.getuserinfoData();
					this.set_account()

				} else {
					uni.showToast({
						title: "登陆失败"
					})
				}

			},
			getuserinfo(info) {
				console.log(info)
				if(info.detail.errMsg == "getUserInfo:ok") {
					this.set_data({
						userInfo: info
					});
					console.log(this.userInfo)
					
					uni.getProvider({
						service: "oauth",
						success: async (getProvider) => {
							let provider = getProvider.provider[0];
							let code = await this.getCode(provider);
							this.login(code, provider);
						}
					})
				}else {
					uni.showToast({
						title: "未授权"
					})
				}
				
			},
			getuserinfoData() {
				//获取用户信息 存库
				uni.getUserInfo({
					success:async (data)=> {
						console.log('data', data)
						this.userLogo = data.userInfo.avatarUrl;
						this.userName = data.userInfo.nickName;
						let res = await this.request("user/setInfo", {
							info: data.userInfo,
							uid: this.uid
						})
						console.log(res)
					}
				})	
			},
			async set_account() {
				let res = await this.request("user/user_visit", {
					uid: this.uid,
					time: new Date().getTime()
				})
				console.log('set_account', res)
			}
		},
		async beforeMount() {
			let token = uni.getStorageSync("uni_id_token");
			let uid = uni.getStorageSync('uid')
			if(uid) {
				this.set_data({key: "uid", value: uid})
			}
			if (token) {
				let r = await this.checktoken(token)
				console.log('rrr', r)
				if (r.result.code) {
					uni.showToast({
						title: "token过期"
					})
					this.set_data({key:"hasLogin", value: false})
				} else {
					this.set_data({key:"hasLogin", value: true})
					this.getuserinfoData()
					this.set_account()
				}
			}else {
				this.set_data({key:"hasLogin", value: false})
			}
		}
	};
</script>

<style lang="scss">
	.login {
		.logo {
			width: 200rpx;
			height: 200rpx;
		}
	}
</style>
