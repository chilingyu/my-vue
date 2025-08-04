import router from "./index";
import { useUserStore } from "@/store/auth";

router.beforeEach((to) => {
    const useStore = useUserStore();
    const isLogin = useStore.token;
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
    }
})