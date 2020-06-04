import React from 'react';
import {Button, Card} from 'react-native-paper';

const AlbumDetail = ({navigation, title, albumId}) => {
  return (
    <Card elevation={5} style={style}>
      <Card.Title title={title} />
      <Card.Content>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('photoList', {albumId: albumId})}>
          Ver album
        </Button>
      </Card.Content>
    </Card>
  );
};

const style = {
  marginBottom: 10,
};

export default AlbumDetail;
