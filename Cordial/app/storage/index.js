import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';

export default DeviceStorage = new Storage({
  size: 10000, // default is 1000
  storageBackend: AsyncStorage,
  defaultExpires: null, // our data should never expire
  enableCache: true,
});
