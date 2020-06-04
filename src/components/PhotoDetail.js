import React, {useState, useEffect} from 'react';
import {Linking, View} from 'react-native';
import {Avatar, Button, Card, List, Divider} from 'react-native-paper';
import axios from 'axios';
const PhotoDetail = ({title, imageUrl, photoId}) => {
  const {
    cardStyle,
    container,
    buttonStyle,
    imageStyle,
    border,
    borderContainer,
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

  const imageSmall = props => (
    <Avatar.Image {...props} source={{uri: imageUrl}} />
  );

  return (
    <Card elevation={5} style={cardStyle}>
      <Card.Title title={title} left={imageSmall} />
      <Card.Cover style={imageStyle} source={{uri: imageUrl}} />
      <View style={container}>
        <Card.Actions>
          <Button
            style={buttonStyle}
            mode="text"
            onPress={() => Linking.openURL(imageUrl)}>
            Abrir imagen
          </Button>
          <View style={borderContainer}>
            <View style={border} />
          </View>
          <Button
            style={buttonStyle}
            mode="text"
            onPress={() => {
              // eslint-disable-next-line no-shadow
              setShowComments(showComments => !showComments);
            }}>
            {!showComments ? 'Mostrar comentarios' : 'Ocultar comentarios'}
          </Button>
        </Card.Actions>
      </View>
      {showComments &&
        comments &&
        comments.map((comment, index) => {
          return (
            <View key={index}>
              <List.Item
                title={comment.realname}
                description={comment._content}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{flex: 1}}
                left={props => (
                  <Avatar.Icon size={50} icon={require('./man-user.png')} />
                )}
              />
            </View>
          );
        })}
    </Card>
  );
};

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    height: 300,
    flex: 1,
  },
  buttonStyle: {
    marginRight: 10,
  },
  cardStyle: {
    padding: 10,
    marginBottom: 15,
  },
  borderContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  border: {
    flex: 0.5,
    borderRightWidth: 2,
    borderRightColor: '#428947',
  },
};

export default PhotoDetail;
