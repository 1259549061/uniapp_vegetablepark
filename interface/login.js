export default async function(code) {
	uni.
	const { openid } = await uniAccountIns.code2Session(code)
	console.log('openid',openid)
}