import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import AppStore from '../../store/app.store';
import {
  ArrowCircleDown,
  ArrowCircleUp,
  Plus,
  Trash,
} from '../../components/icons';

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
          {index !== 0 ? (
            <TouchableOpacity
              onPress={() => AppStore.reorderCharacter('up', index)}
              style={styles.buttonStyle}>
              <ArrowCircleUp width={20} height={20} color={'green'} />
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonStyle} />
          )}

          {index !== AppStore.listData.length - 1 ? (
            <TouchableOpacity
              onPress={() => AppStore.reorderCharacter('down', index)}
              style={styles.buttonStyle}>
              <ArrowCircleDown width={20} height={20} color={'red'} />
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonStyle} />
          )}

          <TouchableOpacity
            onPress={() => {
              AppStore.deleteCharacter(index);
            }}
            style={styles.buttonStyle}>
            <Trash width={20} height={20} color={'blue'} />
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
          onPress={() =>
            props.navigation.navigate('Add', {navigation: props.navigation})
          }
          style={styles.absoluteButton}>
          <Plus width={25} height={25} color={'#fff'} />
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
