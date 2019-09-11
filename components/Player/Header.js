import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default Header = ({
    message,
    onDownPress,
    onQueuePress,
    onMessagePress,
    playerMinimized,
}) => {
    const styles = StyleSheet.create({
        container: {
            height: 72,
            paddingTop: 12,
            paddingLeft: 12,
            paddingRight: 12,
            marginTop: 32,
            backgroundColor: 'rgba(0,0,0,1)',
            borderTopColor: playerMinimized ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0,0,0,1)',
            borderBottomColor: !playerMinimized ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0,0,0,1)',
            borderBottomWidth: 1,
            borderTopWidth: 1,
            flexDirection: 'row',
            alignItems: 'center'
        },
        message: {
            flex: 1,
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.72)',
            fontWeight: 'bold',
            fontSize: 12,
        },
        button: {
            opacity: 0.72,
            width: 18,
            height: 18
        }
    });
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onDownPress}>
                <Image
                    style={styles.button}
                    source={require('../../assets/images/down-arrow.png')}>
                </Image>
            </TouchableOpacity>
            <Text
                onPress={onMessagePress}
                style={styles.message}>{message.toUpperCase()}
            </Text>
            <TouchableOpacity onPress={onQueuePress}>
                <Image
                    style={styles.button}
                    source={require('../../assets/images/queue.png')}>
                </Image>
            </TouchableOpacity>
        </View>
    )};

