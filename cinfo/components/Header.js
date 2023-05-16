import { View, Text, StyleSheet, SafeAreaView, Dimensions, Platform, ScrollView } from 'react-native'
import React from 'react'
import colors from '../static/colorPallete'

export default function Header({title}) {
  return (
    <>
    <ScrollView style={styles.headerContainer}>
        <SafeAreaView>
        <Text style={styles.headerTitle}>{title}</Text>
        </SafeAreaView>
    </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
    headerContainer:{
        width:'100%'
    },
    headerTitle:{
        textAlign:'center',
        fontSize:40, 
        fontWeight:900, 
        color : colors.primaryYellow,
        paddingVertical:10, 
    }
})