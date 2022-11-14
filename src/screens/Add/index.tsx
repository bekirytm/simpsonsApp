import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import {Formik} from 'formik';
import AppStore from '../../store/app.store';

type Props = {
  route: {
    params: {
      navigation: any;
    };
  };
};

const AddScreen = (props: Props) => {
  const _handleSubmit = async (values: any) => {
    const addObj = {
      avatar: values.image,
      description: values.about,
      job: values.job,
      name: values.name,
    };
    await AppStore.addCharacter(addObj);
    props.route.params.navigation.navigate('List');
  };

  const formInputCard = (title: string, value: string, changeText: any) => {
    return (
      <View style={{marginBottom: 15}}>
        <View style={{marginBottom: 5}}>
          <Text style={{fontWeight: '400', color: 'red'}}>{title}</Text>
        </View>

        <TextInput
          value={value}
          onChangeText={text => {
            changeText(text);
          }}
          multiline={true}
          style={{
            textAlign: 'justify',
            textAlignVertical: 'top',
            width: '100%',
            height: 60,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 5,
          }}
        />
      </View>
    );
  };

  return (
    <ScrollView style={{paddingTop: 20}}>
      <Formik
        initialValues={{
          name: '',
          job: '',
          about: '',
          image: '',
        }}
        onSubmit={_handleSubmit}
        // validationSchema={validations}
      >
        {({values, handleChange, handleSubmit}) => {
          const disabled =
            values.name.trim() === '' ||
            values.job.trim() === '' ||
            values.about.trim() === '' ||
            values.image.trim() === '';
          return (
            <View style={{paddingHorizontal: 10}}>
              {formInputCard(
                'Name Surname:',
                values.name,
                handleChange('name'),
              )}

              {formInputCard('Job Title:', values.job, handleChange('job'))}

              {formInputCard(
                'About Him/Her:',
                values.about,
                handleChange('about'),
              )}

              {formInputCard(
                'Image Link:',
                values.image,
                handleChange('image'),
              )}

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                  disabled={disabled}
                  onPress={handleSubmit}
                  style={{
                    width: 200,
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: disabled ? 'gray' : '#4ac',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#fff'}}>ADD</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      </Formik>
      <View style={{height: 100}} />
    </ScrollView>
  );
};

export default AddScreen;
