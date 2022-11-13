import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import {observer} from 'mobx-react-lite';
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
  const [loading, setLoading] = useState(true);

  const _handleSubmit = async (
    values,
    {setSubmitting, setErrors, setStatus, resetForm},
  ) => {
    const addObj = {
      avatar: values.image,
      description: values.about,
      job: values.job,
      name: values.name,
    };
    await AppStore.addCharacter(addObj);
    props.route.params.navigation.navigate('List');
    console.log(values, 'ADDDDD');
  };

  const formInputCard = (title: string, value: string, changeText: void) => {
    return (
      <View style={{marginBottom: 15}}>
        <Text>{title}</Text>

        <TextInput
          value={value}
          onChangeText={text => changeText(text)}
          style={{width: '100%', height: 100, borderWidth: 1, borderRadius: 5}}
        />
      </View>
    );
  };

  return (
    <ScrollView>
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
            // isSubmitting ||
            // Object.keys(errors).length !== 0 ||
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
    </ScrollView>
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

export default observer(AddScreen);
