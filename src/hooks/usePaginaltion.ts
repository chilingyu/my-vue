import { reactive, ref } from "vue";

export function usePagination(loadData: () => Promise<any>, initalPageSize = 10) {
    const totals = ref<number>(0)
    const pageInfo = reactive({
        page: 1,
        pageSize: initalPageSize
    })

    // 切换条数
    const handleSizeChange = (size: number) => {
        pageInfo.pageSize = size;
        loadData()
    }

    // 切换页数
    const handleCurrentChange = (page: number) => {
        pageInfo.page = page;
        loadData()
    }

    // 重置
    const resetPagination = () => {
        pageInfo.page = 1;
        pageInfo.pageSize = initalPageSize
    }

    // 设置总条数
    const setTotals = (all: number) => {
        totals.value = all;
    }

    return { totals, pageInfo, handleSizeChange, handleCurrentChange, resetPagination, setTotals }
}