import Vue from 'vue'
import App from './App'
import Interface from './interface/index.js'

Vue.config.productionTip = false

Vue.prototype.$fetch = Interface

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
