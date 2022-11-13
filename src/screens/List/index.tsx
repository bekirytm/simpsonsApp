import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import AppStore from '../../store/app.store';
import axios from 'axios';

type Props = {
  navigation: any;
};

const ListScreen = (props: Props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFirstData().then(() => setLoading(false));
  }, []);

  const fetchFirstData = async () => {
    return await AppStore.initialRun();
  };

  const renderCard = (item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.navigation.navigate('Details', {detailInfo: item})}
        style={styles.listButton}
        key={index}>
        <View
          style={{justifyContent: 'center', alignItems: 'center', flex: 0.05}}>
          <Text style={{fontSize: 13, fontWeight: '500'}}>{index + 1}</Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10,
            flex: 0.1,
          }}>
          <Image
            resizeMode={'contain'}
            style={{width: 40, height: 40}}
            source={{uri: item.avatar}}
          />
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10,
            flex: 0.55,
          }}>
          <Text>{item.name}</Text>
        </View>

        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text>Up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonStyle}>
            <Text>Dw</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonStyle}>
            <Text>DL</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return loading ? (
    <ActivityIndicator />
  ) : (
    <View style={{flex: 1}}>
      <View
        style={{
          marginVertical: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontWeight: 'bold'}}>Simpsons</Text>
      </View>

      <FlatList
        data={AppStore.listData}
        renderItem={({item, index}) => renderCard(item, index)}
      />

      <View style={styles.absoluteArea}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Add')}
          style={styles.absoluteButton}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 30}}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonArea: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.33,
  },
  absoluteArea: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  absoluteButton: {
    width: 60,
    height: 60,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4ac',
  },
  listButton: {
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: 'gray',
  },
});

export default observer(ListScreen);
