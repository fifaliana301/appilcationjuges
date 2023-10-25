import React, { useState } from "react"
import { Text, View } from "react-native"

function HomeComponent() {
  return (
    <View testID="home-page">
      <Text>HomeComponent</Text>
      <View testID="slider"></View>
    </View>
  )
}

export default HomeComponent
