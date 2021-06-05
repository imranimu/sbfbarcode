import React, { Component } from 'react'
import {
    View,
    Image,
    SafeAreaView,
    TextInput,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Text
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import GLOBAL from './Global/Global'
import styles_page from './BarStyle.js'
const banns = require("@Asset/images/banns.png");
import RadioForm from 'react-native-simple-radio-button';

var entry_props = [
    { label: 'Buy Complete Product', value: 0 },
    { label: 'Buy Loose Units', value: 1 }
];





export default class ServiceHistory extends Component {

    constructor(props) {
        super(props)
        this.state = {
            entry_type: 0,
            nominee_email: ""
            
            //   serviceName:'Home Alarms',
            //   serviceDate:'26-6-2020',
            //   address:'Brookvale, Australia',
            //   zipcode:'123456',
            //   city:'Brookvale',
            //   phone:'1234567890',
            //   emailId:'ranzeebohugun@gmail.com',
            //   message:'I would like to request for this service.'
        }
    }
    async componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            // this.onFocusFunction()
            // const getdata = await AsyncStorage.getItem('nominee_email')
            // console.log("#####" + getdata)
            // this.setState({
            //     nominee_email: getdata,
            // })

            this.StoreData();
        })

    }
    StoreData = async () => {
        let nominee_email = await AsyncStorage.getItem('nominee_email')
        // let apiurl = await AsyncStorage.getItem('apiurl')
        console.log(nominee_email)

        this.setState({ nominee_email: nominee_email})

        // console.log("i'm fform momineeee")

        // const AccessToken = this.state.token;

        // const apiUrl = this.state.apiurl + 'me?token=' + AccessToken;

        // if (AccessToken) {
        //     this.GetCustomerProfile(apiUrl)
        // }
    }

    // componentDidMount() {

    //     console.log("The Result: ", this.props.navigation.state.params.item)

    //     // const getdata = AsyncStorage.getItem('email')
    //     // console.log("#####" + getdata)

    // }

    addToCart() {

        var entry_type = this.state.entry_type

        this.props.navigation.navigate('BarItem', { item: this.props.navigation.state.params.item, type: entry_type })

    }

    render() {

        

        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1, }}
                scrollEnabled>

                <ImageBackground source={banns}
                    style={{ resizeMode: 'contain', height: '100%', width: '100%' }}>

                    <View style={{
                        flex: 1,
                        padding: 20
                    }}>
                        <Text style={styles_page.title}>Product Details </Text>

                        {/*<Text style={styles_page.des}> {'Some Products can be purchased in loose units.'}</Text>*/}
                        <View style={{ marginTop: 15, paddingBottom: 10, paddingLeft: 20 }}>

                            <Text style={{
                                marginTop: 10,
                                color: GLOBAL.COLOR.THEME_ORANGE,
                                fontSize: 14,
                                fontWeight: 'bold',
                                fontFamily: 'helvetica_neue_lts_td_light'
                            }}>
                                {'SKU'}
                            </Text>

                            <Text style={{
                                color: GLOBAL.COLOR.WHITE,
                                fontSize: 18,
                                fontFamily: 'robotomedium'
                            }}>
                                {this.props.navigation.state.params.item.sku}
                            </Text>

                        </View>
                        {/* <Text> {this.state.nominee_email}</Text> */}

                        <View style={{ marginTop: 15, paddingBottom: 10, paddingLeft: 20 }}>

                            <Text style={{
                                marginTop: 10,
                                color: GLOBAL.COLOR.THEME_ORANGE,
                                fontSize: 14,
                                fontWeight: 'bold',
                                fontFamily: 'helvetica_neue_lts_td_light'
                            }}>
                                {'Product Name'}
                            </Text>

                            <Text style={{
                                color: GLOBAL.COLOR.WHITE,
                                fontSize: 18,
                                fontFamily: 'robotomedium'
                            }}>
                                {this.props.navigation.state.params.item.name}
                                <Text style={{
                                    color: GLOBAL.COLOR.THEME_ORANGE,
                                    fontSize: 18,
                                    fontFamily: 'robotomedium'
                                }}>
                                    {' (' + this.props.navigation.state.params.item.units_value + ' units per pack)'}
                                </Text>
                            </Text>

                        </View>
                        <View style={{ marginTop: 15, paddingBottom: 10, paddingLeft: 20 }}>

                            <Text style={{
                                marginTop: 10,
                                color: GLOBAL.COLOR.THEME_ORANGE,
                                fontSize: 14,
                                fontWeight: 'bold',
                                fontFamily: 'helvetica_neue_lts_td_light'
                            }}>
                                {'Nominate Extra Email'}
                            </Text>

                            <Text style={{
                                color: GLOBAL.COLOR.WHITE,
                                fontSize: 18,
                                fontFamily: 'robotomedium'
                            }}>
                                {this.state.nominee_email}
                                <Text style={{
                                    color: GLOBAL.COLOR.THEME_ORANGE,
                                    fontSize: 18,
                                    fontFamily: 'robotomedium'
                                }}>
                            
                                </Text>
                            </Text>

                        </View>

                        {this.props.navigation.state.params.item.price !== this.props.navigation.state.params.item.discount_price ?
                            (
                                <View style={{ marginTop: 15, paddingBottom: 10, paddingLeft: 20 }}>

                                    <Text style={{
                                        marginTop: 10,
                                        color: GLOBAL.COLOR.THEME_ORANGE,
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        fontFamily: 'helvetica_neue_lts_td_light'
                                    }}>
                                        {'Price'}
                                    </Text>

                                    <Text style={{
                                        color: GLOBAL.COLOR.WHITE,
                                        fontSize: 18,
                                        fontFamily: 'robotomedium'
                                    }}>
                                        {'$' + this.props.navigation.state.params.item.discount_price}
                                    </Text>

                                </View>
                            ) :
                            (
                                <View style={{ marginTop: 15, paddingBottom: 10, paddingLeft: 20 }}>

                                    <Text style={{
                                        marginTop: 10,
                                        color: GLOBAL.COLOR.THEME_ORANGE,
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        fontFamily: 'helvetica_neue_lts_td_light'
                                    }}>
                                        {'Price'}
                                    </Text>

                                    <Text style={{
                                        color: GLOBAL.COLOR.WHITE,
                                        fontSize: 18,
                                        fontFamily: 'robotomedium'
                                    }}>
                                        {'$' + this.props.navigation.state.params.item.price}
                                    </Text>

                                </View>
                            )

                        }

                        <View style={{ marginTop: 15, paddingBottom: 10, paddingLeft: 20 }}>

                            <Text style={{
                                marginTop: 10,
                                color: GLOBAL.COLOR.THEME_ORANGE,
                                fontSize: 14,
                                fontWeight: 'bold',
                                fontFamily: 'helvetica_neue_lts_td_light'
                            }}>
                                {'Description'}
                            </Text>

                            <Text style={{
                                color: GLOBAL.COLOR.WHITE,
                                fontSize: 18,
                                fontFamily: 'robotomedium'
                            }}>
                                {this.props.navigation.state.params.item.description}
                            </Text>

                        </View>

                        <View style={{ marginTop: 15, paddingBottom: 10, paddingLeft: 20 }}>

                            {/*<Text style={{ 
    marginTop:10, 
    color: GLOBAL.COLOR.WHITE, 
    fontSize: 14, 
    fontFamily:'helvetica_neue_lts_td_light'}}>
        {'Total Units'}
    </Text>

<Text style={{  
    color: GLOBAL.COLOR.WHITE, 
    fontSize: 18, 
    fontFamily:'robotomedium'}}>
        {this.props.navigation.state.params.item.units_value}
    </Text>*/}

                            {this.props.navigation.state.params.item.units_value > 1 &&

                                <View style={{ width: '100%', marginBottom: 10, marginTop: 15 }}>

                                    <Text style={styles_page.des}> {'Choose your preference to buy this product: '}</Text>


                                    <RadioForm
                                        radio_props={entry_props}
                                        buttonSize={15}
                                        // formHorizontal={true}
                                        buttonColor={GLOBAL.COLOR.WHITE}
                                        selectedButtonColor={GLOBAL.COLOR.THEME_ORANGE}
                                        onPress={(index) => { this.setState({ entry_type: entry_props[index].value }) }}
                                        style={{ marginLeft: 15, padding: 10 }}
                                        labelStyle={{ fontSize: 16, color: GLOBAL.COLOR.WHITE }}
                                    />

                                </View>
                            }
                            {/*this.state.entry_type ==1 &&
          
          <TextInput
          placeholder='Enter Units'
          placeholderTextColor={GLOBAL.COLOR.PLACEHOLDER_TEXT}
          style={styles_page.inputStyle}
          onChangeText={text => this.setState({ manual_code: text })}
      > 
      </TextInput>
         */ }

                            <TouchableOpacity style={[styles_page.full, { marginTop: 25 }]} onPress={() => this.props.navigation.navigate('AddMailScreen') }>
                                <Text style={styles_page.loginBtn}>Nominate Extra Email</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles_page.full, { marginTop: 25 }]} onPress={() => this.addToCart()}>
                                <Text style={styles_page.loginBtn}>Proceed</Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                </ImageBackground>

            </ScrollView>
        )
    }
}
