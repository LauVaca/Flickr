import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import AlbumList from './src/components/AlbumList';
import PhotoList from './src/components/PhotoList';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

// Create a component
function App() {
  return (
    <PaperProvider>
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Screen
            name="albumList"
            component={AlbumList}
            options={{title: 'Albums'}}
          />
          <Stack.Screen
            name="photoList"
            component={PhotoList}
            options={{title: 'Photos'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3F51B5',
    card: '#E7E8EA',
  },
};

AppRegistry.registerComponent(appName, () => App);
//export default App;
