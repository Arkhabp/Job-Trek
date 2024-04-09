import {Provider} from 'react-redux';

import {persistor, store} from './src/store';
import AppNavigation from './src/navigations/AppNavigation';
import {PersistGate} from 'redux-persist/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <PersistGate persistor={persistor}>
          <Provider store={store}>
            <AppNavigation />
          </Provider>
        </PersistGate>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
