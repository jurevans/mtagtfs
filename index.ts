/**
 * @format
 */
import { pushTabbedApp } from 'navigation/roots';
import { Navigation } from 'react-native-navigation';
import { setTheme } from 'navigation/themes';

setTheme();
Navigation.events().registerAppLaunchedListener(() => pushTabbedApp());
