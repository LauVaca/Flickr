import React, {useState, useEffect} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import {ActivityIndicator} from 'react-native-paper';

const AlbumList = props => {
  const [photoset, setPhotoset] = useState(null);
  useEffect(() => {
    const fectchData = async () => {
      try {
        const {data} = await axios.get(
          'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=137290658%40N08&format=json&nojsoncallback=1',
        );
        setPhotoset(data.photosets.photoset);
      } catch (err) {
        console.log(err);
      }
    };

    fectchData();
  }, []);

  if (!photoset) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} size={40} />
      </View>
    );
  }

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <FlatList
        data={photoset}
        renderItem={({item}) => (
          <AlbumDetail
            navigation={props.navigation}
            key={item.id}
            title={item.title._content}
            albumId={item.id}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default AlbumList;
