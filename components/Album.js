import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler';
import mapTrack from '../maps/mapTrack';
const { width } = Dimensions.get('window');

export class Album extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showOptionsMenu: false,
        },
        this.onReplaceQueue = this.props.onReplaceQueue;
        this.onPlayNext = this.props.onPlayNext;
        this.onAddToQueue = this.props.onAddToQueue;
    }
    styles = StyleSheet.create({
        albumContainer: {
            margin: 10,
            position: 'relative'
        },
        albumCover: {
            borderRadius: 5,
            borderWidth: 0,
            width: (width / 2) - 20,
            height: (width / 2) - 20,
        },
        albumInfo: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        infoText: {
            color: '#fff',
            fontFamily: 'jaldi'
        },
        moreButton: {
            height: 18,
            width: 18,
        },
        moreButtonContainer: {
            justifyContent: 'flex-end',
            flexDirection: 'row',
            paddingLeft: 10,
        },
        optionsView: {
            position: 'absolute',
            right: 0,
            left: 0,
            top: 0,
            height: (width / 2) - 20,
            backgroundColor: 'rgba(0,0,0,.75)',
            zIndex: 3,
            borderRadius: 5,
        },
        optionButton: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 15,
            paddingBottom: 15,
            borderBottomWidth: 1,
            borderColor: 'rgba(255,255,255,.1)'
        }
    })
    tracks (album) {
        const tracks = album.tracks.map(track => mapTrack(album, track))
        return tracks;
    }
    manageOptions(event, fn) {
        this[fn](event, this.tracks(this.props.album))
        this.setState({showOptionsMenu: false})
    }
    render() {
        return (
            <View style={this.styles.albumContainer}>
                <View>
                    {this.state.showOptionsMenu ? (
                    <View style={[this.styles.optionsView]}>
                        <TouchableHighlight onPress={(event) => this.manageOptions(event, 'onReplaceQueue')}>
                            <Text style={[this.styles.infoText, this.styles.optionButton]}>Play Album</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={(event) => this.manageOptions(event, 'onPlayNext')}>
                            <Text style={[this.styles.infoText, this.styles.optionButton]}>Play Next</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={(event) => this.manageOptions(event, 'onAddToQueue')}>
                            <Text style={[this.styles.infoText, this.styles.optionButton]}>Add to Queue</Text>
                        </TouchableHighlight>
                    </View>
                    ) : null}
                    <TouchableHighlight
                        onPress={(event) => this.manageOptions(event, 'onReplaceQueue')}>
                        <Image
                            source={{ uri: this.props.album.thumbnail }}
                            resizeMode={'contain'}
                            style={this.styles.albumCover} />
                </TouchableHighlight>
                    <View style={this.styles.albumInfo}>
                        <View>
                        <Text style={this.styles.infoText}>{this.props.album.artist}</Text>
                        <Text style={[this.styles.infoText, { color: 'rgba(255,255,255,.72)', fontSize: 10}]}>{this.props.album.album}</Text>
                        </View>
                    <TouchableHighlight onPress={() => this.setState({showOptionsMenu: !this.state.showOptionsMenu})}>
                        <View style={this.styles.moreButtonContainer}>
                                
                            <Image style={this.styles.moreButton} source={require('../assets/images/more_vert.png')}></Image>
                        </View>
                    </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }
}