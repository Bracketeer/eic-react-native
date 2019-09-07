import React from 'react';

import { View, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';

const isDisabledButton = (bool) => {
    return bool ? styles.disabledButton : styles.button
}
export default Controls = ({
    onPressRepeat,
    repeatOn,
    shuffleOn,
    backDisabled,
    forwardDisabled,
    onPressShuffle,
    onPressPlay,
    onPressPause,
    onBack,
    onForward,
    paused,
    }) => (
        <View style={styles.controls}>
            <TouchableNativeFeedback onPress={onBack}>
                <Image style={isDisabledButton(backDisabled)} source={require('../../assets/images/previous.png')}></Image>
            </TouchableNativeFeedback>
            <View style={styles.playContainer}>
                <TouchableNativeFeedback onPress={paused ? onPressPlay : onPressPause}>
                    <Image style={styles.play} source={paused ? require('../../assets/images/play.png') : require('../../assets/images/pause.png')}></Image>
                </TouchableNativeFeedback>
            </View>
            <TouchableNativeFeedback onPress={onForward}>
                <Image style={isDisabledButton(forwardDisabled)} source={require('../../assets/images/next.png')}></Image>
            </TouchableNativeFeedback>
        </View>
    );
const styles = StyleSheet.create({
    container: {
    },
    controls: {
        padding: 20,
        color: '#ffffff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        height: 40,
        width: 40,
        opacity: 0.72
    },
    disabledButton: {
        height: 40,
        width: 40,
        opacity: 0.3
    },
    playContainer: {
        padding: 5,
        borderColor: 'rgba(255,255,255,.14)',
        borderWidth: 2,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,.14)'
    },
    play: {
        height: 80,
        width: 80,
        opacity: 0.72,
    }
})