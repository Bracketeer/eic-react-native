import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';

export default AlbumArt = (props) => {
    return (
        <View style={styles.container}>
            <Image style={styles.albumArt} source={{ uri: props.album.cover }}></Image>
        </View>
    )};
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
    },
    albumArt: {
        padding: 20,
        margin: 20,
        width: width - 40,
        height: width - 40,
        resizeMode: 'contain',
        borderRadius: 5,
    }
})