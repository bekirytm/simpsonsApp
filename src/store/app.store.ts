import {action, makeAutoObservable, observable, runInAction} from 'mobx';
import AppApi from '../api/app.api';

class AppStore {
  listData = null;

  constructor() {
    makeAutoObservable(this, {
      listData: observable,

      initialRun: action,
    });
  }

  async initialRun() {
    await AppApi.fetchAllData()
      .then(res => {
        console.log(res, 'RES');
        return res;
      })
      .catch(err => {
        console.log(err, 'EROA');
      });
  }
}

export default new AppStore();
