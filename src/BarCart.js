import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import CardView from 'react-native-cardview'
import styles from './BarStyle.js'
const banns = require("@Asset/images/banns.png");
const barbin = require("@Asset/images/barbanner.png");

export default class BarCart extends Component {
    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1, }}
                scrollEnabled>
                <ImageBackground source={banns} style={{ resizeMode: 'contain', height: '100%', width: '100%', }}>
                    <View style={{ paddingHorizontal: 15,flex:1 }}>
                        <Text style={styles.myOrder}>Add To Cart</Text>
                        <CardView
                            cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={5}
                            style={{ marginBottom: 10 }}
                        >
                            <View style={{ paddingHorizontal: 15, paddingVertical: 15, flexDirection: 'row', alignItems: 'center' }}>

                                <View style={{ width: '80%' }}>
                                    <Text style={styles.dtl}>Product id : 12345</Text>
                                    <Text style={styles.dtl}>Email : abc@gmail.com</Text>
                                    <Text style={styles.dtl}>Order id: 12345</Text>
                                </View>
                                <View style={{ width: '20%' }}>
                                    <TouchableOpacity>
                                        <Image source={barbin} style={styles.barbin} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </CardView>


                        <CardView
                            cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={5}
                            style={{ marginBottom: 10 }}
                        >
                            <View style={{ paddingHorizontal: 15, paddingVertical: 15, flexDirection: 'row', alignItems: 'center' }}>

                                <View style={{ width: '80%' }}>
                                    <Text style={styles.dtl}>Product id : 12345</Text>
                                    <Text style={styles.dtl}>Email : abc@gmail.com</Text>
                                    <Text style={styles.dtl}>Order id: 12345</Text>
                                </View>
                                <View style={{ width: '20%' }}>
                                    <TouchableOpacity>
                                        <Image source={barbin} style={styles.barbin} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </CardView>

                        <CardView
                            cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={5}
                            style={{ marginBottom: 10 }}
                        >
                            <View style={{ paddingHorizontal: 15, paddingVertical: 15, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: '80%' }}>
                                    <Text style={styles.dtl}>Product id : 12345</Text>
                                    <Text style={styles.dtl}>Email : abc@gmail.com</Text>
                                    <Text style={styles.dtl}>Order id: 12345</Text>
                                </View>
                                <View style={{ width: '20%' }}>
                                    <TouchableOpacity>
                                        <Image source={barbin} style={styles.barbin} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </CardView>
                        <View style={[styles.row, { marginTop: 15, marginBottom: 10, position:'absolute',bottom:10,paddingHorizontal:0,left:10}]}>
                            <TouchableOpacity
                                style={styles.itemBtn}
                            >
                                <Text style={styles.addItem}>Proceed to check out </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.itemBtn}
                            >
                                <Text style={styles.canItem}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ImageBackground>
            </ScrollView>
        );
    }
}