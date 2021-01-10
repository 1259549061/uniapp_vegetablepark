import Vue from 'vue'
import App from './App'
import store from './store'
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.request = (url,params)=>{
	return new Promise((resolve,reject)=>{
		uniCloud.callFunction({
			name:"api",
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
	...App,
	store
})
app.$mount()
