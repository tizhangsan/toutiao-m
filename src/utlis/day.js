import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import rTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')

// 使用插件。固定格式dayjs.extend(插件)
dayjs.extend(rTime)
export const relativeTime = function (yourTime) {
    // 使用dayjs提供的api对用户传入的时间 yourTime
    // 进行格式化，以返回一个相对时间
    return dayjs().to(dayjs(yourTime))
    // console.log(yourTime)
    // return dayjs(yourTime).format('DD/MM/YYYY')
  }
  

