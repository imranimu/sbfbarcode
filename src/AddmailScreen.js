import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'

const banns = require("@Asset/images/banns.png");
import GLOBAL from "./Global/Global.js";
import styles_page from './BarStyle.js'

const SendOrderDetails = ({ navigation }) => {

    const [mail, setmail] = useState('Test@mail.com'); //state hook for getting mail

    const storeData = async () => {
        AsyncStorage.setItem('nominee_email', mail)
        // console.log(mail)

    }


    return (
        <ImageBackground source={banns} style={{ resizeMode: 'contain', height: '100%', width: '100%' }}>
            <View style={styles.container} >
                <TextInput
                    placeholder='Enter an email'
                    placeholderTextColor={GLOBAL.COLOR.PLACEHOLDER_TEXT}
                    style={styles_page.inputStyle}
                    onChangeText={text => setmail(text)}
                    keyboardType={"email-address"}
                    autoCapitalize="none"
                >
                </TextInput>
                <TouchableOpacity  style={[styles_page.full, { marginTop: 20 }]} onPress={() => { mail ? navigation.navigate('ProductType') && storeData() : alert('Email input is requred!') }}>
                    <Text style={styles_page.loginBtn}>Submit</Text>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    )
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center'
    },
    topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    enterBarcodeManualButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40
    },
    scanScreenMessage: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',

    }
};

export default SendOrderDetails;
