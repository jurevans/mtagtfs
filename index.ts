/**
 * @format
 */

import { pushTabbedApp } from 'navigation/roots';
import { Navigation } from 'react-native-navigation';

Navigation.events().registerAppLaunchedListener(() => pushTabbedApp());
