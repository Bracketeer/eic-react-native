import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';

export default AlbumArt = (props) => {
    return (
        <View style={styles.container}>
            <Image style={styles.albumArt} source={{ uri: props.album.cover }}></Image>
        </View>
    )};
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
    },
    albumArt: {
        alignSelf: 'center',
        padding: 20,
        marginTop: 20,
        marginBottom: 20,
        width: width - 40,
        height: width - 40,
        maxHeight: height / 2,
        maxWidth: height / 2,
        resizeMode: 'contain',
        borderRadius: 5,
    }
})