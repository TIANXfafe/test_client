import axios from "axios";
import auth from "./auth"
import router from "../router/index"

const BASE_URL = "http://127.0.0.1:8000"

class Api {
    constructor() {
        this.api = axios.create({
            baseURL: BASE_URL
        })

        // 设置拦截器，用来添加JWT，token
        this.api.interceptors.request.use(config => {
            const token = auth.token
            if (token && token != "undefined") {
                config.headers.common.Authorization = "JWT" + token
            }
            return config
        })

        // 设置拦截器，如果返回403，跳转到登录页面
        // 403没有权限访问
        this.api.interceptors.response.use(null, err => {
            console.log('err', err)
            if (err && err.response && err.response.status == 403) {
                auth.clearUserToken()
                router.replace("/login")
            }
            return Promise.reject(err)
        })
    }

    // 登录
    login(params) {
        const url = "/auth/login"
        return this.api.post(url, params)
    }

    // 获取项目列表
    getProjectList() {
        const url = "/project"
        return this.api.get(url)
    }

    // 新增项目
    addProject(params) {
        const url = "/project"
        return this.api.post(url, params)
    }

    // 编辑项目
    editProject(id, params) {
        const url = `/project/${id}`
        return this.api.put(url, params)
    }

    // 删除项目
    deleteProject(id) {
        const url = `/project/${id}`
        return this.api.delete(url)
    }

    // 获取项目详情
    getProjectDetail(id) {
        const url = `/project/${id}`
        return this.api.get(url)
    }
}

export default new Api()
