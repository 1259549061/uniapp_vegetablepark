import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.request = (url,params)=>{
	return new Promise((resolve,reject)=>{
		uniCloud.callFunction({
			name:"myRouter",
			data:{
				action: url,
				data: params
			},
			success:function(r){
				resolve(r);
			},
			fail:function(e) {
				reject(e);
			}
		})
	})
}

const app = new Vue({
	...App
})
app.$mount()
