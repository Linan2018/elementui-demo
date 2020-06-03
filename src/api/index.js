import Axios from '../libs/AxiosPlugin'

// 接口地址
const BASE_PATH = process.env.API_URL


export const checkuser = params => { return Axios.post(`${BASE_PATH}/checkuser`, params).then(res => res.data); };

export const register = params => { return Axios.post(`${BASE_PATH}/register`, params).then(res => res.data); };

export const logout = params => { return Axios.post(`${BASE_PATH}/logout`).then(res => res.data); };

export const listuser = params => { console.log(`${BASE_PATH}/input`); return Axios.get(`${BASE_PATH}/listuser`).then(res => res.data); };


// 用户登录
export const login = params => { return Axios.post(`${BASE_PATH}/user/login`, params).then(res => res.data); };

// 获取用户列表
export const getUserList = params => { return Axios.get(`${BASE_PATH}/user/list`, { params: params }).then(res => res.data); };

// 首页加载数据
export const loadData  = params => { return Axios.get(`${BASE_PATH}/home/loadData`).then(res => res.data) };

// 文件上传地址
export const uploadFile = `${BASE_PATH}/file/upload`;
