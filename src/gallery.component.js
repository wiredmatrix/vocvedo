import React, { Component } from 'react';
import { View, Text, Image, Button, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

export default class GalleryPreview extends React.Component {
  render () {
    const { captures = [] } = this.props;
    return (
      <ScrollView 
        horizontal={true}
        style={[styles.bottomToolbar, styles.galleryContainer]} 
      >
        {captures.map(({ uri }) => (
          <View style={styles.galleryImageContainer} key={uri}>
            <Image source={{ uri }} style={styles.galleryImage} />
          </View>
        ))}
      </ScrollView>
    )
  }
}