import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native'
import { TouchableHighlight, TouchableNativeFeedback } from 'react-native-gesture-handler';
import mapTrack from '../maps/mapTrack';

const tracks = (album) => {
    const tracks = album.tracks.map(track => mapTrack(album, track))
    return tracks;
}
export function Album(props) {
    const { width } = Dimensions.get('window');
    const { onReplaceQueue, onPlayNext, onAddToQueue } = props;
    const styles = StyleSheet.create({
        albumContainer: {
            margin: 10
        },
        albumCover: {
            borderRadius: 5,
            borderWidth: 0,
            width: (width / 2) - 20,
            height: (width / 2) - 20,
        },
        albumInfo: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        infoText: {
            color: '#fff',
            fontFamily: 'jaldi'
        },
        moreButton: {
            height: 18,
            width: 18,
        }
    })
    return (
        <View style={styles.albumContainer}>
            <View>

            <TouchableHighlight onPress={(event) => onReplaceQueue(event, tracks(props.album))}>
                <Image source={{ uri: props.album.thumbnail }} resizeMode={'contain'} style={styles.albumCover}></Image>
            </TouchableHighlight>
                <View style={styles.albumInfo}>
                    <View>
                <TouchableHighlight onPress={(event) => onPlayNext(event, tracks(props.album))}>
                    <Text style={styles.infoText}>{props.album.artist}</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={(event) => onAddToQueue(event, tracks(props.album))}>
                    <Text style={[styles.infoText, { color: 'rgba(255,255,255,.72)', fontSize: 10}]}>{props.album.album}</Text>
                        </TouchableHighlight>
                    </View>
                <TouchableHighlight>
                    <Image style={styles.moreButton} source={require('../assets/images/more_vert.png')}></Image>
                </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}