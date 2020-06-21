// src/camera.page.js file
import React from 'react';
import { View, Text, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import storage from "@react-native-firebase/storage";

import styles from './styles';
import Toolbar from './toolbar.component';
import Gallery from './gallery.component';

export default class CameraPage extends React.Component {
    camera = null;

    state = {
        captures: [],
        // setting flash to be turned off by default
        flashMode: Camera.Constants.FlashMode.off,
        capturing: null,
        // start the back camera by default
        cameraType: Camera.Constants.Type.back,
        hasCameraPermission: null,
    };

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };

    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
        
        if (!photoData.cancelled) {
            this.uploadImage(photoData.uri, "test")
            .then(() => {
                alert (typeOfphotoData.uri);
            })
            .catch((error) => {
                Alert.alert('Error:', error.message);
            });
        }
    };

    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        var ref = storage().ref().child("images/" + imageName);
        return ref.put(blob)
    }


    handleLongCapture = async () => {
        // Before starting to recording, setup a timer that calls stopRecording() after 20s IF the camera is still recording, otherwise, no need to call stop
        setTimeout(() => this.state.capturing && this.camera.stopRecording(), 20*1000);
        const videoData = await this.camera.recordAsync();
        this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
    };

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        this.setState({ hasCameraPermission });

        
    };

    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <React.Fragment>
                
                    <View>
                        <Camera
                            type={ cameraType }
                            flashMode={ flashMode }
                            style={styles.preview}
                            ref={camera => this.camera = camera}
                        />
                    </View>
                    {captures.length > 0 && <Gallery captures={captures}/>}
                <Toolbar 
                    capturing={capturing}
                    flashMode={flashMode}
                    cameraType={cameraType}
                    setFlashMode={this.setFlashMode}
                    setCameraType={this.setCameraType}
                    onCaptureIn={this.handleCaptureIn}
                    onCaptureOut={this.handleCaptureOut}
                    onLongCapture={this.handleLongCapture}
                    onShortCapture={this.handleShortCapture}
                />
            </React.Fragment>
        );
    };
};