import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import { AlbumScreen } from '../screens/AlbumScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { PlayerScreen } from '../screens/PlayerScreen';
import { QueueScreen } from '../screens/QueueScreen';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    // Main: MainTabNavigator,
    Home: HomeScreen,
    AlbumScreen: AlbumScreen,
    PlayerScreen: PlayerScreen,
    QueueScreen: QueueScreen,
  })
);
