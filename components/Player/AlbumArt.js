import React from 'react';
import { View, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';

export default AlbumArt = (props) => {
    return (
        <View style={styles.container}>
            <Image style={styles.albumArt} source={{ uri: props.album.cover }}></Image>
        </View>
    )};

const styles = StyleSheet.create({
    container: {
    },
    albumArt: {
        padding: 20,
        margin: 20,
        width: 380,
        height: 380,
        resizeMode: 'contain',
        borderRadius: 5,
    }
})