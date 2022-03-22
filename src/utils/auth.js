const USER_KEY = "USER_KEY"
const TOKEN_KEY = "TOKEN_KEY"

class Auth {
    constructor() {
        this.token = null
        this.user = null
        this.token = localStorage.getItem(TOKEN_KEY)
        const userJson = localStorage.getItem(USER_KEY)
        if (userJson && userJson != "undefined") {
            this.user = JSON.parse(userJson)
        }
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new Auth()
        }
        return this._instance
    }

    // 登录
    setUserToken(user, token) {
        this.user = user
        this.token = token
        localStorage.setItem(USER_KEY, JSON.stringify(user))
        localStorage.setItem(TOKEN_KEY, token)
    }

    serUser(user) {
        this.user = user
        localStorage.setItem(USER_KEY, JSON.stringify(user))
    }

    // 退出登录
    clearUserToken() {
        this.user = null;
        this.token = null;
        localStorage.removeItem(USER_KEY)
        localStorage.removeItem(TOKEN_KEY)
    }

    // 判断是否登录
    get is_authed() {
        if (this.user && this.token) {
            return true
        } else {
            return false
        }
    }
}

export default Auth.getInstance()
