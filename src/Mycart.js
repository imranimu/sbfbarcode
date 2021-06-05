import React, { Component } from 'react';
import { Text, View, Image, FlatList, ScrollView, TouchableOpacity, ImageBackground,ActivityIndicator,Alert} from 'react-native';
import styles from './BarStyle.js'
import CardView from 'react-native-cardview'
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-community/async-storage";
import { TextInput } from 'react-native-gesture-handler';
import GLOBAL from "./Global/Global.js";

const del = require("@Asset/images/del.png");
const banns = require("@Asset/images/banns.png");

export default class MyCart extends Component {

    constructor(props) {
        super(props);
        this.state = {
          userid:null,
          orderid:null,
          userName:'',
          orderNumber:'',
          amount:null,
          notes:'',
          isLoading: false,
          cartData:[],
          enableScrollViewScroll: true,
          canAddMore:false,
        };
       
      }

      async getKey() {
        try {
            const userDetails= JSON.parse(await AsyncStorage.getItem('userInfo'));
            var orderNumber = JSON.parse(await AsyncStorage.getItem('purchase_order'));
            var notes = JSON.parse(await AsyncStorage.getItem('notes'));
            console.log('User Details: '+JSON.stringify(userDetails))
            this.setState({
                userid:userDetails.user.id,
                userName:userDetails.user.name,
                orderNumber:orderNumber,
                notes:notes,
            });
            
        }
        catch (error) {
          console.log("Error retrieving data" + error);
        }
            }

            componentDidMount(){
              this.getKey()
                this.fetchCart();
            }

