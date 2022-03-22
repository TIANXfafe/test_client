import Vue from "vue";
import Router from 'vue-router'
import routes from "./routers"
import auth from "../utils/auth"

Vue.use(Router)

const router = new Router({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name !== "login" && !auth.is_authed) {
        next({
            name: "login"
        })
    } else {
        next()
    }
})

export default router
