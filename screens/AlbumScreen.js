import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ScrollView, TouchableNativeFeedback } from 'react-native-gesture-handler';

function Tracks(props, album) {
    const { navigation } = props;
    const styles = StyleSheet.create({
        track: {
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 10,
            paddingRight: 10,
            color: '#ffffff',
            fontSize: 16
        }
    })
    return album.tracks.map((track, index) => {
        return (
            <TouchableNativeFeedback
                key={track.track_number}
                onPress={() => props.navigation.navigate('PlayerScreen', { album: album, track: track, trackIndex: index })}>
                <Text style={styles.track}>
                    {track.track_number + '. '} {track.title}
                </Text>
            </TouchableNativeFeedback>
        )
    })
}
export function AlbumScreen(props) {
    const { navigation } = props;
    const album = navigation.getParam('album');
    const styles = StyleSheet.create({
        cover: {
            width: 400,
            height: 400,
            borderRadius: 5
        },
        trackContainer: {
            flex: 1,
            alignItems: 'flex-start',
            width: '100%',
            color: '#ffffff'
        },
        albumContainer: {
            paddingTop: 50,
            flex: 1,
            alignItems: 'center',
            borderWidth: 0,
            backgroundColor: '#000'
        },
        button: {
            marginBottom: 10,
            marginLeft: 10
        },
        trackList: {
            width: '100%'
        }
    })
    return (
        <View style={styles.albumContainer}>
            <TouchableNativeFeedback onPress={() => navigation.navigate('Home')}>
                <Image source={{uri: album.cover}} resizeMode={'contain'} style={styles.cover}></Image>
            </TouchableNativeFeedback>
                <View style={styles.trackContainer}>
                <Text>{album.artist}</Text>
                <Text>{album.album}</Text>
                <ScrollView style={styles.trackList}>
                    {Tracks(props, album)}
                </ScrollView>
            </View>
        </View>
    )
}