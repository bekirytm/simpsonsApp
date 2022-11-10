import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import AppStore from '../../store/app.store';
import axios from 'axios';

type Props = {};

const ListScreen = (props: Props) => {
  const [loading, setLoading] = useState(true);

  const aaa = async () => {
    const bbb = await fetch(
      `https://5fc9346b2af77700165ae514.mockapi.io/simpsons`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log('err,', err);
      });

    console.log('NE', bbb);
  };

  return (
    <View>
      <Text>LİST</Text>

      <Button title={'TEST'} onPress={() => console.log('TEST')} />

      <Button
        title={'FETCH'}
        onPress={async () => await AppStore.initialRun()}
      />

      <Button title={'FETCH'} onPress={() => aaa()} />
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

export default observer(ListScreen);
