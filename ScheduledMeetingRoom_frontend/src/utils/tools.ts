/**
 * 依照當前小時，匹配對應信息
 * (早上好、中午好、下午好、晚上好)
 * @returns 
 */
export const getHourMatchingMessage = (): string => {
    let message: string = ''
    let tempHour: number = new Date().getHours()
    if (tempHour < 12) {
        message = '早上好！'
    } else if (tempHour <= 14) {
        message = '中午好！'
    } else if (tempHour <= 18) {
        message = '下午好！'
    } else {
        message = '晚上好！'
    }
    return message
}