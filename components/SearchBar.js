import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { TextInput } from 'react-native-gesture-handler';

export function SearchBar(props) {
    const [state, setState] = useState({ text: '' });
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            marginTop: 10
        },
        input: {
            borderColor: '#d9d9d9',
            borderWidth: 1,
            borderRadius: 5,
            margin: 10,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 10
        }
    });
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search"
                onChangeText={(text) => setState({ text })}
                value={state.text}>
            </TextInput>
        </View>
    );
}