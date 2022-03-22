const routes = [
    {
        path: "/",
        component: () => import("@/pages/Frame"),
        children: [
            {
                path: "",
                component: () => import("@/pages/Index"),
                name: "index"
            },
            {
                path: "project",
                component: () => import("@/pages/Project/ProjectList"),
                name: "project_list"
            },
            {
                path: "project/:project_id",
                component: () => import("@/pages/Project/ProjectDetail"),
                name: "project_detail"
            }
        ]
    },
    {
        path: "/login",
        component: () => import("@/pages/Login"),
        name: "login"
    }
]

export default routes
