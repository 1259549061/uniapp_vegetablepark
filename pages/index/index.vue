<template>
	<view class="content">
		<text>index page</text>
		<Login></Login>
	</view>
</template>

<script>
	import Login from './components/login.vue';
	export default {
		data() {
			return {}
		},
		components: {
			Login
		},
		beforeMount() {
			console.log('hhh')
		}
			
	}
</script>

<style>
	.content {
		padding-bottom: 30px;
	}

	.title {
		font-weight: bold;
		text-align: center;
		padding: 20px 0px;
		font-size: 20px;
	}

	.tips {
		color: #999999;
		font-size: 14px;
		padding: 20px 30px;
	}

	.btn-list {
		padding: 0px 30px;
	}

	.btn-list button {
		margin-bottom: 20px;
	}

	.upload-preview {
		width: 100%;
	}
</style>
