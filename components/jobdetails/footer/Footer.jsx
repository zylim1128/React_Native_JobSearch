import React from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'

import styles from './footer.style'
import { icons } from '../../../constants'

const Footer = ({ url }) => {
  return (
    <View style={styles.container}>
      {/* the styles.likeBtn generates a heart-shaped like button 
      and since it is a TouchableOpacity, you can click on it*/}
      <TouchableOpacity style={styles.likeBtn}>
        <Image
          source={icons.heartOutline}
          resizeMode="contain"
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text>Apply for job</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Footer