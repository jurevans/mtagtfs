/**
 * @format
 */

import { pushTabbedApp } from './src/navigation';
import { Navigation } from 'react-native-navigation';

Navigation.events().registerAppLaunchedListener(() => pushTabbedApp());
