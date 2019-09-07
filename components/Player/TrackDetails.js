import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';

export default TrackDetails = ({
    title,
    artist,
    onAddPress,
    onMorePress,
    onTitlePress,
    onArtistPress,
}) => (
        <View style={styles.container}>
            <TouchableOpacity onPress={onAddPress}>
                <Image style={styles.moreButton}
                    source={require('../../assets/images/add.png')} />
            </TouchableOpacity>
            <View style={styles.detailsWrapper}>
                <Text style={styles.title} onPress={onTitlePress}>{title}</Text>
                <Text style={styles.artist} onPress={onArtistPress}>{artist}</Text>
            </View>
            <TouchableOpacity onPress={onMorePress}>
                <View style={styles.moreButton}>
                    <Image style={styles.moreButtonIcon}
                        source={require('../../assets/images/more_horiz.png')} />
                </View>
            </TouchableOpacity>
        </View>
    );

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailsWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    artist: {
        color: 'rgba(255, 255, 255, 0.72)',
        fontSize: 12,
        marginTop: 4,
    },
    button: {
        opacity: 0.72,
    },
    moreButton: {
        opacity: 0.72,
        borderRadius: 10,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    moreButtonIcon: {
        height: 17,
        width: 17,
    }
});