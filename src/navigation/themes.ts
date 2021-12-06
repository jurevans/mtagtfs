import { Navigation } from 'react-native-navigation';

export const setTheme = (): void => {
  Navigation.setDefaultOptions({
    topBar: {
      background: {
        color: '#777',
      },
    },
    statusBar: {
      backgroundColor: '#777',
    },
    bottomTabs: {
      backgroundColor: '#777',
    },
    bottomTab: {
      textColor: '#111',
      selectedTextColor: '#fff',
    },
  });
};
