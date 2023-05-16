import { View, Text, StyleSheet, Dimensions, ScrollView, Button } from 'react-native'
import React from 'react'
import Header from './components/Header'
import InputContainer from './components/Input'
import colors from './static/colorPallete'
import { StatusBar } from 'expo-status-bar'


const App = () => {
  return (
    <>
    <StatusBar hidden={true} />
    <ScrollView showsVerticalScrollIndicator={false} style={styles.appContainer}>
      <Header title='cinfo.' />
      <InputContainer placeholderText="Enter a movie name" />
    </ScrollView>
    </>
  )
}


const styles = StyleSheet.create({
  appContainer:{
      height:Dimensions.get('screen').height,
      width:Dimensions.get('screen').width,
      backgroundColor: colors.pitchBlack
  }
})

export default App