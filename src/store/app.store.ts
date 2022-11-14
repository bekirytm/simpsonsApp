import {action, makeAutoObservable, observable, runInAction} from 'mobx';
import {AsyncStorage} from 'react-native';
import AppApi from '../api/app.api';

class AppStore {
  listData = null;

  constructor() {
    makeAutoObservable(this, {
      listData: observable,

      initialRun: action,
      getAllStorageData: action,
    });
  }

  async initialRun() {
    const storageData = await this.getAllStorageData();

    if (storageData) {
      console.log('A');
      await AppApi.fetchAllData()
        .then(async res => {
          runInAction(() => {
            this.listData = res;
          });
          await this.setAllStorageData(res);
          return true;
        })
        .catch(err => {
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
        return true;
      }
    } catch (error) {
      return true;
    }
  }

  async setAllStorageData(data) {
    try {
      await AsyncStorage.setItem('myAllData', JSON.stringify(data));
    } catch (err) {
      return false;
    }
  }

  //Add Character
  async addCharacter(values) {
    const old = this.listData;
    const newData = [values, ...old];

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

  //Reorder
  async reorderCharacter(type: string, index: number) {
    const old = [...this.listData];
    const a = old.splice(index, 1);

    if (type === 'up') {
      old.splice(index - 1, 0, a[0]);
      runInAction(() => {
        this.listData = old;
        this.setAllStorageData(old);
      });
    } else {
      old.splice(index + 1, 0, a[0]);
      runInAction(() => {
        this.listData = old;
        this.setAllStorageData(old);
      });
    }
  }
}

export default new AppStore();
