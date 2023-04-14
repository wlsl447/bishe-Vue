import axios from 'axios';

// axios 配置
axios.defaults.timeout = 8000;
// axios.defaults.baseURL = ''

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (localStorage.token) { //判断token是否存在
            config.headers.token = localStorage.token; //将token设置成请求头
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
// axios.interceptors.response.use(
//     response => {
//         if (response.data.code === 40100) {
//             //删除本地保存的登录信息
//             window.localStorage.removeItem('token');
//             window.localStorage.removeItem('user');
//             //跳转登录
//             router.push({ name: 'Login' });
//             console.log("token过期");
//         }
//         if (response.data.code === 40200) {
//             //删除本地保存的登录信息
//             window.sessionStorage.removeItem('user');
//             //跳转管理员登录
//             router.push({ name: 'AdminLogin' });
//         }
//         return response;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );
export default axios;