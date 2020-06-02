import React, {useState, useEffect} from 'react';
import {Text, View, Image, Linking} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import axios from 'axios';
import {List} from 'react-native-paper';

const PhotoDetail = ({title, imageUrl, photoId}) => {
  const {
    thumbnailStyle,
    headerContentStyle,
    thumbnailContainerStyle,
    headerTextStyle,
    imageStyle,
  } = styles;

  const [comments, setComments] = useState(null);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://api.flickr.com/services/rest/?method=flickr.photos.comments.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photo_id=${photoId}&format=json&nojsoncallback=1`,
        );
        setComments(response.data.comments.comment);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [photoId]);

  return (
    <Card>
      <CardSection>
        <View style={thumbnailContainerStyle}>
          <Image style={thumbnailStyle} source={{uri: imageUrl}} />
        </View>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{title}</Text>
        </View>
      </CardSection>

      <CardSection>
        <Image style={imageStyle} source={{uri: imageUrl}} />
      </CardSection>

      <CardSection>
        <Button onPress={() => Linking.openURL(imageUrl)}>See Now!</Button>
      </CardSection>

      <CardSection>
        <Button
          onPress={() => {
            // eslint-disable-next-line no-shadow
            setShowComments(showComments => !showComments);
          }}>
          {!showComments ? 'Mostrar comentarios' : 'Ocultar comentarios'}
        </Button>
      </CardSection>
      {showComments &&
        comments &&
        comments.map((comment, index) => {
          return (
            <CardSection key={index}>
              <List.Item
                title={comment.realname}
                description={comment._content}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{flex: 1}}
                left={props => <List.Icon {...props} icon="comment" />}
              />
            </CardSection>
          );
        })}
    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  headerTextStyle: {
    fontSize: 18,
  },
  thumbnailStyle: {
    height: 50,
    width: 50,
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null,
  },
};

export default PhotoDetail;
