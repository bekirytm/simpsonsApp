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

    if (!a) {
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
        return true;
      } else {
        console.log('*');
        return false;
      }
    } catch (error) {
      console.log('1');
      return false;
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

  async pictToDelete(index) {
    // this.listData[1]
  }

  //Notify
  // async setNotifyData(count) {
  //   const [err, response] = await AsyncStorage.setItem(
  //     'notify',
  //     count,
  //   ).toArray();
  //   runInAction(() => {
  //     this.notifyCount = count;
  //   });
  // }
  //
  // async getNotifyData() {
  //   const [err, response] = await AsyncStorage.getItem('notify').toArray();
  //   if (!err) {
  //     runInAction(() => {
  //       this.notifyCount = response;
  //     });
  //   }
  //   return !err;
  // }
}

export default new AppStore();
