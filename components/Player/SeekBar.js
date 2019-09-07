import React, { Component } from 'react';
import Slider from 'react-native-slider';

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';

const minutesAndSeconds = (milliseconds) => {
    var minutes = Math.floor(milliseconds / 60000);
    var seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};

export default SeekBar = ({
    trackLength,
    currentPosition,
    onSeek,
    onSlidingStart,
}) => {
    const elapsed = minutesAndSeconds(currentPosition);
    const remaining = minutesAndSeconds(trackLength - currentPosition);
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>
                    {elapsed}
                </Text>
                <View style={{ flex: 1 }} />
                <Text style={[styles.text, { width: 40 }]}>
                    {trackLength > 1 && "-" + remaining}
                </Text>
            </View>
            <Slider
                maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
                onSlidingStart={onSlidingStart}
                onSlidingComplete={onSeek}
                value={currentPosition}
                style={styles.slider}
                minimumTrackTintColor='#fff'
                maximumTrackTintColor='rgba(255, 255, 255, 0.14)'
                thumbStyle={styles.thumb}
                trackStyle={styles.track}>
            </Slider>
        </View>
    );
};

const styles = StyleSheet.create({
    slider: {
        marginTop: -12,
    },
    container: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
    },
    track: {
        height: 2,
        borderRadius: 1,
    },
    thumb: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    text: {
        color: 'rgba(255, 255, 255, 0.72)',
        fontSize: 12,
        textAlign: 'center',
    }
});