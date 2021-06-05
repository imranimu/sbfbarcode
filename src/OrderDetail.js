import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ImageBackground,SectionList,FlatList,Alert } from 'react-native';
import styles from './BarStyle.js'
import CardView from 'react-native-cardview'
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-community/async-storage";
import GLOBAL from "./Global/Global.js";
const banns = require("@Asset/images/banns.png");
//const tempData = [{"id":6,"order_no":"TX1565175337","purchase_no":"6890","notes":"My Order","email":"satwantbambra@gmail.com","customer_name":"satwant","total":null,"status":"Pending","created_at":"07 Aug 2019","data":[{"id":10,"order_id":"6","product_id":"9909319002389","product_qty":"1","product_price":null,"product_total":null,"created_at":"2019-08-07 05:54:53","updated_at":"2019-08-07 05:54:53"},{"id":11,"order_id":"6","product_id":"005597","product_qty":"2","product_price":null,"product_total":null,"created_at":"2019-08-07 03:45:09","updated_at":"2019-08-07 10:45:09"},{"id":12,"order_id":"6","product_id":"00381322","product_qty":"6","product_price":null,"product_total":null,"created_at":"2019-08-07 03:44:03","updated_at":"2019-08-07 10:44:03"},{"id":13,"order_id":"6","product_id":"M2189821","product_qty":"12","product_price":null,"product_total":null,"created_at":"2019-08-07 10:42:34","updated_at":"2019-08-07 10:42:34"},{"id":14,"order_id":"6","product_id":"8902519002389","product_qty":"1","product_price":null,"product_total":null,"created_at":"2019-08-07 10:46:01","updated_at":"2019-08-07 10:46:01"}]},{"id":6,"order_no":"TX1565175337","purchase_no":"6890","notes":"My Order","email":"satwantbambra@gmail.com","customer_name":"satwant","total":null,"status":"Pending","created_at":"07 Aug 2019","data":[{"id":10,"order_id":"6","product_id":"9909319002389","product_qty":"1","product_price":null,"product_total":null,"created_at":"2019-08-07 05:54:53","updated_at":"2019-08-07 05:54:53"},{"id":11,"order_id":"6","product_id":"005597","product_qty":"2","product_price":null,"product_total":null,"created_at":"2019-08-07 03:45:09","updated_at":"2019-08-07 10:45:09"},{"id":12,"order_id":"6","product_id":"00381322","product_qty":"6","product_price":null,"product_total":null,"created_at":"2019-08-07 03:44:03","updated_at":"2019-08-07 10:44:03"},{"id":13,"order_id":"6","product_id":"M2189821","product_qty":"12","product_price":null,"product_total":null,"created_at":"2019-08-07 10:42:34","updated_at":"2019-08-07 10:42:34"},{"id":14,"order_id":"6","product_id":"8902519002389","product_qty":"1","product_price":null,"product_total":null,"created_at":"2019-08-07 10:46:01","updated_at":"2019-08-07 10:46:01"}]},{"id":6,"order_no":"TX1565175337","purchase_no":"6890","notes":"My Order","email":"satwantbambra@gmail.com","customer_name":"satwant","total":null,"status":"Pending","created_at":"07 Aug 2019","data":[{"id":10,"order_id":"6","product_id":"9909319002389","product_qty":"1","product_price":null,"product_total":null,"created_at":"2019-08-07 05:54:53","updated_at":"2019-08-07 05:54:53"},{"id":11,"order_id":"6","product_id":"005597","product_qty":"2","product_price":null,"product_total":null,"created_at":"2019-08-07 03:45:09","updated_at":"2019-08-07 10:45:09"},{"id":12,"order_id":"6","product_id":"00381322","product_qty":"6","product_price":null,"product_total":null,"created_at":"2019-08-07 03:44:03","updated_at":"2019-08-07 10:44:03"},{"id":13,"order_id":"6","product_id":"M2189821","product_qty":"12","product_price":null,"product_total":null,"created_at":"2019-08-07 10:42:34","updated_at":"2019-08-07 10:42:34"},{"id":14,"order_id":"6","product_id":"8902519002389","product_qty":"1","product_price":null,"product_total":null,"created_at":"2019-08-07 10:46:01","updated_at":"2019-08-07 10:46:01"}]},{"id":6,"order_no":"TX1565175337","purchase_no":"6890","notes":"My Order","email":"satwantbambra@gmail.com","customer_name":"satwant","total":null,"status":"Pending","created_at":"07 Aug 2019","data":[{"id":10,"order_id":"6","product_id":"9909319002389","product_qty":"1","product_price":null,"product_total":null,"created_at":"2019-08-07 05:54:53","updated_at":"2019-08-07 05:54:53"},{"id":11,"order_id":"6","product_id":"005597","product_qty":"2","product_price":null,"product_total":null,"created_at":"2019-08-07 03:45:09","updated_at":"2019-08-07 10:45:09"},{"id":12,"order_id":"6","product_id":"00381322","product_qty":"6","product_price":null,"product_total":null,"created_at":"2019-08-07 03:44:03","updated_at":"2019-08-07 10:44:03"},{"id":13,"order_id":"6","product_id":"M2189821","product_qty":"12","product_price":null,"product_total":null,"created_at":"2019-08-07 10:42:34","updated_at":"2019-08-07 10:42:34"},{"id":14,"order_id":"6","product_id":"8902519002389","product_qty":"1","product_price":null,"product_total":null,"created_at":"2019-08-07 10:46:01","updated_at":"2019-08-07 10:46:01"}]},{"id":6,"order_no":"TX1565175337","purchase_no":"6890","notes":"My Order","email":"satwantbambra@gmail.com","customer_name":"satwant","total":null,"status":"Pending","created_at":"07 Aug 2019","data":[{"id":10,"order_id":"6","product_id":"9909319002389","product_qty":"1","product_price":null,"product_total":null,"created_at":"2019-08-07 05:54:53","updated_at":"2019-08-07 05:54:53"},{"id":11,"order_id":"6","product_id":"005597","product_qty":"2","product_price":null,"product_total":null,"created_at":"2019-08-07 03:45:09","updated_at":"2019-08-07 10:45:09"},{"id":12,"order_id":"6","product_id":"00381322","product_qty":"6","product_price":null,"product_total":null,"created_at":"2019-08-07 03:44:03","updated_at":"2019-08-07 10:44:03"},{"id":13,"order_id":"6","product_id":"M2189821","product_qty":"12","product_price":null,"product_total":null,"created_at":"2019-08-07 10:42:34","updated_at":"2019-08-07 10:42:34"},{"id":14,"order_id":"6","product_id":"8902519002389","product_qty":"1","product_price":null,"product_total":null,"created_at":"2019-08-07 10:46:01","updated_at":"2019-08-07 10:46:01"}]},{"id":6,"order_no":"TX1565175337","purchase_no":"6890","notes":"My Order","email":"satwantbambra@gmail.com","customer_name":"satwant","total":null,"status":"Pending","created_at":"07 Aug 2019","data":[{"id":10,"order_id":"6","product_id":"9909319002389","product_qty":"1","product_price":null,"product_total":null,"created_at":"2019-08-07 05:54:53","updated_at":"2019-08-07 05:54:53"},{"id":11,"order_id":"6","product_id":"005597","product_qty":"2","product_price":null,"product_total":null,"created_at":"2019-08-07 03:45:09","updated_at":"2019-08-07 10:45:09"},{"id":12,"order_id":"6","product_id":"00381322","product_qty":"6","product_price":null,"product_total":null,"created_at":"2019-08-07 03:44:03","updated_at":"2019-08-07 10:44:03"},{"id":13,"order_id":"6","product_id":"M2189821","product_qty":"12","product_price":null,"product_total":null,"created_at":"2019-08-07 10:42:34","updated_at":"2019-08-07 10:42:34"},{"id":14,"order_id":"6","product_id":"8902519002389","product_qty":"1","product_price":null,"product_total":null,"created_at":"2019-08-07 10:46:01","updated_at":"2019-08-07 10:46:01"}]},{"id":6,"order_no":"TX1565175337","purchase_no":"6890","notes":"My Order","email":"satwantbambra@gmail.com","customer_name":"satwant","total":null,"status":"Pending","created_at":"07 Aug 2019","data":[{"id":10,"order_id":"6","product_id":"9909319002389","product_qty":"1","product_price":null,"product_total":null,"created_at":"2019-08-07 05:54:53","updated_at":"2019-08-07 05:54:53"},{"id":11,"order_id":"6","product_id":"005597","product_qty":"2","product_price":null,"product_total":null,"created_at":"2019-08-07 03:45:09","updated_at":"2019-08-07 10:45:09"},{"id":12,"order_id":"6","product_id":"00381322","product_qty":"6","product_price":null,"product_total":null,"created_at":"2019-08-07 03:44:03","updated_at":"2019-08-07 10:44:03"},{"id":13,"order_id":"6","product_id":"M2189821","product_qty":"12","product_price":null,"product_total":null,"created_at":"2019-08-07 10:42:34","updated_at":"2019-08-07 10:42:34"},{"id":14,"order_id":"6","product_id":"8902519002389","product_qty":"1","product_price":null,"product_total":null,"created_at":"2019-08-07 10:46:01","updated_at":"2019-08-07 10:46:01"}]}]

