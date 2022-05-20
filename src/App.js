import React from 'react';
import { StatusBar } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Provider, useSelector } from 'react-redux';
import { Loading } from './component';
import { Store } from './redux';
import Router from './router';
import { colors } from './utils';

function MainApp() {
  const stateGlobal = useSelector((state) => state);
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.secondary} />
      <Router />
      <FlashMessage position="top" />
      {stateGlobal.isLoading && <Loading />}
    </>
  );
}
function App() {
  return (
    <Provider store={Store}>
      <MainApp />
    </Provider>
  );
}

export default App;
