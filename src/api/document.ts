import { get } from "@/utils/http";

enum Api {
    TypeList = "/document"
}

function TypeListApi() {
    return get(Api.TypeList)
}

export { TypeListApi }