export default class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoading: false,
          orderData:[],
        };
      }

      componentDidMount(){
          this.fetchOrders();
      }

      async fetchOrders() {
        var userid = JSON.parse(await AsyncStorage.getItem('userid'));
          console.log("Order Url: ",GLOBAL.get_my_orders(userid))
        return fetch(GLOBAL.get_my_orders(userid), {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        })
          .then(response => response.json())
          .then(responseJson => {
            try {
              console.log("My Orders: " + JSON.stringify(responseJson));
    
              if (responseJson.result.status === 'Valid') {
                if(responseJson.result.resultarray && responseJson.result.resultarray.length){
                  this.setState({
                    orderData: responseJson.result.resultarray || []
                  });
                }else{
                    alert("No order history available!")
                }
                
              }
              else{
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

      orderItem = ({ item, index }) => {
        return (
            <CardView
            cardElevation={5}
            cardMaxElevation={5}
            cornerRadius={5}
            style={{marginTop:5}}
        >
            <View style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
            <Text style={styles.orderText}>{'Order number :'+' '+item.order_no}</Text>
                <Text style={styles.orderText}>{'Order Date:'+' '+item.created_at }</Text>
                <Text style={styles.orderText}>{'Purchase Order:'+' '+item.purchase_no}</Text>
                <Text style={styles.orderText}>{'Notes :'+' '+item.notes  }</Text>

                <View style={{width:'100%',height:200,padding:5,borderWidth: 2, borderColor: GLOBAL.COLOR.BLACK,borderRadius: 5,}}>
                        <FlatList
            data={item.order_item}
            renderItem={this.orderSubItem}
            extraData={this.state}
            keyExtractor={item => String(item.id)}
          />
          </View>
                <Text style={styles.approved}> {'Status :'+' '+item.status}</Text>
              
            </View>
        </CardView>
        )
      };

      orderSubItem = ({ item, index }) => {
        return (
          <View>
                <Text style={styles.dtl}>{'SKU NO.'+' '+item.product_id}</Text>
                <Text style={styles.dtl}>{'Quantity :'+' '+item.product_qty}</Text>
                </View>
        )
      };

      renderItem = ({item}) => {

        console.log("CHECK ONE: ",JSON.stringify(item));
        return (
          <View style={{flex:1}}>
          <View style={{flexDirection:'row',paddingHorizontal:10,backgroundColor:GLOBAL.COLOR.WHITE_GRAY,justifyContent:'space-between',}}>
                <Text style={styles.rowItem}>{item.products.sku}</Text>
                <Text style={styles.rowItem} numberOfLines={1}>{item.products.name}</Text>
                {item.product_price !== '0' ? (
              <Text style={styles.rowItem}>{item.product_total}</Text>
            ) : (
              <Text style={styles.rowItem}>{'NA'}</Text>
            )}
                {item.loose == 'Yes' ? (
                  <Text style={styles.rowItem}>{item.product_qty+' LU'}</Text>
                ):(
                  <Text style={styles.rowItem}>{item.product_qty+' FP'}</Text>
                )}
                
                </View>

                {item.notes !== null ? (
                  <View style={{backgroundColor:GLOBAL.COLOR.WHITE_GRAY}}>
                  <Text style={styles.adminNotes}>{'*'+' '+item.notes}</Text>
                  </View>
            ) : (
              <View />
            )}
                </View>
        
        )
      }
    
      renderSectionHeader = ({section}) => {
        return (

<CardView
cardElevation={5}
cardMaxElevation={5}
style={{marginTop:5}}>
<View style={{ paddingHorizontal: 10, paddingVertical: 5,backgroundColor:GLOBAL.COLOR.WHITE_GRAY,alignItems:'center',justifyContent:'center'}}>
    
    <Text style={styles.orderNumber}>{'Order number :'+' '+section.order_no}</Text>
    <Text style={styles.orderText}>{'Date:'+' '+section.created_at }</Text>
    <Text style={styles.orderText}>{'Purchase Order:'+' '+section.purchase_no}</Text>
    <Text style={styles.orderText}>{'Notes :'+' '+section.notes  }</Text>
    <Text style={styles.orderText}>{'Amount Payable :'+' '+'$'+section.total  }</Text>

    <Text style={styles.approved}> {'Status :'+' '+section.status}</Text>

    <View style={{width:'100%',flexDirection:'row',paddingHorizontal:2,justifyContent:'space-between',}}>
                <Text style={styles.rowTitle}>{'SKU NO.'}</Text>
                <Text style={styles.rowTitle}>{'Name'}</Text>
                <Text style={styles.rowTitle}>{'Amount'}</Text>
                <Text style={styles.rowTitle}>{'Quantity'}</Text>
                </View>
</View>
</CardView>
        )
      }
    

    render() {
        return (
            
                <ImageBackground source={banns} style={{ resizeMode: 'contain', height: '100%', width: '100%', }}>
                    <View style={{paddingHorizontal:15}}>
                        <Text style={styles.myOrder}>My Orders</Text>

                        <Text style={styles.des}> {'LU: Loose Units      FP: Full Product'}</Text>

                        <View style={{height:'70%',width:'100%',padding:10,borderWidth: 2, borderColor: GLOBAL.COLOR.WHITE,borderRadius: 5}}>
                        
                        <SectionList
        style={{flex:1}}
        sections={this.state.orderData}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        keyExtractor={item => String(item.id)}
      />
                        
                        {/*<FlatList
                        renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}
            data={this.state.orderData}
            renderItem={this.orderItem}
            extraData={this.state}
            keyExtractor={item => String(item.id)}
                        />*/}
          </View>

          <TouchableOpacity style={{width:'100%',marginTop:15}} 
                                onPress={()=> this.props.navigation.navigate('BarProceed')}>
                            <Text style={styles.proceedToCheckout}>Go To Home</Text>
                        </TouchableOpacity>
                        
                    </View>
                </ImageBackground>
            
        );
    }
}