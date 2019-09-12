import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import AlbumData from '../data/albums.json'
import { Image } from 'react-native'
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions,
  Text
} from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { Album } from '../components/Album';
import { PlayerScreen } from './PlayerScreen.js';
import {QueueScreen }from './QueueScreen.js';

const Albums = (props) => {
  return (
    <View style={styles.albumList}>
      {AlbumData.map((album, i) => {
        return (
          <Album key={i} album={album} {...props}></Album>
        )
      })}
    </View>
  )
}
export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      playerMinimized: false,
      queue: [],
      queueIndex: 0,
      queueHidden: null,
      currentTrack: {
        cover: null,
        track: null,
        artist: null,
        album: null,
        url: null
      }
    }
  }
  replaceQueue(tracks) {
    this.setState({ queue: tracks, queueIndex: 0 })
  }
  playNext(tracks) {
    const pastQueue = this.state.queue.filter((track, index) => index <= this.state.queueIndex);
    const futureQueue = this.state.queue.filter((track, index) => index > this.state.queueIndex );
    this.setState({ queue: [...pastQueue, ...tracks, ...futureQueue]})
  }
  addToQueue(tracks) {
    this.setState({ queue: [...this.state.queue, ...tracks] })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{height: 32, width: '100%'}}></View>
        <QueueScreen
            queueHidden={this.state.queueHidden}
            queue={this.state.queue}
            queueIndex={this.state.queueIndex}
            changeTrack={(event, trackIndex) => this.setState({ currentTrack: this.state.queue[trackIndex], queueIndex: trackIndex })}
            {...this.props} />
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <Image
            style={styles.headerImage}
            resizeMode={'contain'}
            source={require('../assets/images/eic.png')} />
          <Text style={styles.headerText}>
            EICV7"
          </Text>
          <Albums
            onReplaceQueue={(event, tracks) => this.replaceQueue(tracks)}
            onPlayNext={(event, tracks) => this.playNext(tracks)}
            onAddToQueue={(event, tracks) => this.addToQueue(tracks)}
            {...this.props} />
        </ScrollView>
        {this.state.queue.length > 0 ? (
          <PlayerScreen
            onQueuePress={(event) => this.setState({queueHidden: event.timeStamp}) }
            queueIndex={this.state.queueIndex}
            onTrackChange={(currentTrackIndex) => this.setState({ queueIndex: currentTrackIndex })}
            queue={this.state.queue}
            {...this.props} />
          ) : null}
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: () => (<Header />),
};

const styles = StyleSheet.create({
  albumList: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 30,
    color: '#fff',
    marginBottom: 30,
    fontFamily: 'jaldi'
  },
  headerImage: {
    width: '100%',
    resizeMode: 'contain'
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },  
  homeScreenFilename: {
    marginVertical: 7,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 20,
  },
  navigationFilename: {
    marginTop: 5,
  },
});
