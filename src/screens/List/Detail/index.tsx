import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {observer} from 'mobx-react-lite';
const {width, height} = Dimensions.get('window');

type Props = {
  route: {
    params: {
      detailInfo: object;
    };
  };
};

const DetailScreen = (props: Props) => {
  const [loading, setLoading] = useState(true);

  console.log('DETAILLLL', props.route.params.detailInfo);

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1, backgroundColor: '#f2f2f2'}}>
        <View>
          <Image
            resizeMode={'contain'}
            style={{width: width, height: width - 70}}
            source={{uri: props.route.params.detailInfo.avatar}}
          />

          <View style={styles.nameArea}>
            <Text style={{fontWeight: '500', fontSize: 22, color: '#000'}}>
              {props.route.params.detailInfo.name}
            </Text>
            <Text style={{fontWeight: '400', fontSize: 12, color: '#868686'}}>
              {props.route.params.detailInfo.job}
            </Text>
          </View>
        </View>

        <View style={{paddingHorizontal: 10, marginTop: 20}}>
          <Text
            style={{
              textAlign: 'justify',
              fontWeight: '500',
              fontSize: 14,
              color: '#868686',
            }}>
            {props.route.params.detailInfo.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  nameArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default observer(DetailScreen);
