/**
 * @format
 */
import React from 'react';

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AlbumList from './src/components/AlbumList';
import PhotoList from './src/components/PhotoList';
import {Router, Scene, Stack} from 'react-native-router-flux';

// Create a component
const App = () => (
  <Router>
    <Stack key="root">
      <Scene
        key="albumList"
        component={AlbumList}
        title="Albums"
        initial={true}
      />
      <Scene key="photoList" component={PhotoList} title="Photos" />
    </Stack>
  </Router>
);

AppRegistry.registerComponent(appName, () => App);
