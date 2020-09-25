import AsyncStorage from '@react-native-community/async-storage'

const isDev = true
const path = isDev ? 'http://192.168.3.3:3000' : 'https://school-next.macau.school'

const logoutWithGoogle = async () => {
  // setStatus('loading')
  let logoutState = false

  await fetch(
    `${path}/api/school/auth/mobile/logout`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          expoPushToken: await AsyncStorage.getItem('token')
          // expoPushToken: await AsyncStorage.getItem('token')
          // expoPushToken: 'ExponentPushToken[WdtnmHIhDYaewbrtYLaDMo]'
        }
      )
    })

  try {
    await Promise.all([
      AsyncStorage.removeItem('session'),
      AsyncStorage.removeItem('sessionSig')
    ])
    // 返回这个状态就清空那边的 session
    logoutState = true
    // setUserSession(null)
    // setStatus('logout')
  } catch (e) {
    // setStatus('logout')
    // 返回这个状态就不清空那边的session
    logoutState = false
    // return alert('存儲失敗')
  }

  return logoutState
}

export default logoutWithGoogle