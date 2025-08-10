import { defineStore } from 'pinia';
import { ref } from 'vue'
import type { MenuItem } from "@/types/user"
// 组合式

export const useTabsStore = defineStore("tabs", () => {
    const tabs = ref<MenuItem[]>([])
    const currentTab = ref<{ name: string, url: string }>({ name: "", url: "" });

    // 添加
    const addTab = (name: string, url: string, icon: string) => {
        if (!tabs.value.some(item => item.url === url)) {
            tabs.value.push({ name, url, icon })
        }
    }

    // 页签选中
    const setCurrentTab = (name: string, url: string) => {
        currentTab.value = { name, url }
    }

    // 删除页签
    const removeTab = (name: string) => {
        // 如果删除的是高亮的，默认高亮前面一个
        if (currentTab.value.name === name) {
            const currentIndex = tabs.value.findIndex(item => item.name === name)
            //    第一个高亮不能删
            if (currentIndex !== 0) {
                currentTab.value = tabs.value[currentIndex - 1]
            } else {
                return
            }
        }
        tabs.value = tabs.value.filter(item => item.name !== name)
    }
    return { tabs, currentTab, addTab, setCurrentTab, removeTab }
})