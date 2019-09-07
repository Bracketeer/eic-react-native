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
  Dimensions
} from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { Album } from '../components/Album';
import { PlayerScreen } from './PlayerScreen.js';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

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
    }
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {
        dy: this.state.pan.y
      }]),
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderRelease: (event, gesture) => {
        // console.log(event)
        const { height } = Dimensions.get('window');
        this.state.pan.flattenOffset();
        if (gesture.dy < -100) {
          Animated.spring(
            this.state.pan,
            { toValue: { x: 0, y: 0 }, tension: 20, velocity: .5, }
          ).start();
        }
        else {
          Animated.spring(
            this.state.pan,
            { toValue: { x: 0, y: height - 72 }, tension: 20, velocity: .5 }
          ).start();
        }
        }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <Image
            style={{ width: '100%' }}
            resizeMode={'contain'}
            source={require('../assets/images/eic.png')} />
          <SearchBar />
          <Albums {...this.props} />
        </ScrollView>
        <PlayerScreen
          album={AlbumData[0]}
          track={AlbumData[0].tracks[0]}
          trackIndex={0}
          {...this.props} />
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
  container: {
    flex: 1,
    backgroundColor: '#000',
  },  
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
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
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
    color: 'orange'
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
