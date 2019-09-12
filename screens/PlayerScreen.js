import React from 'react';
import {
    StyleSheet,
    View,
    Animated,
    PanResponder,
    Dimensions,
} from 'react-native';
import { Header, TrackDetails, SeekBar, Controls, AlbumArt } from '../components/Player';
import { Video } from 'expo-av';
class PlayerScreen extends React.Component {
    constructor(props) {
        super(props)
        this.playerMinimized = this.props.playerMinimized;
        this.state = {
            paused: false,
            totalLength: 1,
            currentPosition: 0,
            queue: this.props.queue,
            currentTrackIndex: this.props.queueIndex,
            currentTrack: this.props.queue[0],
            repeatOn: false,
            shuffleOn: false,
            pan: new Animated.ValueXY(),
            playerMinimized: false,
        };
        this.onQueuePress = this.props.onQueuePress;
        const { height } = Dimensions.get('window');
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, guesture) => {
                if ((this.state.playerMinimized && guesture.dy < 0) || !this.state.playerMinimized && guesture.dy > 0) {
                    Animated.event([null, {
                        dy: this.state.pan.y
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
                if (gesture.dy < -100) {
                    this.setState({playerMinimized: false})
                    Animated.spring(
                        this.state.pan,
                        { toValue: { x: 0, y: 0 }, tension: 40, velocity: .5, overshootClamping: true }
                    ).start();
                }
                else
                if (gesture.dy > 100) {
                    this.setState({playerMinimized: true})
                    Animated.spring(
                        this.state.pan,
                        { toValue: { x: 0, y: height - 72 }, tension: 40, velocity: .5, overshootClamping: true }
                    ).start();
                } else {
                    if (this.state.playerMinimized) {
                        Animated.spring(
                            this.state.pan,
                            { toValue: { x: 0, y: height - 72 }, tension: 40, velocity: .5, overshootClamping: true }
                        ).start();
                    } else {
                        Animated.spring(
                            this.state.pan,
                            { toValue: { x: 0, y: 0 }, tension: 20, velocity: .5, overshootClamping: true }
                        ).start();
                    }
                }
            }
        });
    }
    componentDidMount() {
        this.onQueuePress({timeStamp: 1})
        
    }
    componentWillReceiveProps({ queue, queueIndex }) {
        if (this.state.currentTrackIndex === queueIndex) {
            this.setState({ queue: queue })
        } else {
            this.refs.audioElement && this.refs.audioElement.setPositionAsync(0);
            this.setState({ isChanging: true });
            setTimeout(() => this.setState({
                queue: queue,
                currentTrackIndex: queueIndex,
                currentTrack: queue[queueIndex],
                isChanging: false,
                currentPosition: 0,
                totalLength: 1
            }), 0)
        }
    }
    setDuration(data) {
        if (data.durationMillis) {
            this.setState({ totalLength: Math.floor(data.durationMillis) });
        }
    }

    setTime(data) {
        if (data.positionMillis) {
            this.setState({ currentPosition: Math.floor(data.positionMillis) });
        }
    }

    seek(time) {
        time = Math.round(time);
        this.refs.audioElement && this.refs.audioElement.setPositionAsync(time);
        this.setState({
            currentPosition: time,
            paused: false,
        });
    }

    onBack() {
        if (this.state.currentPosition < 10 && this.state.currentTrackIndex > 0) {
            this.refs.audioElement && this.refs.audioElement.setPositionAsync(0);
            this.setState({ isChanging: true });
            setTimeout(() => this.setState({
                currentPosition: 0,
                paused: false,
                totalLength: 1,
                isChanging: false,
                currentTrackIndex: this.state.currentTrackIndex - 1,
                currentTrack: this.state.queue[this.state.currentTrackIndex - 1]
            }), 0);
            this.props.onTrackChange(this.state.currentTrackIndex - 1)
        } else {
            this.refs.audioElement.setPositionAsync(0);
            this.setState({
                currentPosition: 0,
            });
        }
    }
    playPauseInstance() {
        if (this.state.paused) {
            this.setState({ paused: false })
            this.refs.audioElement.playAsync();
        } else {
            this.setState({ paused: true })
            this.refs.audioElement.pauseAsync();
        }
    }
    onForward() {
        if (this.state.currentTrackIndex < this.state.queue.length - 1) {
            this.refs.audioElement && this.refs.audioElement.setPositionAsync(0);
            this.setState({ isChanging: true });
            setTimeout(() => this.setState({
                currentPosition: 0,
                totalLength: 1,
                paused: false,
                isChanging: false,
                currentTrackIndex: this.state.currentTrackIndex + 1,
                currentTrack: this.state.queue[this.state.currentTrackIndex + 1]
            }), 0);
            this.props.onTrackChange(this.state.currentTrackIndex + 1)  
        } else {
            this.refs.audioElement.pauseAsync();
        }
    }
    manageQueue(data) {
        if (data.didJustFinish) {
            if (this.state.currentTrackIndex < this.state.queue.length - 1) {
                this.onForward();
            } else {
                this.setState({paused: true})
                this.refs.audioElement.pauseAsync();
            }
        }
    }
    manageTrack(data) {
        this.manageQueue(data);
        this.setTime(data)
    }
    render() {
        const track = this.state.currentTrack;
        const video = this.state.isChanging ? null : (
            <Video
                source={{ uri: track.url }}
                ref="audioElement"
                resizeMode="cover"
                shouldPlay={true}
                isLooping={true}
                onLoadStart={this.isLoaded}
                onLoad={this.setDuration.bind(this)}
                onPlaybackStatusUpdate={this.manageTrack.bind(this)}
                onError={this.onError} />
        );
        return (
            <Animated.View
                {...this.panResponder.panHandlers}
                style={[styles.container, this.state.pan.getLayout()]}>
                <Header
                    playerMinimized={this.state.playerMinimized}
                    message={this.state.currentTrack.title}
                    onDownPress={() => this.navigation.navigate('Home')}
                    onMessagePress={() => { }}
                    onQueuePress={(event) => this.onQueuePress(event)} />
                <View style={{backgroundColor: 'rgba(0,0,0,1)', flex: 1}}>
                    <AlbumArt
                        album={this.state.currentTrack} {...this.props} />
                    <TrackDetails
                        queue={this.state.queue}
                        queueIndex={this.state.currentTrackIndex}
                        title={this.state.currentTrack.title}
                        artist={this.state.currentTrack.artist}
                        onAddPress={() => { }}
                        onMorePress={() => { }}
                        onTitlePress={() => { }}
                        onArtistPress={() => { }} />
                    <SeekBar
                        onSeek={this.seek.bind(this)}
                        trackLength={this.state.totalLength}
                        onSlidingStart={() => this.setState({ paused: true })}
                        currentPosition={this.state.currentPosition} />
                    <Controls
                        onPressRepeat={() => this.setState({ repeatOn: !this.state.repeatOn })}
                        repeatOn={this.state.repeatOn}
                        shuffleOn={this.state.shuffleOn}
                        forwardDisabled={this.state.currentTrackIndex === this.state.queue.length - 1}
                        onPressShuffle={() => this.setState({ shuffleOn: !this.state.shuffleOn })}
                        onPressPlay={() => this.playPauseInstance()}
                        onPressPause={() => this.playPauseInstance()}
                        onBack={this.onBack.bind(this)}
                        onForward={this.onForward.bind(this)}
                        paused={this.state.paused} />
                    {video}
                </View>
            </Animated.View>
        )
    }
}

export { PlayerScreen }

const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 10
    },
    audioElement: {
        height: 0,
        width: 0,
    }
});