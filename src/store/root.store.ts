import { runInAction } from 'mobx';
import { IGpsData } from 'models/WidgetData';
import { IPoint } from 'models/Point';
import { fetchGpsLocation } from 'services/gpsToLocation.data.service';


export default class RootStore {
  appInitialized = false;
  gpsLocationData: IGpsData | null = null;


  checkuserstatus(): void {}

  setGpsLocationData(data: IGpsData | null) {
    runInAction(() => {
      this.gpsLocationData = data;
    });
  }

  async fetchGpsLocation(data: IPoint) {
    runInAction(() => {
      fetchGpsLocation(data).then((response: IGpsData | undefined) => {
        runInAction(() => {
          if (response) {
            this.setGpsLocationData(response);
          } else {
            console.error(`gpsLocation invalid response:`, response);
          }
        });
      });
    });
  }
}
