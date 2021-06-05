import { StyleSheet, Platform } from 'react-native'
import GLOBAL from './Global/Global'
module.exports = StyleSheet.create({
    loading: {
        height:'100%',
        width:'100%',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex:9999,
        justifyContent: 'center',
        backgroundColor:GLOBAL.COLOR.BLACK_OPACITY
      },
    inputStyle: {
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: GLOBAL.COLOR.WHITE,
        height: 50,
        width: '100%',
        paddingHorizontal: 15, marginBottom: 20,
        borderRadius: 28,
        fontSize: 18,
        color: GLOBAL.COLOR.WHITE
    },
    inputStyle1: { 
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: GLOBAL.COLOR.WHITE,
        height: 150,
        width: '100%',
        paddingHorizontal: 15, 
        marginBottom: 20,
        borderRadius: 10,
        fontSize: 18,
        color: GLOBAL.COLOR.WHITE,
    },
    orderInputStyle: {
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: GLOBAL.COLOR.WHITE,
        height: 50,
        width: '100%',
        paddingHorizontal: 15, 
        marginBottom: 10,
        borderRadius: 28,
        fontSize: 18,
        color: GLOBAL.COLOR.WHITE
    },
    notesStyle: {
        borderWidth: 2,
        borderColor: GLOBAL.COLOR.WHITE,
        height: 100,
        width: '100%',
        paddingHorizontal: 10,
        borderRadius: 10,
        fontSize: 18,
        color: GLOBAL.COLOR.WHITE,
    },
    cartTitle: { textAlign: 'center', color: GLOBAL.COLOR.THEME_ORANGE, fontSize: 24, fontWeight: 'bold',marginBottom:10 },
    cartItems:{ textAlign: 'center', color: GLOBAL.COLOR.THEME_ORANGE, fontSize: 18, marginVertical: 10, fontWeight: 'bold' },
    itemText: {
        fontSize: 16,
        marginBottom: 5,
        color: GLOBAL.COLOR.BLACK,
        fontWeight: 'bold'
    },
    proceedToCheckout: {
        backgroundColor: GLOBAL.COLOR.THEME_ORANGE,
        color: GLOBAL.COLOR.WHITE,
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 10,
        textTransform: 'uppercase',
        textAlign: 'center',
        borderRadius: 28,
        fontSize: 15,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    addMoreItems: {
        backgroundColor: GLOBAL.COLOR.THEME_GREEN2,
        color: GLOBAL.COLOR.WHITE,
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 10,
        textTransform: 'uppercase',
        textAlign: 'center',
        borderRadius: 28,
        fontSize: 15,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    loginBtn: {
        backgroundColor: GLOBAL.COLOR.THEME_ORANGE,
        color: GLOBAL.COLOR.WHITE,
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 10,
        textTransform: 'uppercase',
        textAlign: 'center',
        borderRadius: 28,
        fontSize: 15,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    barBtn: {
        color: GLOBAL.COLOR.BLACK,
        width: '100%',
        paddingVertical: 0,
        paddingHorizontal: 20,
        textTransform: 'uppercase',
        textAlign: 'center',
        borderRadius: 0,
        fontSize: 17,
        marginBottom: 0,
        fontWeight: 'bold',
    },
    full: { width: '100%' },
    title: { textAlign: 'center', color: GLOBAL.COLOR.THEME_ORANGE, fontSize: 24, marginBottom: 20, },
    homeTitle: { textAlign: 'center', color: GLOBAL.COLOR.THEME_ORANGE, fontSize: 24, marginBottom: 5, },
    des: { textAlign: 'center', color: GLOBAL.COLOR.WHITE, marginBottom: 10 },
    des1: { textAlign: 'center', color: GLOBAL.COLOR.WHITE, marginBottom: 1 },
    logo: {
        resizeMode: 'contain',
        height: 120,
        width: 150,
        marginBottom: 40,
        borderRadius:50,
//         ...Platform.select({
//             ios: {
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowOpacity: 0.8,
//                 shadowRadius: 2,    
//               },
//               android: {
//                 shadowColor: 'black',
//   shadowOpacity: 0.26,
//   shadowOffset: { width: 0, height: 2},
//   shadowRadius: 10,
//   elevation: 3,
//   backgroundColor: 'white'
                
//               },
//           }),
    },
    barImg: {
        resizeMode: 'stretch',
        height: 50,
        width: 80,
        marginBottom: 5,
        alignSelf: 'center',
        marginTop: 0
    },

    barbg: { backgroundColor: GLOBAL.COLOR.WHITE, marginBottom: 10, paddingVertical: 20, },
    thanku: { textAlign: 'center', color: GLOBAL.COLOR.WHITE, fontSize: 30, marginBottom: 30 },
    myOrder: { textAlign: 'center', color: GLOBAL.COLOR.THEME_ORANGE, fontSize: 30, marginVertical: 20, fontWeight: 'bold' },
    dtl: {
        fontSize: 20,
        marginBottom: 5,
        color: GLOBAL.COLOR.BLACK,
        fontWeight: 'bold'
    },
    approved: {
        //textAlign: 'center',
        color: 'green',
        fontSize: 16,
        fontWeight: 'bold'

    },
    reject: {
        textAlign: 'center',
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold'

    },
    cancelBtn: {
        backgroundColor: GLOBAL.COLOR.THEME_ORANGE,
        color: GLOBAL.COLOR.WHITE,
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 30,
        textTransform: 'uppercase',
        textAlign: 'center',
        borderRadius: 28,
        fontSize: 15,
        marginBottom: 10,
        fontWeight: 'bold',
        marginTop: 30

    },
    row: { flexDirection: 'row' },
    itemBtn:{width:'50%',paddingHorizontal:0},
    addItem:{color:GLOBAL.COLOR.WHITE,backgroundColor:GLOBAL.COLOR.PISTACHIO, fontSize:18,textAlign:'center',paddingVertical:5,borderTopLeftRadius:28,borderBottomLeftRadius:28,},
    canItem:{color:GLOBAL.COLOR.WHITE,backgroundColor:GLOBAL.COLOR.PINK, fontSize:18,textAlign:'center',paddingVertical:5,borderTopRightRadius:28,borderBottomRightRadius:28},
    barbin:{resizeMode:'contain', height:30,width:30},

    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
        },
        cameraIcon: {
        margin: 5,
        height: 40,
        width: 40
        },
        rowTitle: {
            fontSize: 14,
            marginBottom: 5,
            color: GLOBAL.COLOR.BLACK,
            fontWeight: 'bold'
        },
          rowItem: {
            fontSize: 14,
            marginBottom: 5,
            color: GLOBAL.COLOR.BLACK,
            width:50,
            textAlign:'center',
            //fontWeight: 'bold'
        },
        adminNotes: {
            fontSize: 14,
            marginBottom: 5,
            marginLeft:5,
            color: GLOBAL.COLOR.THEME_RED,
            //fontWeight: 'bold'
        },
        orderText: {
            fontSize: 14,
            //marginBottom: 5,
            color: GLOBAL.COLOR.BLACK,
            //fontWeight: 'bold'
        },
        orderNumber:{
            fontSize: 14,
            marginBottom: 5,
            color: GLOBAL.COLOR.THEME_RED,
            fontWeight: 'bold'
        },
        forget: {
            textAlign: "right",
            color: GLOBAL.COLOR.WHITE
          },
          regTitle:{
            color:GLOBAL.COLOR.WHITE,
            textAlign: "center",
            marginBottom:5,
            marginTop:20,
            fontSize:28
        },
        regdes:{
          color:GLOBAL.COLOR.WHITE,
          textAlign: "center",
          marginBottom:15,
          marginTop:5,
          fontSize:12
      },
        

})
