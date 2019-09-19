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
            trackDetailsStartLocation: null,
            queuePan: new Animated.ValueXY(),
            queue: this.props.queue,
            queueIndex: this.props.queueIndex,
        }
        this.detailsWrapper = null;
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, guesture) => {
                // console.log(event)
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
                const position = this.state.queueHidden ? -(this.state.trackDetailsStartLocation.y) : 0
                Animated.spring(
                    this.state.trackDetailsPan,
                    { toValue: { x: 0, y: position }, tension: 40, velocity: .5 }
                ).start();
            }
        });

    }
    componentWillReceiveProps({queue, queueIndex}) {
        this.setState({queue: queue, queueIndex: queueIndex})
    }
    componentDidMount() {
        setTimeout(() => {
            this.detailsWrapper.measure((fx, fy, width, height, px, py) => {
                this.setState({ trackDetailsStartLocation: { x: px, y: py - height + 14 }})                
            })
        }, 0)
    }
    Tracks() {
        return this.state.queue.map((track, index) => {
            return (
                <TouchableHighlight
                    style={this.styles.track}
                    key={track.title + index}>
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
            <View style={this.styles.container}>
                <View
                    ref={view => { this.detailsWrapper = view; }}                    
                    style={this.styles.detailsWrapper}
                    {...this.panResponder.panHandlers}>
                <TouchableOpacity onPress={this.props.onAddPress}>
                    <Image
                        style={this.styles.moreButton}
                        source={require('../../assets/images/add.png')} />
                </TouchableOpacity>
                    <Animated.View
                        style={[this.styles.detailsWrapper, this.styles.trackInfoWrapper, this.state.trackDetailsPan.getLayout()]}>
                        <Text style={this.styles.title} >{this.props.title}</Text>
                        <Text style={this.styles.artist} >{this.props.artist}</Text>
                    </Animated.View>
                    {!this.state.queueHidden ? (
                    <Animated.View
                        {...this.panResponder.panHandlers}
                        style={[this.styles.trackDetails, this.state.trackDetailsPan.getLayout()]}>
                        <ScrollView>
                            {this.Tracks()}
                        </ScrollView>
                    </Animated.View>
                    ) : null}
                <TouchableOpacity
                    onPress={this.props.onMorePress}>
                    <View
                        style={this.styles.moreButton}>
                        <Image
                            style={this.styles.moreButtonIcon}
                            source={require('../../assets/images/more_horiz.png')} />
                    </View>
                </TouchableOpacity>
                </View>
        </View>
        );
    }
    styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        },
        trackDetails: {
            backgroundColor: '#000',
            position: 'absolute',
            flex: 1,
            bottom: 0,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,.14)',
            zIndex: 11,
            borderRadius: 10,
            overflow: 'hidden',
        },
        detailsWrapper: {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            flex: 1,
            borderWidth: 1,
            borderColor: 'transparent',
            padding: 20,
        },
        trackInfoWrapper: {
            flexDirection: 'column',
            marginLeft: 20,
            marginRight: 20,
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
            width: width - 4
        }
    });
}