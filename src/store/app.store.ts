import {action, makeAutoObservable, observable, runInAction} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppApi from '../api/app.api';

class AppStore {
  fetchingData = null;
  listData = null;

  constructor() {
    makeAutoObservable(this, {
      listData: observable,

      initialRun: action,
      getAllStorageData: action,
    });
  }

  async initialRun() {
    const a = await this.getAllStorageData();

    if (a) {
      console.log('A');
      await AppApi.fetchAllData()
        .then(async res => {
          runInAction(() => {
            this.fetchingData = res;
          });
          await this.setAllStorageData(res);
          return true;
        })
        .catch(err => {
          console.log(err, 'ERROR');
          return false;
        });
    } else {
      return true;
    }
  }

  //STORAGE
  async getAllStorageData() {
    try {
      const myList = await AsyncStorage.getItem('myAllData');
      if (myList !== null) {
        this.listData = JSON.parse(myList);
        return false;
      } else {
        console.log('*');
        return true;
      }
    } catch (error) {
      console.log('1');
      return true;
    }
  }

  async setAllStorageData(data) {
    try {
      console.log('U');
      await AsyncStorage.setItem('myAllData', JSON.stringify(data));
    } catch (err) {
      console.log('N');
      return false;
    }
  }

  //Add Character
  async addCharacter(values) {
    const old = this.listData;
    const newData = [values, ...old];

    // const newData = [...last, values];
    runInAction(() => {
      this.listData = newData;
      this.setAllStorageData(newData);
    });
  }

  //Delete Character
  async deleteCharacter(index) {
    const old = [...this.listData];
    old.splice(index, 1);
    runInAction(() => {
      this.listData = old;
      this.setAllStorageData(old);
    });
  }
}

export default new AppStore();
