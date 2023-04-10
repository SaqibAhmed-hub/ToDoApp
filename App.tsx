
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store/store';
import AppContainer from './src/router/routes';



function App() {
  return (
    <Provider
      store={Store} >
      <AppContainer />
    </Provider>
  )
}

export default App;
