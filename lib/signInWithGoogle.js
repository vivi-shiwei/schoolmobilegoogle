import { Alert } from 'react-native'
import { useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import * as GoogleSignIn from 'expo-google-sign-in'

const isDev = false
const path = isDev ? 'http://192.168.3.3:3000' : 'https://school-next.macau.school'

const signInWithGoogle = async () => {
  let loginState = null

  try {
    await GoogleSignIn.askForPlayServicesAsync()
    const { type, user } = await GoogleSignIn.signInAsync()
    alert('user ' + JSON.stringify(user))
    alert('333')
    if (type === 'success') {
      await GoogleSignIn.initAsync({
        clientId: '404097902962-quufj5t480gmgr9e9r0brvovankauun0.apps.googleusercontent.com',
      })
      const users = JSON.stringify(await GoogleSignIn.signInSilentlyAsync())
      const sessions = await fetch(
        `${path}/api/school/auth/mobile`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            {
              user: users,
              accessToken: users.accessToken
            }
          )
        })
        .then((response) => response.json())
      alert(sessions)
      if (!sessions) {
        // 登录失败返回 null 值
        return loginState
      }


      try {
        await Promise.all([
          AsyncStorage.setItem('session', sessions.session),
          AsyncStorage.setItem('sessionSig', sessions.sessionSig)
        ])
        // 储存成功赋值
        loginState = {
          session: await AsyncStorage.getItem('session'),
          sessionSig: await AsyncStorage.getItem('sessionSig')
        }
      } catch (e) {
        // 储存失败 null 值
        loginState = null
      }
    }
  } catch ({ message }) {
    alert('login: Error:' + message)
  }

  // 有对象就表示登录成功了
  return loginState
}

export default signInWithGoogle