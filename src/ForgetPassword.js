import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, ImageBackground,Alert,ActivityIndicator } from 'react-native';
import styles from './BarStyle.js'
import { TextInput } from 'react-native-gesture-handler';
import NetInfo from "@react-native-community/netinfo";
import GLOBAL from "./Global/Global.js";
const banns = require("@Asset/images/banns.png");
const logo = require("@Asset/images/logo.png");
import { StackActions, NavigationActions } from "react-navigation";


class ForgetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email:"",
          isLoading: false,
        };
      }

       forgetPassword() {
        NetInfo.fetch().then(state => {
        
          if(state.isConnected) {
            if (this.state.email === "") {
              alert("Please enter a valid email")
              return;
            }
    
            this.setState({
              isLoading: true
            });

            console.log("Link is: ",GLOBAL.forget_password)
    
            fetch(GLOBAL.forget_password, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
    
              body: JSON.stringify({
                email:this.state.email, 
              })
            })
              .then(response => response.json())
              .then(responseData => {
                this.setState({
                  isLoading: false
                });
                console.log("Forget Password:", responseData);
    
                if (responseData.status === 'Valid') {
                    
                    alert(responseData.message);
                    this.navigateToNewUser();
                    
                }
                  else {
                  alert(responseData.message);
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
                            placeholder='Enter Email'
                            placeholderTextColor={GLOBAL.COLOR.PLACEHOLDER_TEXT}
                            style={styles.inputStyle}
                            autoCapitalize = 'none'
                            keyboardType={"email-address"}
                            onChangeText={text => this.setState({ email: text })}
                        >
                        </TextInput>
                        
                        <TouchableOpacity style={styles.full} onPress={()=> this.forgetPassword()}>
                            <Text style={styles.loginBtn}>Forget Password</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </ScrollView>
        );
    }
}
export default ForgetPassword;