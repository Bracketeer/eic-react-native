import React from 'react';
import { View, Animated, PanResponder, Dimensions, ScrollView, StyleSheet, Text } from 'react-native';
import Track from '../components/Queue/Track';
import { TouchableHighlight } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');

export class QueueScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queue: this.props.queue,
            currentTrackIndex: this.props.queueIndex,
            queueHidden: true,
            pan: new Animated.ValueXY({x: width - 10, y: 0}),
        }
        const touchThreshold = 30;
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: (e, gestureState) => {
                const { dx } = gestureState;

                return (Math.abs(dx) > touchThreshold);
            },
            onPanResponderMove: (event, guesture) => {
                if ((this.state.queueHidden && guesture.dx < 0) || !this.state.queueHidden && guesture.dx > 0) {
                    Animated.event([null, {
                        dx: this.state.pan.x
                    },])(event, guesture)
                }
            },
            onResponderTerminationRequest: () => false,
            onPanResponderGrant: (e, gestureState) => {
                this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
                this.state.pan.setValue({ x: 0, y: 0 });
            },
            onPanResponderRelease: (event, gesture) => {
                this.state.pan.flattenOffset();
                if (gesture.dx < 100) {
                    this.setState({ queueHidden: false })
                    Animated.spring(
                        this.state.pan,
                        { toValue: { x: 0, y: 0 }, tension: 70, velocity: .5, overshootClamping: true }
                    ).start();
                }
                else
                    if (gesture.dx > 100) {
                        this.setState({ queueHidden: true })
                        Animated.spring(
                            this.state.pan,
                            { toValue: { x: width - 10, y: 0 }, tension: 70, velocity: .5, overshootClamping: true }
                        ).start();
                    } else {
                        if (this.state.queueHidden) {
                            Animated.spring(
                                this.state.pan,
                                { toValue: { x: width - 10, y: 0 }, tension: 70, velocity: .5, overshootClamping: true }
                            ).start();
                        } else {
                            Animated.spring(
                                this.state.pan,
                                { toValue: { x: width - 10, y: 0 }, tension: 70, velocity: .5, overshootClamping: true }
                            ).start();
                        }
                    }
            }
        });
    }
    componentWillReceiveProps({ queue, queueIndex }) {
        this.setState({ queue: queue, currentTrackIndex: queueIndex })
    }
    Tracks({queue}) {
        return queue.map((track, index) => {
            return (
                <TouchableHighlight
                    style={styles.track}
                    key={track.title + index}
                    onPress={(event) => this.props.changeTrack(event, index)}>
                    <Track
                        currentlyPlaying={this.props.queueIndex === index}
                        pastTrack={index < this.props.queueIndex}
                        title={track.title}
                        album={track.album}
                        artist={track.artist}
                        thumbnail={track.thumbnail} />
                </TouchableHighlight>
            )
        }
        )
    };
    render() {
        return (
            <Animated.View
                {...this.panResponder.panHandlers}
                style={[styles.container, this.state.pan.getLayout()]}>
                <Text style={styles.text}>Queue</Text>
                <ScrollView>
                    {this.Tracks({queue: this.state.queue, props: this.props})}
                </ScrollView>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: 72,
        paddingTop: 32,
        zIndex: 5,
        backgroundColor: 'rgba(0,0,0,1)',
    },
    text: {
        color: '#fff',
        padding: 10,
        textTransform: 'uppercase',

    },
    track: {
        flex: 1,
        width: width - 10,
        minHeight: 50,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2,
        paddingBottom: 2,
    }
})