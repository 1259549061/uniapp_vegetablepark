export default {
	set_data(state, params) { // params { key value } || [{ key value }]
		if(params[0]) {
			params.map(v=>{
				state[v.key] = v.value;
			})
		}else {
			state[params.key] = params.value;
		}
	}
}