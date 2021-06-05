import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './BarStyle.js'

const banns = require("@Asset/images/banns.png");


export default class ThankScreen extends Component {
    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1, }}
                scrollEnabled>
                <ImageBackground source={banns} style={{ resizeMode: 'contain', height: '100%', width: '100%' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, paddingHorizontal: 15 }}>

                        <Text style={styles.thanku}>Thank you for your order. Please check your email for order status</Text>
                        <TouchableOpacity style={styles.full}>
                            <Text style={styles.loginBtn}>Go to My Order History</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </ScrollView>
        );
    }
}