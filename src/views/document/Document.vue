<template>
    <el-card>
        <div class="mt">
            <span class="title">文章类型：</span>
            <el-tag :type="currentIndex[0] == -1 ? 'primary' : 'info'" class="mr"
                @click="handleSelect(-1, 0, '')">全部</el-tag>
            <el-tag :type="currentIndex[0] == index ? 'primary' : 'info'" class="mr"
                v-for="(item, index) in typeList.type" :key="item" @click="handleSelect(index, 0, item)">{{ item
                }}</el-tag>
        </div>
        <div class="mt">
            <span class="title">重要程度：</span>
            <el-tag :type="currentIndex[1] == -1 ? 'primary' : 'info'" class="mr"
                @click="handleSelect(-1, 1, '')">全部</el-tag>
            <el-tag :type="currentIndex[1] == index ? 'primary' : 'info'" class="mr"
                v-for="(item, index) in typeList.important" :key="item" @click="handleSelect(index, 1, item)">{{ item
                }}</el-tag>
        </div>
        <div class="mt">
            <span class="title">发布渠道：</span>
            <el-tag :type="currentIndex[2] == -1 ? 'primary' : 'info'" class="mr"
                @click="handleSelect(-1, 2, '')">全部</el-tag>
            <el-tag :type="currentIndex[2] == index ? 'primary' : 'info'" class="mr"
                v-for="(item, index) in typeList.publish" :key="item" @click="handleSelect(index, 2, item)">{{ item
                }}</el-tag>
        </div>
    </el-card>
    <el-divider/>
    <div class="mt">
        <span class="title">已选</span>
        <el-tag disable-transitions type="success" class="mr" closable v-for="item in selectedList" :key="item"
            @close="handleClose(item.num)">{{ item.name }}</el-tag>
    </div>
    <el-button type="primary" class="mt mb" @click="exportToHtml">导出富文本到HTML文件</el-button>
    <Editor id="bngxkjblmsihac8ktfu6rykchj5k5eid9m3u9a9xro94irt7"
        apiKey="bngxkjblmsihac8ktfu6rykchj5k5eid9m3u9a9xro94irt7" v-model="editorContent" :init="{
            language: 'zh-CN',
            plugins: 'advlist anchor autolink charmap code fullscreen help image insertdatetime link lists media preview searchreplace table visualblocks wordcount',
            toolbar: 'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            height: 500,
            width: '100%'
        }" />
        <el-button type="primary" @click="handleSubmit" class="mt"  v-permission="'user'">提交文章内容</el-button>
</template>

<script setup lang="ts">
import { TypeListApi } from "@/api/document"
import { onMounted, ref } from "vue";
import Editor from '@tinymce/tinymce-vue'

interface ListType {
    type: string[],
    important: string[],
    publish: string[],
}

interface selectType {
    name: string,
    num: number
}

const typeList = ref<ListType>({ type: [], important: [], publish: [] })

onMounted(async () => {
    const { data } = await TypeListApi();
    typeList.value = data
})

const currentIndex = ref<number[]>([-1, -1, -1]);
const handleSelect = (index: number, num: number, name: string) => {
    const ind = selectedList.value.findIndex((item: selectType) => item.num == num)
    if (!name) {//如果选择的是全部要从已选中删掉对应这个类型的数据
        selectedList.value = selectedList.value.filter((item: selectType) => item.num != num)
    } else {
        if (ind == -1) {
            selectedList.value.push({ name, num })
        } else {
            selectedList.value[ind] = { name, num }
        }
    }
    currentIndex.value[num] = index
}

const selectedList = ref<selectType[]>([])

const handleClose = (num: number) => {
    selectedList.value = selectedList.value.filter((item: selectType) => item.num != num)
    currentIndex.value[num] = -1
}

// 富文本逻辑
const editorContent=ref("");
const exportToHtml = () => {
    const blob = new Blob([editorContent.value], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "招商管理.html"
    link.click();
    URL.revokeObjectURL(link.href);
}

const handleSubmit=()=>{
    console.log( selectedList.value.map(item=>item.name))
}

</script>

<style scoped lang="less">
.title {
    display: inline-block;
    width: 80px;
    font-size: 14px;
}

.el-tag {
    cursor: pointer;
}
</style>