import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {observer} from 'mobx-react-lite';

type Props = {};

const DetailScreen = (props: Props) => {
  const [loading, setLoading] = useState(true);

  return (
    <View>
      <Text>DETAIL</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  winLoseArea: {
    position: 'absolute',
    right: 30,
    top: 5,
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});

export default observer(DetailScreen);
