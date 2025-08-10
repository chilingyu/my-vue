import { defineStore } from "pinia";
import { loginApi } from "@/api/user"

// 选项式

interface LoginParams {
    username: string;
    password: string
}

export const useUserStore = defineStore('user', {
    state: () => ({
        token: sessionStorage.getItem("token") || null,
        roles: sessionStorage.getItem("roles") ? JSON.parse(sessionStorage.getItem("roles")!) : [],
        userName: sessionStorage.getItem("userName") || "",
        menu: sessionStorage.getItem("menu") ? JSON.parse(sessionStorage.getItem("menu")!) : [],
    }),
    actions: {
        async login(data: LoginParams) {
            try {
                const { data: { token, user: { username, roles }, menulist } } = await loginApi(data);
                this.token = token
                this.roles = roles
                this.menu = menulist
                this.userName = username
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("roles", JSON.stringify(roles));
                sessionStorage.setItem("menu", JSON.stringify(menulist));
                sessionStorage.setItem("userName", username);
            } catch (error) {
                console.log("error", error)
            }
        },
        logout(){
            this.token=""
            this.roles=[]
            this.userName=""
            this.menu=[]
            sessionStorage.clear()
        }
    }
})