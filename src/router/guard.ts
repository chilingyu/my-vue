import router from "./index";
import { useUserStore } from "@/store/auth";

router.beforeEach((to) => {
    const useStore = useUserStore();
    const isLogin = useStore.token;
    const roles = useStore.roles;
    if (!isLogin) {
        // 未登录
        if (to.path !== '/login') {
            return { path: '/login' }
        }
    } else {
        // 登录
        if (to.path === "/login") {
            return { path: '/' }
        }

        // 权限控制
        if(to.meta?.needAuth&& !roles.some((role:string)=>(to.meta.needAuth as string[] ).includes(role)
        )){
            return {path:"/"}
        }
    }
})