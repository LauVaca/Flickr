import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import axios from 'axios';
import PhotoDetail from './PhotoDetail';

const PhotoList = ({route}) => {
  const [photos, setPhotos] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${
            route.params.albumId
          }&user_id=137290658%40N08&format=json&nojsoncallback=1`,
        );
        setPhotos(response.data.photoset.photo);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  if (!photos) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <FlatList
        data={photos}
        renderItem={({item}) => (
          <PhotoDetail
            key={item.title}
            photoId={item.id}
            title={item.title}
            imageUrl={`https://farm${item.farm}.staticflickr.com/${
              item.server
            }/${item.id}_${item.secret}.jpg`}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default PhotoList;
