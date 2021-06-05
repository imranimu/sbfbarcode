import React, { Component } from 'react';
import { ScrollView, TextInput, Text, View, ImageBackground, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import styles_page from './BarStyle.js'
import { RNCamera } from 'react-native-camera';
const banns = require("@Asset/images/banns.png");
const bar = require("@Asset/images/barshow.png");
import { NavigationEvents } from 'react-navigation';
import AsyncStorage from "@react-native-community/async-storage";
import GLOBAL from "./Global/Global.js";

export default class BarScreen extends Component {
  constructor(props) {
    super(props);

    this.camera = null;
    this.barcodeCodes = [];
    this.isBarcodeRead = false;
    this.state = {
      isLoading: false,
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
      },
      isScanDone: true,
      manual_code: null,
    };
  }

  onBarCodeRead(scanResult) {
    console.log(scanResult.type);
    console.log(scanResult.data);
    if (!this.isBarcodeRead) {
      //this.isBarcodeRead = true;
      if (scanResult.data != null) {
        console.log('onBarCodeRead call: ', scanResult.data);
        this.setState({
          isScanDone: true
        })

        //this.props.navigation.navigate('BarItem',{toolId:scanResult.data})
        this.getProductDetails(scanResult.data)

      }
    } else {
      return;
    }
  }

  resetBarCode = () => {
    this.isBarcodeRead = false;
    //console.log('did blur',payload+' ----'+this.isBarcodeRead)
  }



  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  }

  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Waiting</Text>
      </View>
    );
  }

  componentDidMount() {
    console.log("Its called again")
  }

  async getProductDetails(tool_id) {
    var userid = JSON.parse(await AsyncStorage.getItem('userid'));

    console.log("Tool Id is: ", tool_id);

    if (tool_id == null || tool_id == '') {
      alert("Barcode is required.")
      return;
    }
    this.setState({
      isLoading: true
    });
    return fetch(GLOBAL.get_product_detail(tool_id, userid), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false
        });
        console.log("Get Tool Details: " + JSON.stringify(responseJson));

        if (responseJson.result.status === 'Valid') {

          this.props.navigation.navigate('ProductType', { item: responseJson.result })

        } else {
          alert(responseJson.result.message);
        }

      })
      .catch(error => {
        console.log(error);
        this.setState({
          isLoading: false
        });
      });
  }


  render() {

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, }}
        scrollEnabled>

        {this.state.isScanDone ? (
          <ImageBackground source={banns} style={{ resizeMode: 'contain', height: '100%', width: '100%' }}>

            {this.state.isLoading &&
              <View style={styles_page.loading}>
                <ActivityIndicator
                  color={GLOBAL.COLOR.THEME_ORANGE}
                  size='large' />
              </View>
            }

            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, paddingHorizontal: 15 }}>
              <View style={{ marginBottom: 20 }}>
                <Text style={styles_page.title}>Complete Order Information </Text>
                <Text style={styles_page.des}> Scan bar code from the tool by Toolfix to add its information to cart.You can order multiple parts</Text>
              </View>
              <TouchableOpacity style={styles_page.barbg} onPress={() => this.setState({ isScanDone: false })}>
                <Image source={bar} style={styles_page.barImg} />
                <Text style={styles_page.barBtn}>Scan Barcode</Text>
              </TouchableOpacity>

              <View style={{ marginTop: 10 }}>
                <Text style={styles_page.title}>or </Text>

              </View>

              <TextInput
                placeholder='Manually Enter Code'
                placeholderTextColor={GLOBAL.COLOR.PLACEHOLDER_TEXT}
                style={styles_page.inputStyle}
                onChangeText={text => this.setState({ manual_code: text })}
              >
              </TextInput>
              <TouchableOpacity style={[styles_page.full, { marginTop: 20 }]} onPress={() => this.getProductDetails(this.state.manual_code)}>
                <Text style={styles_page.loginBtn}>Process Code</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles_page.full, { marginTop: 30 }]}
                onPress={() => this.props.navigation.navigate('BarProceed')}>
                <Text style={styles_page.loginBtn}>Cancel</Text>
              </TouchableOpacity>

              {/*<TouchableOpacity style={styles_page.half}
                        onPress={() => this.props.navigation.navigate('BarProceed')}>
                            <Text style={styles_page.cancelBtn}>Cancel</Text>
                        </TouchableOpacity>*/}
            </View>
          </ImageBackground>
        ) : (
            <View style={styles.container}>
              <RNCamera
                ref={ref => {
                  this.camera = ref;
                }}
                defaultTouchToFocus
                flashMode={this.state.camera.flashMode}
                mirrorImage={false}
                onBarCodeRead={this.onBarCodeRead.bind(this)}
                onFocusChanged={() => { }}
                onZoomChanged={() => { }}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
                style={styles.preview}
                type={this.state.camera.type}
              />
              <View style={[styles.overlay, styles.topOverlay]}>
                <Text style={styles.scanScreenMessage}>Scanning barcode in progress...</Text>
              </View>
              {/*<View style={[styles.overlay, styles.bottomOverlay]}>
          <Button
            onPress={() => { console.log('scan clicked'); }}
            style={styles.enterBarcodeManualButton}
            title="Enter Barcode"
           />
          </View>*/}
            </View>
          )}

        <NavigationEvents
          onWillFocus={payload => console.log('will focus', payload + ' ----' + this.isBarcodeRead)}
          onDidFocus={payload => console.log('did focus', payload + ' ----' + this.isBarcodeRead)}
          onWillBlur={payload => console.log('will blur', payload + ' ----' + this.isBarcodeRead)}
          onDidBlur={payload =>
            this.resetBarCode
          }
        />

      </ScrollView>

    );
  }
}

const styles = {
  container: {
    flex: 1
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
