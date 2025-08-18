function formatNumberToThousands(num: number): string {
    if (isNaN(num) || (typeof (num) != "number")) {
        throw new Error("必须是一个有效数字")
    }
    const [integerPart, decimalPart] = num.toString().split(".") //1234.7 length4 1
    let formatterInteger = "" //  "34"
    for (let i = integerPart.length - 1; i >= 0; i--) {
        formatterInteger = integerPart[i] + formatterInteger
        if ((integerPart.length - i) % 3 === 0 && i !== 0) {
            formatterInteger = "," + formatterInteger
        }
    }
    return decimalPart ? `${formatterInteger}.${decimalPart}` : formatterInteger

}

// 数值-整数千位分隔符格式化（不带小数）
function numformatInteger(cellValue: any): string {
    if (cellValue === null || cellValue === undefined) return '-';
    if (typeof (cellValue) == 'string' && cellValue.indexOf(',') != -1) return cellValue
    return Number(cellValue).toLocaleString('en-US', {
        maximumFractionDigits: 0
    });
}

// 数值带小数位的千位分隔符格式化
function numformatDecimal(cellValue: any): string {
    if (cellValue === null || cellValue === undefined) return '-';
    if (typeof (cellValue) == 'string' && cellValue.indexOf(',') != -1) return cellValue
    return Number(cellValue).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// 整数千位分隔符格式化（不带小数）
function formatInteger(row: any, column: any, cellValue: any): string {
    if (cellValue === null || cellValue === undefined) return '-';
    if (typeof (cellValue) == 'string' && cellValue.indexOf(',') != -1) return cellValue
    return Number(cellValue).toLocaleString('en-US', {
        maximumFractionDigits: 0
    });
}

// 带小数位的千位分隔符格式化
function formatDecimal(row: any, column: any, cellValue: any): string {
    if (cellValue === null || cellValue === undefined) return '-';
    if (typeof (cellValue) == 'string' && cellValue.indexOf(',') != -1) return cellValue
    return Number(cellValue).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

export { formatNumberToThousands, numformatInteger, numformatDecimal, formatInteger, formatDecimal }