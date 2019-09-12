import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    Animated,
    Dimensions,
    PanResponder,
} from 'react-native';
import Track from '../../components/Queue/Track'
import { ScrollView } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('window');

export default class TrackDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queueHidden: true,
            trackDetailsPan: new Animated.ValueXY(),
            queuePan: new Animated.ValueXY(),
            queue: this.props.queue,
            queueIndex: this.props.queueIndex,
        }
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, guesture) => {
                // if ((this.state.queueHidden && guesture.dy < 0) || !this.state.queueHidden && guesture.dy > 0) {
                    Animated.event([null, {
                        dy: this.state.trackDetailsPan.y
                    },])(event, guesture)
                // }
            },
            onResponderTerminationRequest: () => false,
            onPanResponderGrant: (e, gestureState) => {
                this.state.trackDetailsPan.setOffset({ x: this.state.trackDetailsPan.x._value, y: this.state.trackDetailsPan.y._value });
                this.state.trackDetailsPan.setValue({ x: 0, y: 0 });
            },
            onPanResponderRelease: (event, gesture) => {
                this.state.trackDetailsPan.flattenOffset();
                this.setState({ queueHidden: !this.state.queueHidden })
                Animated.spring(
                    this.state.trackDetailsPan,
                    { toValue: { x: 0, y: 0 }, tension: 40, velocity: .5 }
                ).start();
            }
        });

    }
    Tracks() {
        return this.state.queue.map((track, index) => {
            return (
                <TouchableHighlight
                    style={styles.track}
                    key={track.title + index}
                // onPress={(event) => this.props.changeTrack(event, index)}
                >
                    <Track
                        currentlyPlaying={this.state.queueIndex === index}
                        pastTrack={index < this.state.queueIndex}
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
            // <View>
            //     { !this.state.queueHidden ? (
            //         <Animated.View
            //             {...this.panResponder.panHandlers}
            //             style={[this.state.queuePan.getLayout()]}>
            //             <ScrollView>
            //                 {this.Tracks()}
            //             </ScrollView>
            //         </Animated.View>
            //     ): null }
                <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onAddPress}>
                    <Image style={styles.moreButton}
                        source={require('../../assets/images/add.png')} />
                </TouchableOpacity>
                <Animated.View
                    {...this.panResponder.panHandlers}
                    style={[styles.detailsWrapper, this.state.trackDetailsPan.getLayout()]}>
                    <Text style={styles.title} onPress={this.props.onTitlePress}>{this.props.title}</Text>
                    <Text style={styles.artist} onPress={this.props.onArtistPress}>{this.props.artist}</Text>
                </Animated.View>
                <TouchableOpacity onPress={this.props.onMorePress}>
                    <View style={styles.moreButton}>
                        <Image style={styles.moreButtonIcon}
                            source={require('../../assets/images/more_horiz.png')} />
                    </View>
                </TouchableOpacity>
            </View>
        // </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        borderWidth: 1,
        borderColor: 'red',
        padding: 20
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
    },
    track: {
        width: width,
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // top: 0,
        // bottom: 0
        // borderWidth: 1,
        // borderColor: 'green'
    }
});