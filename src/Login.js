import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import styles from './BarStyle.js'
import { TextInput } from 'react-native-gesture-handler';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-community/async-storage";
import GLOBAL from "./Global/Global.js";
const banns = require("@Asset/images/banns.png");
const logo = require("@Asset/images/logo.png");
import { StackActions, NavigationActions } from "react-navigation";
import { tsExpressionWithTypeArguments } from '@babel/types';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_email: "",
      password: "",
      isLoading: false,
    };
  }


  async signIn() {
    NetInfo.fetch().then(state => {

      if (state.isConnected) {
        if (this.state.user_email === "") {
          alert("Please enter a valid email address")
          return;
        }
        if (this.state.password === "") {
          alert("Please enter a valid password")
          return;
        }

        this.setState({
          isLoading: true
        });

        fetch(GLOBAL.login, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: this.state.user_email,
            password: this.state.password
          })
        })
          .then(response => response.json())
          .then(responseData => {
            this.setState({
              isLoading: false
            });
            console.log("Login response:", JSON.stringify(responseData));

            if (responseData.result.status === 'Valid') {

              this.navigateToHome();

              AsyncStorage.setItem(
                "userid",
                JSON.stringify(responseData.result.resultarray.user.id)
              );
              AsyncStorage.setItem("islogin", "true");
              try {
                AsyncStorage.setItem(
                  "userInfo",
                  JSON.stringify(responseData.result.resultarray)
                );
              } catch (e) {
                console.log("Exception", "exception");
              }
            }
            else {
              alert(responseData.result.message);
            }
          })
          .catch(error => {
            this.setState({
              isLoading: false
            });
            console.log("-------- error ------- " + error);
            alert("An error occured while performing this action!")

          });
      } else {
        alert("There is no internet connection. Please check your connection")
      }
    });
  }

  navigateToHome() {
    const resetAction = StackActions.reset({
      index: 0,
      key: null, // <-- this
      actions: [NavigationActions.navigate({ routeName: "UserHome" })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  signUp() {
    this.props.navigation.navigate('Registration')
  }


  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, }}
        scrollEnabled>
        <ImageBackground source={banns} style={{ resizeMode: 'contain', height: '100%', width: '100%' }}>
          {this.state.isLoading &&
            <View style={styles.loading}>
              <ActivityIndicator
                color={GLOBAL.COLOR.THEME_ORANGE}
                size='large' />
            </View>
          }
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, paddingHorizontal: 15 }}>

            <Image source={logo} style={styles.logo} />

            <TextInput
              placeholder='User Name'
              placeholderTextColor={GLOBAL.COLOR.PLACEHOLDER_TEXT}
              style={styles.inputStyle}
              value={this.state.user_email}
              autoCapitalize='none'
              keyboardType={"email-address"}
              onChangeText={text => this.setState({ user_email: text })}

            >
            </TextInput>
            <TextInput
              placeholder='Password'
              placeholderTextColor={GLOBAL.COLOR.PLACEHOLDER_TEXT}
              style={styles.inputStyle}
              value={this.state.password}
              onChangeText={text => this.setState({ password: text })}
              secureTextEntry={true}
            >
            </TextInput>
            <TouchableOpacity style={styles.full} onPress={() => this.signIn()}>
              <Text style={styles.loginBtn}>LOGin</Text>
            </TouchableOpacity>

            <Text numberOfLines={1} style={{ fontSize: 12, marginTop: 15, alignSelf: 'center' }}>
              <Text style={{ color: GLOBAL.COLOR.WHITE }}>{"DON'T HAVE AN ACCOUNT?"}</Text>
              <Text style={{ color: GLOBAL.COLOR.SILVER_GRAY }}>{" | "}</Text>
              <Text style={{ color: GLOBAL.COLOR.THEME_ORANGE, fontSize: 14 }} onPress={() => this.signUp()}>Register</Text>
            </Text>

            <TouchableOpacity style={{ marginTop: 25 }} onPress={() => this.props.navigation.navigate('ForgetPassword')}>
              <Text style={styles.forget}>{"Forget Password?"}</Text>
            </TouchableOpacity>


          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}
export default Login;