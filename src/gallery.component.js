import React, { useState } from 'react';
import { View, Text, Image, Button, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { storage } from './fbstorage';

import styles from './styles';

export default ({captures=[]}) => {
    const [isVisible, setIsVisible] = React.useState(false);
    // hide show modal
    const displayModal = show => setIsVisible(show);

    if (!photoData.cancelled) {
        this.uploadImage(photoData.uri, imageName)
        .then(() => {
            Alert.alert("Success");
        })
        .catch((error) => {
            Alert.alert('Error:', error.message);
        });
    }
    const photoData = await this.camera.takePictureAsync();
    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        var ref = firebase.storage().ref().child("images/" + imageName);
        return ref.put(blob)
    }

    return (

        <Modal 
        transparent={true}
        visible={true}
        // style={[styles.bottomToolbar, styles.galleryContainer]} 
    >
        <View style={{backgroundColor: "#000000aa", flex: 1}}>
            {captures.map(({ uri }) => (
                <View style={styles.galleryImageContainer} key={uri}>
                    <Image source={{ uri }} style={styles.galleryImage} />
                </View>
            ))}
        </View>
        <TouchableOpacity 
        style={{justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 20, 
        top: -20}}
        onPress={() => setIsVisible(false)}
        >
        <Ionicons
            name="md-reverse-camera"
            color="white"
            size={40}
        />
        <Text style={{color: 'white'}}>Discard</Text>
        </TouchableOpacity>
        <Button 
            title='Save'
            onPress={uploadImage} 
        />
    </Modal>

        );
};
