<template>
    <el-tabs v-model="currentTab.name" closable type="card" class="demo-tabs" @tab-click="handleClick"
        @tab-remove="remove">
        <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.name" :name="item.name">
            <template #label>
                <span class="custom-tabs-label">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>&nbsp; {{ item.name }}</span>
                </span>
            </template>
        </el-tab-pane>
    </el-tabs>
    <RouterView v-slot="{Component}" >
        <KeepAlive>
            <component :is="Component" :key="$route.name" v-if="$route.meta.KeepAlive" ></component>
        </KeepAlive>
        <component :is="Component" :key="$route.name" v-if="!$route.meta.KeepAlive" ></component>
    </RouterView>
    <!-- <RouterView /> -->
</template>

<script setup lang="ts">
import { useTabsStore } from '@/store/tabs';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/auth';

const tabsStore = useTabsStore();
const useStore = useUserStore();
const { tabs, currentTab } = storeToRefs(tabsStore);
const { menu } = storeToRefs(useStore);
const { addTab, setCurrentTab, removeTab } = tabsStore
const router = useRouter();
const route = useRoute();

function findObjectByUrl(arr: any[], url: string) {
    for (const item of arr) {
        if (item.url === url) {
            return item
        }
        if (item.children) {
            const found: any = findObjectByUrl(item.children, url);
            if (found) {
                return found
            }
        }
    }
    return null
}

// 初始化根据路由页签
const { name, url, icon } = findObjectByUrl(menu.value, route.path);
addTab(name, url, icon);
setCurrentTab(name, url);

const handleClick = ({ index }: { index: number }) => {
    // 设置路由跳转
    router.push(tabs.value[index].url);
    // 设置当前高亮
    setCurrentTab(tabs.value[index].name, tabs.value[index].url)
}

const remove = (name: string) => {
    removeTab(name);
    router.push(currentTab.value.url)
}
</script>

<style scoped lang="less">
.demo-tabs {

    // vue3新写法
    :deep(.is-active) {
        background-color: rgb(34, 135, 255) !important;
        color: #fff !important;
    }
}
</style>