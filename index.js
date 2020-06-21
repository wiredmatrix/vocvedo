import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name, appName} from './app.json';
import Setup from './Setup';

AppRegistry.registerComponent(appName, () => Setup)