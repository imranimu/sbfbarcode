import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, ImageBackground,Alert,ActivityIndicator } from 'react-native';
import styles from './BarStyle.js'
import { TextInput } from 'react-native-gesture-handler';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-community/async-storage";
import GLOBAL from "./Global/Global.js";
const banns = require("@Asset/images/banns.png");
const logo = require("@Asset/images/logo.png");
import { StackActions, NavigationActions } from "react-navigation";


class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
          old_password: "",
          password: "",
          confirm_password:"",
          isLoading: false,
        };
      }

      async signOut() {
        try {
          await AsyncStorage.removeItem('userid');
                await AsyncStorage.removeItem('islogin');
                await AsyncStorage.removeItem('userInfo');

                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'LoginNewUser' })],
                  });
                  this.props.navigation.dispatch(resetAction);

          return true;
        }
        catch(exception) {
          console.log("Exception: ",exception);
          return false;
        }
        }



      async resetPassword() {
        var userid = JSON.parse(await AsyncStorage.getItem('userid'));
        NetInfo.fetch().then(state => {
        
          if(state.isConnected) {
            if(this.state.password !== this.state.confirm_password){
              alert("Password doesn't match, Please reconfirm your password!")
              return;
            }
            if (this.state.old_password === "") {
              alert("Please enter a valid Password")
              return;
            }
            if (this.state.password === "") {
                alert("Please enter a valid new password")
              return;
            }
    
            this.setState({
              isLoading: true
            });
    
            fetch(GLOBAL.reset_password(userid), {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
    
              body: JSON.stringify({
                current_password:this.state.old_password, 
                password:this.state.password
              })
            })
              .then(response => response.json())
              .then(responseData => {
                this.setState({
                  isLoading: false
                });
                console.log("Reset Password:", responseData);
    
                if (responseData.result.status === 'Valid') {
                    
                    alert(responseData.result.message);
                    this.signOut();
                    
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

      navigateToNewUser(){
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'LoginNewUser' })],
        });
        this.props.navigation.dispatch(resetAction);
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
                            placeholder='Current Password'
                            placeholderTextColor={GLOBAL.COLOR.PLACEHOLDER_TEXT}
                            style={styles.inputStyle}
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ old_password: text })}
                        >
                        </TextInput>
                        <TextInput
                            placeholder='New Password'
                            placeholderTextColor={GLOBAL.COLOR.PLACEHOLDER_TEXT}
                            style={styles.inputStyle}
                            onChangeText={text => this.setState({ password: text })}
                            secureTextEntry={true}
                        >
                        </TextInput>
                        <TextInput
                            placeholder='Confirm New Password'
                            placeholderTextColor={GLOBAL.COLOR.PLACEHOLDER_TEXT}
                            style={styles.inputStyle}
                            onChangeText={text => this.setState({ confirm_password: text })}
                            secureTextEntry={true}
                        >
                        </TextInput>
                        <TouchableOpacity style={styles.full} onPress={()=> this.resetPassword()}>
                            <Text style={styles.loginBtn}>Reset Password</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </ScrollView>
        );
    }
}
export default ResetPassword;