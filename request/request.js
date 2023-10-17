
// 初始化请求配置
uni.$u.http.setConfig((config) => {
    /* config 为默认全局配置*/
    config.baseURL = 'https://service.ruisport.cn/ruis/'; /* 根域名 */
    return config
})

// 请求拦截
uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
    // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
    config.data = config.data || {}
	uni.showLoading({
		title:'加载中'
	})
    // 根据custom参数中配置的是否需要token，添加对应的请求头
    // if(config?.custom?.auth) {
    // 	// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
    // 	config.header.token = vm.$store.state.userInfo.token
    // }
    return config 
}, config => { // 可使用async await 做异步操作

    return Promise.reject(config)
})

// 响应拦截
uni.$u.http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
    const data = response.data
     uni.hideLoading()
    // 自定义参数
	console.log(data)
	if(!data.success){
		uni.showToast({
			title:data.errMsg
		})
	}
    return data
}, (response) => { 
    // 对响应错误做点什么 （statusCode !== 200）
	uni.showToast({
		title:'出了点错误'
	})
    return Promise.reject(response)
})


module.exports={
	http:uni.$u.http
}




