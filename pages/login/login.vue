<template>
	<button open-type="getUserInfo" @click="login">login</button>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		async login() {
			// console.log(this.$fetch)
			// uni.checkSession({ success: function(v) {
			// 	console.log(v)
			// },fail(err) {
			// 	console.log(err)
			// } });
			let that = this
			uni.getProvider({service:"oauth", success:function(getProvider){
				let provider = getProvider.provider;
				uni.login({
					provider,
					success:function(e){
						console.log(e)
						that.$fetch.login(e.code)
						// uni.getUserInfo({
						// 	provider,
						// 	withCredentials: true,
						// 	success(info) {
						// 		console.log(info)
						// 	},
						// 	fail(e) {
						// 		console.log(e)
						// 	}
						// })
					}
				})
			}})
		}
	}
};
</script>

<style lang="scss"></style>
