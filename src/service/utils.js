// 转换type为学科
export const transformType = type => {
    switch (type) {
        case 1:
            return '语文'
        case 2:
            return '数学'
        case 3:
            return '英语'
        case 4:
            return '物理'
        case 5:
            return '化学'
        case 6:
            return '生物'
        case 7:
            return '政治'
        case 8:
            return '历史'
        case 9:
            return '地理'
        default:
            return '综合'
    }
}

// 转换年级为grade
export const transformGrade = grade => {
    switch (type) {
        case "一年级":
            return 1
        case "二年级":
            return 2
        case "三年级":
            return 3
        case "四年级":
            return 4
        case "五年级":
            return 5
        case "六年级":
            return 6
        case "七年级":
            return 7
        case "八年级":
            return 8
        case "九年级":
            return 9
        case "高一":
            return 10
        case "高二":
            return 11
        case "高三":
            return 12
        default:
            return 1
    }
}

// 需要这样的格式 yyyy-MM-dd hh:mm:ss
export const transformTime = timestamp => {
    let date = new Date(timestamp)
    let Y = date.getFullYear() + '-'
    let M =
        (date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1) + '-'
    let D = date.getDate() + ' '
    let h = date.getHours() + ':'
    let m = date.getMinutes() + ':'
    let s = date.getSeconds()

    return Y + M + D + h + m + s
}
