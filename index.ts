/**
 * @format
 */

import { pushTabbedApp } from 'navigation';
import { Navigation } from 'react-native-navigation';

Navigation.events().registerAppLaunchedListener(() => pushTabbedApp());
