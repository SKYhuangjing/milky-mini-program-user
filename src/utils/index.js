/*
 * @Author: Yin Xiang Zheng
 * @LastEditors: Yin Xiang Zheng
 * @LastEditTime: 2021-02-16 18:16:25
 */
function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function setUserLoginStatus(data, mpvue) {
  const { token, roles } = data
  let res = false
  try {
    mpvue.setStorageSync('token', token)
    mpvue.setStorageSync('roles', roles)
    mpvue.setStorageSync('userInfo', data)
    res = true
  } catch (error) {
    console.log('setUserLoginStatus->>', error);
    res = false
  }
  return res
}

export function removeUserLoginStatus(mpvue) {
  try {
    mpvue.removeStorageSync('token')
    mpvue.removeStorageSync('roles')
    mpvue.removeStorageSync('userInfo')
    res = true
  } catch (error) {
    console.log('removeUserLoginStatus->>', error);
    res = false
  }
  return res
}


export default {
  formatNumber,
  formatTime,
  setUserLoginStatus,
  removeUserLoginStatus
}
