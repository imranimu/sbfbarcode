import React, { Component } from 'react';
import {
  Image,
  View,
  ScrollView,
} from 'react-native';

import GLOBAL from '../Global/Global.js'
// import NetInfo from "@react-native-community/netinfo";
 import AsyncStorage from '@react-native-community/async-storage';
 import styles from './SplashStyle.js'
import { StackActions, NavigationActions } from 'react-navigation';

const logo = require("@Asset/images/sbf_splash.png");

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.fetchrecords()
  }

  async fetchrecords() {

    const islogin = await AsyncStorage.getItem('islogin');
      this.timeoutHandle = setTimeout(() => {
  
        this.setState(previousState => {
  
              if (islogin=="true")
                  {
                      this.navigateToUser();
                }
                    else
                    {
                        this.navigateToNewUser();
                      }
        })

      }, 3000)
  }

  navigateToNewUser(){
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'LoginNewUser' })],
    });
    this.props.navigation.dispatch(resetAction);
  }
  navigateToUser(){
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'UserHome' })],
    });
    this.props.navigation.dispatch(resetAction);
  }
  
    componentWillUnmount() {
      clearTimeout(this.timeoutHandle)
    }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: GLOBAL.COLOR.WHITE }}
        scrollEnabled>
        

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={logo} style={{ height: '45%', width: '65%' }} resizeMode = {'contain'} />

          </View>

        

      </ScrollView>
    );
  }
}
