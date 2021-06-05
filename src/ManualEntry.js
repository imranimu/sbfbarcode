import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground,ActivityIndicator } from 'react-native';
import CardView from 'react-native-cardview'
import NumericInput from 'react-native-numeric-input'
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-community/async-storage";
import styles from './BarStyle.js'
import GLOBAL from "./Global/Global.js";
const banns = require("@Asset/images/banns.png");

export default class BarItem extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          quantity:1,
          toolId:null,
          tool_data_id:null,
          tool_name:'',
          tool_price:0,
          userid:null,
          isFreshScan:false,
        };
      }

      checkQuantity = () => {
          console.log("Quantity is: ",this.state.quantity)
      }

      componentWillMount(){
        // console.log('Tool Id: ',this.props.navigation.state.params.toolId);
        // console.log('Tool Data Id: ',this.props.navigation.state.params.tool_data_id);
        // console.log('Tool Name: ',this.props.navigation.state.params.tool_name);
        // console.log('Tool Price: ',this.props.navigation.state.params.tool_price);

        this.setState({
          isFreshScan:true,
            // toolId:this.props.navigation.state.params.toolId,
            // tool_data_id:this.props.navigation.state.params.tool_data_id,
            // tool_name:this.props.navigation.state.params.tool_name,
            // tool_price:this.props.navigation.state.params.tool_price
        })
      }

      async getKey() {
        try {
            const userDetails= JSON.parse(await AsyncStorage.getItem('userInfo'));
            
            console.log('User Details: '+JSON.stringify(userDetails))
            this.setState({
                userid:userDetails.user.id,
            });
            
        }
        catch (error) {
          console.log("Error retrieving data" + error);
        }
            }

            componentDidMount(){
                //this.getKey();
            }

        addToCart = async () => {
        var userid = JSON.parse(await AsyncStorage.getItem('userid'));
        NetInfo.isConnected.fetch().then(isConnected => {
          "*********Network status " + (isConnected ? "online" : "offline");

          if (isConnected) {
            this.setState({
              isLoading: true
            });
    
            fetch(GLOBAL.add_to_cart(userid), {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
    
              body: JSON.stringify({
                product_id: this.state.tool_data_id,
                product_qty: this.state.quantity,
              })
            })
              .then(response => response.json())
              .then(responseData => {
                this.setState({
                  isLoading: false
                });
                console.log("AddToCart response:", responseData);
    
                if (responseData.result.status === 'Valid') {
                    
                  alert(responseData.result.message);
                  this.setState({
                    isFreshScan:false,
                  });
                   
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
                <ImageBackground source={banns} style={{ resizeMode: 'contain', height: '100%', width: '100%', }}>
                    
                {this.state.isLoading &&
    <View style={styles.loading}>
      <ActivityIndicator 
      color={GLOBAL.COLOR.THEME_ORANGE}
      size='large' />
    </View>
}
                    
                    <View style={{ flex:1,paddingHorizontal: 15}}>

                    {this.state.isFreshScan ? (
                      <View style={{flex:1}}>
                  <Text style={styles.myOrder}>Items Details</Text>
                  <CardView
                      cardElevation={5}
                      cardMaxElevation={5}
                      cornerRadius={5}
                      style={{ marginBottom: 10 }}
                  >
                      <View style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
                          <Text style={styles.dtl}>{'SKU NO.'+' '+this.state.toolId}</Text>
                          <Text style={styles.dtl}>{'Item name:'+' '+ this.state.tool_name}</Text>
                          {this.state.tool_price !== 0 ? (
              <Text style={styles.dtl}>{'Item Price:'+' '+ this.state.tool_price}</Text>
            ) : (
              <Text style={styles.dtl}>{'Item Price:'+' '+ 'Not Specified'}</Text>
            )}
            
  {/*<Text style={styles.dtl}>Name : Pliers</Text>*/}
                          <View style={[styles.row,{marginTop:10}]}>
                              <Text style={styles.dtl}>Quantity </Text>
                              <NumericInput
                                  value={this.state.quantity}
                                  onChange={value => this.setState({ quantity: value })}
                                  onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                                  totalWidth={100}
                                  totalHeight={30}
                                  iconSize={18}
                                  minValue={1}
                                  maxValue={50}
                                  step={1}
                                  valueType='real'
                                  rounded
                                  textColor={GLOBAL.COLOR.BLACK}
                                  containerStyle={{marginLeft:10}}
                                  iconStyle={{ color: 'white', }}
                                  rightButtonBackgroundColor={GLOBAL.COLOR.BLACK}
                                  leftButtonBackgroundColor={GLOBAL.COLOR.BLACK} />
                          </View>
                          <View style={[styles.row, { marginTop: 15, marginBottom: 10 }]}>
                              <TouchableOpacity
                                  style={styles.itemBtn}
                                  onPress={this.addToCart}
                              >
                                  <Text style={styles.addItem}>Add to Cart </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                  style={styles.itemBtn}
                                  onPress={() => this.props.navigation.navigate('BarScreen')}
                              >
                                  <Text style={styles.canItem}>Cancel</Text>
                              </TouchableOpacity>
                          </View>
                      </View>
                  </CardView>
                </View>
            ) : (
              <View />
            )}
                        <View style={{flex:1,justifyContent:'center',}}>

                        <TouchableOpacity style={{width:'100%',marginTop:15}} 
                                onPress={()=> this.props.navigation.navigate('MyCart')}>
                            <Text style={styles.proceedToCheckout}>Show Cart</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{width:'100%',marginTop:15}} 
                                onPress={()=> this.props.navigation.navigate('BarScreen')}>
                            <Text style={styles.proceedToCheckout}>Add more items</Text>
                        </TouchableOpacity>

                        </View>

                    </View>
                </ImageBackground>
            </ScrollView>
        );
    }
}