// Vendor
import React from 'react';

// Components
import { View } from 'react-native';
import { Text } from 'react-native-elements';

const Post = (props) => {
  return (
    <View>
      <Text>{props.postText}</Text>
    </View>
  );
};

export default Post;
