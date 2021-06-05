import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './BarStyle.js'
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { FloatingAction } from "react-native-floating-action";
import GLOBAL from './Global/Global'

const banns = require("@Asset/images/banns.png");
const actions = [
  {
    text: "Reset Password",
    icon: require("@Asset/images/reset_Password.png"),
    name: "bt_reset",
    tintColor: GLOBAL.COLOR.THEME_ORANGE,
    color: GLOBAL.COLOR.WHITE,
    textColor: GLOBAL.COLOR.THEME_ORANGE,
    position: 1
  },
  {
    text: "Order History",
    icon: require("@Asset/images/orders.png"),
    name: "bt_orders",
    tintColor: GLOBAL.COLOR.THEME_ORANGE,
    color: GLOBAL.COLOR.WHITE,
    textColor: GLOBAL.COLOR.THEME_ORANGE,
    position: 2
  },
  {
    text: "Cart",
    icon: require("@Asset/images/shopping_cart.png"),
    name: "bt_cart",
    tintColor: GLOBAL.COLOR.THEME_ORANGE,
    color: GLOBAL.COLOR.WHITE,
    textColor: GLOBAL.COLOR.THEME_ORANGE,
    position: 3
  },
];

export default class BarProceed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_name: "",
      purchase_order: "",
      notes: "",
    };

  }

  async getKey() {
    try {
      const userDetails = JSON.parse(await AsyncStorage.getItem('userInfo'));

      console.log('User Details: ' + JSON.stringify(userDetails))
      this.setState({
        customer_name: userDetails.user.name,
      });

    }
    catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  //componentWillMount(){

  // }

  componentDidMount() {
    this.getKey();
  }

  async proceedToScan() {
    if (this.state.customer_name === "") {
      alert("Please enter a name")
      return;
    } else if (this.state.purchase_order === "") {
      alert("Please enter purchase order number")
      return;
    } else {
      AsyncStorage.setItem(
        "purchase_order", JSON.stringify(this.state.purchase_order));

      if (this.state.notes === "") {
        AsyncStorage.setItem(
          "notes", JSON.stringify('Order Placed'));
      } else {
        AsyncStorage.setItem(
          "notes", JSON.stringify(this.state.notes));
      }

      this.props.navigation.navigate('BarScreen')

    }
  }

  buttonPressed() {

  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, }}
        scrollEnabled>
        <ImageBackground source={banns} style={{ resizeMode: 'contain', height: '100%', width: '100%' }}>
          <View style={{ marginTop: 15, alignItems: 'center', flex: 1, paddingHorizontal: 15 }}>
            <Text style={styles.homeTitle}> Order Information </Text>
            <Text style={styles.des}> Please fill the required details below and scan barcode from the part to place order for any tool from Toolfix. Use valid purchase order number</Text>
            <TextInput
              placeholder='Name'
              placeholderTextColor={GLOBAL.COLOR.PLACEHOLDER_TEXT}
              value={this.state.customer_name}
              style={styles.inputStyle}
              onChangeText={text => this.setState({ customer_name: text })}
            >
            </TextInput>
            <TextInput
              placeholder='Purchase Order Number'
              placeholderTextColor={GLOBAL.COLOR.PLACEHOLDER_TEXT}
              style={styles.inputStyle}
              onChangeText={text => this.setState({ purchase_order: text })}
            >
            </TextInput>
            <TextInput
              placeholder='Notes'
              placeholderTextColor={GLOBAL.COLOR.PLACEHOLDER_TEXT}
              multiline={true}
              numberOfLines={5}
              style={styles.inputStyle1}
              onChangeText={text => this.setState({ notes: text })}
            ></TextInput>

            <TouchableOpacity style={[styles.full, { marginTop: 20 }]} onPress={() => this.proceedToScan()}>
              <Text style={styles.loginBtn}>Proceed</Text>
            </TouchableOpacity>
            {/*<TouchableOpacity style={styles.full} onPress={()=> this.props.navigation.navigate('OrderDetail')}>
                            <Text style={styles.loginBtn}>Show My Orders</Text>
        </TouchableOpacity>*/}

            <FloatingAction
              actions={actions}
              color={GLOBAL.COLOR.THEME_GREEN}
              onPressItem={name => {
                if (name === 'bt_orders') {
                  this.props.navigation.navigate('OrderDetail')
                } else if (name === 'bt_reset') {
                  this.props.navigation.navigate('ResetPassword')
                } else {
                  this.props.navigation.navigate('MyCart')
                }
              }}
            />
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}