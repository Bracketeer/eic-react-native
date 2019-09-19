import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const Track = ({
    thumbnail,
    title,
    album,
    artist,
    currentlyPlaying,
    pastTrack,
    }) => (
        <View style={[styles.container, { backgroundColor: currentlyPlaying ? 'rgba(255,255,255,.1)' : '#000', opacity: pastTrack ? 0.5 : 1 }]}>
            <Image
                style={styles.image}
                source={{ uri: thumbnail }} />
            <View style={styles.trackInfoContainer}>
                <View style={styles.trackHeader}>
                    <Text style={styles.infoText}>{artist}</Text>
                    <Text style={styles.infoText}>{album}</Text>
                </View>
                <Text style={styles.text}>{title}</Text>
            </View>
        </View>
    )

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 5
    },
    trackInfoContainer: {
        padding: 10,
        flex: 1,
        justifyContent: 'space-between'
    },
    trackHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoText: {
        fontSize: 12,
        color: 'rgba(255,255,255,.73)',
    },
    text: {
        color: '#ffffff',
    }
})

export default Track;