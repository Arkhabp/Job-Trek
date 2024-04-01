import {SafeAreaView} from 'react-native';

import {Provider} from 'react-redux';

import {persistor, store} from './src/store';
import AppNavigation from './src/navigations/AppNavigation';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <AppNavigation />
        </Provider>
      </PersistGate>
    </SafeAreaView>
  );
};

export default App;
