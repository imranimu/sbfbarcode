import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ImageBackground,ActivityIndicator,Alert } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-community/async-storage";
import styles from './BarStyle.js'
import { TextInput } from 'react-native-gesture-handler';
import GLOBAL from './Global/Global.js'

const banns = require("@Asset/images/banns.png");

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            organisation_name:'',
            person_name:'',
            email:'',
            phone:'',
            address:'',
            city:'',
            address_state:'',
            postcode:'',
            notes:'',
          isLoading: false,
        };
      }

      async registerUser() {
        NetInfo.fetch().then(state => {
          // console.log("Connection type", state.type);
          // console.log("Is connected?", state.isConnected);
        
        if(state.isConnected) {
            if (this.state.organisation_name === "") {
              alert("Please enter an organisation name!")
              return;
            }
            if (this.state.person_name === "") {
                alert("Please enter contact person name!")
              return;
            }
            if (this.state.email === "") {
                alert("Please enter a valid email address!")
              return;
            }
            if (this.state.phone === "") {
                alert("Please enter a valid phone number!")
              return;
            }
    
            this.setState({
              isLoading: true
            });
    
            fetch(GLOBAL.register_user, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
    
              body: JSON.stringify({
                organisation_name:this.state.organisation_name,
                name:this.state.person_name,
                email:this.state.email,
                phone:this.state.phone,
                address:this.state.address,
                city:this.state.city,
                state:this.state.address_state,
                postal_code:this.state.postcode,
                notes:this.state.notes,
              })
            })
              .then(response => response.json())
              .then(responseData => {
                this.setState({
                  isLoading: false
                });
                console.log("Register response:", responseData);
    
                if (responseData.result.status === 'Valid') {
                  Alert.alert(
                    'Confirmation',
                    responseData.result.message,
                    [
                      {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
                    ],
                    {cancelable: false},
                  );
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
                    <View style={{ paddingHorizontal: 15 }}>
                        <Text style={styles.regTitle}>Register Your Profile </Text>
                        <Text style={styles.regdes}> After approval of your user profile by admin, you will be able to scan barcodes and place orders via SBF app </Text>
                        <TextInput
                            placeholder='Organisation Name *'
                            placeholderTextColor={GLOBAL.COLOR.WHITE}
                            style={styles.inputStyle}
                            value={this.state.organisation_name}
                            onChangeText={text => this.setState({ organisation_name: text })}
                        >
                        </TextInput>
                        <TextInput
                            placeholder='Contact Person Name *'
                            placeholderTextColor={GLOBAL.COLOR.WHITE}
                            style={styles.inputStyle}
                            value={this.state.person_name}
                            onChangeText={text => this.setState({ person_name: text })}
                        >
                        </TextInput>
                        <TextInput
                            placeholder='Email *'
                            placeholderTextColor={GLOBAL.COLOR.WHITE}
                            style={styles.inputStyle}
                            value={this.state.email}
                            onChangeText={text => this.setState({ email: text })}
                        >
                        </TextInput>
                        <TextInput
                            placeholder='Phone *'
                            placeholderTextColor={GLOBAL.COLOR.WHITE}
                            style={styles.inputStyle}
                            value={this.state.phone}
                            onChangeText={text => this.setState({ phone: text })}
                        >
                        </TextInput>
                        <TextInput
                            placeholder='Address'
                            placeholderTextColor={GLOBAL.COLOR.WHITE}
                            style={styles.inputStyle}
                            value={this.state.address}
                            onChangeText={text => this.setState({ address: text })}
                        >
                        </TextInput>
                        <TextInput
                            placeholder='City'
                            placeholderTextColor={GLOBAL.COLOR.WHITE}
                            style={styles.inputStyle}
                            value={this.state.city}
                            onChangeText={text => this.setState({ city: text })}
                        >
                        </TextInput>
                        <TextInput
                            placeholder='State'
                            placeholderTextColor={GLOBAL.COLOR.WHITE}
                            style={styles.inputStyle}
                            value={this.state.address_state}
                            onChangeText={text => this.setState({ address_state: text })}
                        >
                        </TextInput>
                        <TextInput
                            placeholder='Postal Code'
                            placeholderTextColor={GLOBAL.COLOR.WHITE}
                            style={styles.inputStyle}
                            value={this.state.postcode}
                            onChangeText={text => this.setState({ postcode: text })}
                        >
                        </TextInput>
                        <TextInput
                            placeholder='Notes'
                            placeholderTextColor={GLOBAL.COLOR.WHITE}
                            multiline={true}
                            numberOfLines={4}
                            style={styles.inputStyle1}
                            value={this.state.notes}
                            onChangeText={text => this.setState({ notes: text })}
                        >
                        </TextInput>
                        <TouchableOpacity style={styles.full} onPress={()=> this.registerUser()}>
                            <Text style={styles.loginBtn}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </ScrollView>
        );
    }
}