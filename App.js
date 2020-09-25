import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import * as GoogleSignIn from 'expo-google-sign-in'

// import logoutWithGoogle from './lib/logoutWithGoogle'
import signInWithGoogle from './lib/signInWithGoogle'
// import getAsyncStorage from './lib/getAsyncStorage'

const App = () => {
  const [user, setUser] = useState(null)

  const signOutAsync = async () => {
    await GoogleSignIn.signOutAsync()
    setUser(null)
  }

  // const syncUserWithStateAsync = async () => {
  //   await GoogleSignIn.initAsync({
  //     clientId: '404097902962-quufj5t480gmgr9e9r0brvovankauun0.apps.googleusercontent.com',
  //   })
  //   const user = await GoogleSignIn.signInSilentlyAsync()
  //   setUser({ user })
  // }

  // const signInAsync = async () => {
  //   try {
  //     await GoogleSignIn.askForPlayServicesAsync()
  //     const { type, user } = await GoogleSignIn.signInAsync()
  //     alert('user' + user.accessToken)
  //     alert('333')
  //     if (type === 'success') {
  //       syncUserWithStateAsync()
  //       alert(user)
  //     }
  //   } catch ({ message }) {
  //     alert('login: Error:' + message)
  //   }
  // }

  const onPress = () => {
    if (!!user) {
      signOutAsync()
    } else {
      signInWithGoogle(setUser)
    }
  }

  return (
    <View style={styles.container}>
      <Text>{!!user ? "已登錄" : "已登出"}</Text>
      <Text>{JSON.stringify(user)}</Text>
      <Button title={!!user ? "登出" : "登錄"} onPress={onPress} />
      <StatusBar style="auto" />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
