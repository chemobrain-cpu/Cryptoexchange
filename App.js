import "react-native-gesture-handler"
import 'react-native-reanimated'
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from 'react'
//import {Navig} from '@react-navigation/native'
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import * as Font from 'expo-font';
//redux config
//configuring redux store
import ReduxThunk from "redux-thunk"
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux"
import { userAuthReducer } from "./store/reducer/appStorage"

//importing component
import Screen from "./config";
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'https://79c24fcc719f498b8b5b96c88e487e78@o4504055051124736.ingest.sentry.io/4504055061348352',
  enableInExpoDevelopment: false,
  debug:true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});





let  App = ()=> {
  const [isLoading, setIsLoading] = useState(true)

  //redux store setup
  const rootReducer = combineReducers({
    userAuth: userAuthReducer,
  })
  //creating store
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

  let loadFonts = async () => {

    await Font.loadAsync({
      'ABeeZee': require('./assets/fonts/ABeeZee-Regular.ttf'),
      'Poppins': require('./assets/fonts/Poppins-Medium.ttf'),
    })
  }


  useEffect(() => {
    let isSuscribe = true
    loadFonts().then(() => {
      if (isSuscribe) {
        setIsLoading(false)
      }
    }).catch((err) => {
      if (isSuscribe) {
        //set error
      }
    })
    return () => {
      isSuscribe = false
    }
  }, [loadFonts])



  if (isLoading) {

    return (<SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.logo}>coincap</Text>
      </View>
    </SafeAreaView>)
  }
  
  return (
    <Provider store={store}>

      <Screen />

    </Provider >

  );
}


let styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#1652f0",
    zIndex: 10
  },
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    color: '#fff',
    fontSize: 35,

  }


})

export default Sentry.Native.wrap(App);