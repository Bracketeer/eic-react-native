import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native'
import { TouchableHighlight, TouchableNativeFeedback } from 'react-native-gesture-handler';
export function Album(props) {
    const styles = StyleSheet.create({
        albumContainer: {
            margin: 10
        },
        albumCover: {
            borderRadius: 5,
            borderWidth: 0,
            width: 185,
            height: 185,
        },
        albumInfo: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        infoText: {
            color: '#fff'
        }
    })
    return (
        <View style={styles.albumContainer}>
            <TouchableNativeFeedback onPress={() => props.navigation.navigate('AlbumScreen', { album: props.album })}>
                <Image source={{ uri: props.album.thumbnail }} resizeMode={'contain'} style={styles.albumCover}></Image>
            </TouchableNativeFeedback>
            <View style={styles.albumInfo}>
                <TouchableHighlight onPress={() => props.navigation.navigate('AlbumScreen', { album: props.album })}>
                    <Text style={styles.infoText}>{props.album.artist}</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => props.navigation.navigate('AlbumScreen', { album: props.album })}>
                    <Text style={styles.infoText}>{props.album.album}</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}