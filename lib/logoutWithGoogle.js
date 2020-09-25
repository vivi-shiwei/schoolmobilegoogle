import AsyncStorage from '@react-native-community/async-storage'
import * as GoogleSignIn from 'expo-google-sign-in'

const isDev = true
const path = isDev ? 'http://192.168.3.3:3000' : 'https://school-next.macau.school'

const logoutWithGoogle = async () => {
  let logoutState = false

  // await fetch(
  //   `${path}/api/school/auth/mobile/logout`,
  //   {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(
  //       {
  //         expoPushToken: await AsyncStorage.getItem('token')
  //       }
  //     )
  //   })

  try {
    await Promise.all([
      AsyncStorage.removeItem('session'),
      AsyncStorage.removeItem('sessionSig')
    ])
    await GoogleSignIn.signOutAsync()
    // 返回这个状态就清空那边的 session
    logoutState = true
  } catch (e) {
    logoutState = false
  }
  return logoutState
}

export default logoutWithGoogle