      async fetchCart() {
        var userid = JSON.parse(await AsyncStorage.getItem('userid'));
    
        return fetch(GLOBAL.get_cart(userid), {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        })
          .then(response => response.json())
          .then(responseJson => {
            try {
              console.log("Cart Items: " + JSON.stringify(responseJson));
    
              if (responseJson.result.status === 'Valid') {
                if(responseJson.result.resultarray && responseJson.result.resultarray.length){
                  this.setState({
                    canAddMore:true,
                    orderid:responseJson.result.order_id,
                    amount:responseJson.result.total,
                  cartData: responseJson.result.resultarray || []
                });
                }
                else{
                  this.setState({
                    canAddMore:false,
                  cartData:[]
                })
                    alert("There are no items in the cart!")

                }
                
              }else{
                alert(responseJson.result.message)
              }
            } catch ({ e }) {
              console.log("Exception: ", e);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }

      cartItem = ({ item, index }) => {
        return (
            <CardView
            cardElevation={5}
            cardMaxElevation={5}
            cornerRadius={5}
            style={{marginBottom:10}}
        >
            <View style={{flexDirection:'row',paddingHorizontal: 10, paddingVertical: 10 }}>
                <View style={{width:'80%'}}>
            <Text style={styles.itemText}>{'SKU NO.'+' '+ item.sku}</Text>
            <Text style={styles.itemText}>{'Item name:'+' '+ item.name}</Text>
            {item.product_price !== '0' ? (
              <Text style={styles.itemText}>{'Item Amount:'+' '+'$'+item.product_total}</Text>
            ) : (
              <Text style={styles.itemText}>{'Item Amount:'+' '+ 'Not Specified'}</Text>
            )}
                
                {item.loose == 'Yes' ? (
                  <Text style={styles.itemText}>{'Unit Quantity :'+' '+ item.product_qty}</Text>
                ):(
                  <Text style={styles.itemText}>{'Product Quantity :'+' '+ item.product_qty}</Text>
                )}
                

                </View>

                <View style={{width:'20%',justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity style={{height:40,width:40,justifyContent:'center',alignItems:'center'}} onPress={() => this.delCartItem(item.id)}>
                    <Image source={del} style={{height:25,width:25,resizeMode: 'contain'}} />
                    </TouchableOpacity>
                
                </View>
            </View>
        </CardView>
        );
      };

      delCartItem(item_id) {
        return fetch(GLOBAL.remove_item(item_id), {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        })
          .then(response => response.json())
          .then(responseJson => {
            try {
              console.log("Delete Item" + JSON.stringify(responseJson));
              if (responseJson.result.status === 'Valid') {
                this.fetchCart();
              }
              
            } catch ({ e }) {
              console.log("Exception: ", e);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }

      placeOrder = () =>{
        NetInfo.fetch().then(state => {
        
          if(state.isConnected) {
              if (this.state.userName === "") {
                alert("Please enter a valid customer name")
                return;
              }
              if (this.state.orderNumber === "") {
                  alert("Please enter a valid order number")
                return;
              }
              if (this.state.notes === "") {
                alert("Please enter notes")
              return;
            }
      
              this.setState({
                isLoading: true
              });
      
              fetch(GLOBAL.confirm_order(this.state.userid,this.state.orderid), {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
      
                body: JSON.stringify({
                    customer_name:this.state.userName, 
                    purchase_order_number:this.state.orderNumber, 
                    notes:this.state.notes,
                })
              })
                .then(response => response.json())
                .then(responseData => {
                  this.setState({
                    isLoading: false
                  });
                  console.log("Order response:", responseData);
      
                  if (responseData.result.status === 'Valid') {
                    alert(responseData.result.message);
                    this.props.navigation.navigate('OrderDetail')
                    
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

      placeOrderClick(){
          if(this.state.cartData && this.state.cartData.length){
            Alert.alert(
              'Confirmation',
              'Proceed to confirm this order?',
              [
                {text: 'YES', onPress: () => this.placeOrder()},
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            )
            
          }else{
            alert("There are no items in the cart!")
          }
      }



    

    render() {
        return (
          <View style={{flex:1}}
      onStartShouldSetResponderCapture={() => {
          this.setState({ enableScrollViewScroll: true });
      }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            scrollEnabled={this.state.enableScrollViewScroll}
            ref={myScroll => (this._myScroll = myScroll)}>
                <ImageBackground source={banns} style={{ flex:1,resizeMode: 'contain',flexGrow: 1 , height: '100%', width: '100%', }}>
                    
                {this.state.isLoading &&
    <View style={styles.loading}>
      <ActivityIndicator 
      color={GLOBAL.COLOR.THEME_ORANGE}
      size='large' />
    </View>
}
                    
                    <View style={{paddingHorizontal:15}}>

                    <View style={{marginTop:10}}>

                    <Text style={styles.cartTitle}>CART</Text>

                    <Text style={styles.des1}>{'Name:'+' '+this.state.userName}</Text>
                    <Text style={styles.des1}>{'Purchase Order:'+' '+this.state.orderNumber}</Text>
                    <Text style={styles.des1}>{'Notes:'+' '+this.state.notes}</Text>
                    <Text style={styles.des1}>{'Amount Payable:'+' '+'$'+this.state.amount}</Text>

                    {/*<TextInput
                            placeholder='Name'
                            placeholderTextColor={GLOBAL.COLOR.WHITE}
                            value={this.state.customer_name}
                            style={styles.orderInputStyle}
                            value={this.state.userName}
                            onChangeText={text => this.setState({ userName: text })}
                        >
                        </TextInput>
                        <TextInput
                            placeholder='Purchase Order Number'
                            placeholderTextColor={GLOBAL.COLOR.WHITE}
                            value={this.state.orderNumber}
                            style={styles.orderInputStyle}
                            onChangeText={text => this.setState({ orderNumber: text })}
                        > 
                        </TextInput>
                            <TextInput
                                placeholder='Notes'
                                placeholderTextColor={GLOBAL.COLOR.WHITE}
                                multiline={true}
                                numberOfLines={5}
                                value={this.state.notes}
                                style={styles.notesStyle}
                                onChangeText={text => this.setState({ notes: text })}
                    ></TextInput>*/}

                        <Text style={styles.cartItems}>Cart Items</Text>

                        </View>
                        <View style={{width:'100%',minHeight:350,padding:10,borderWidth: 2, borderColor: GLOBAL.COLOR.WHITE,borderRadius: 5}}
                        onStartShouldSetResponderCapture={() => {
                          this.setState({ enableScrollViewScroll: false });
                          if (this._myScroll.contentOffset === 0
                            && this.state.enableScrollViewScroll === false) {
                            this.setState({ enableScrollViewScroll: true });
                          }
                        }}>
                        <FlatList
            data={this.state.cartData}
            renderItem={this.cartItem}
            keyExtractor={item => String(item.id)}
          />
          </View>

<TouchableOpacity style={{width:'100%',marginTop:15}} 
onPress={()=> this.placeOrderClick()}>
                            <Text style={styles.proceedToCheckout}>Proceed to checkout</Text>
                        </TouchableOpacity>

                        {this.state.canAddMore ? (
              <TouchableOpacity style={{width:'60%',marginTop:15,alignSelf:'center'}} 
              onPress={()=> this.props.navigation.navigate('BarScreen')}>
                <Text style={styles.addMoreItems}>Add more items</Text>
            </TouchableOpacity>
            ) : (
              <View />
            )}

                    </View>
                </ImageBackground>
                </ScrollView>
                </View>
        );
    }
}