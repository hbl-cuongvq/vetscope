import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native'

const LoadingHome = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
    </View>
  )
}

export default LoadingHome

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})