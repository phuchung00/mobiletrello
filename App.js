import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenOrientation } from 'expo';

import Component from './src'
import { Provider } from 'react-redux'
import store from './src/store'


class App extends React.Component {
  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }
  render() {
    return (
      <Provider store={store}>
          <Component style= {styles.cpn} />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  cpn : {
    marginTop:30,
    marginLeft:5,
  }
})

export default App;