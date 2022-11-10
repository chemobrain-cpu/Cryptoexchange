import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Modal,
} from "react-native";
//import truncate
import {truncate} from "../utils/util"




const SendCryptoModal = ({ modalVisible, changeVisibility, walletNavigationHandler,bankNavigationHandler,currencyName }) => {

    return (<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            changeVisibility;
        }}
    >
        <View style={styles.modalBackground}>
            <View style={styles.modalTop}>
            </View>

            <View style={styles.modalView}>
                <Text style={styles.modalText}>Send {truncate(currencyName,7)} to ??</Text>

                <TouchableOpacity style={styles.modalTopButtonContainer} onPress={bankNavigationHandler}>
                    <Text style={styles.modalTopButtonText}> Bank account</Text>
                </TouchableOpacity>



                <TouchableOpacity style={styles.modalBottomButtonContainer} onPress={walletNavigationHandler}>
                    <Text style={styles.modalBottomButtonText}> wallet address</Text>
                </TouchableOpacity>



            </View>

        </View>



    </Modal>);
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'

    },
    modalTop: {
        height: 4,
        width: '20%',
        backgroundColor: 'rgb(225,225,225)',
        position: 'absolute',
        top: '65%',
        alignSelf: 'center',
        borderRadius: 5

    },
    modalView: {
        borderRadius: 20,
        position: 'absolute',
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        top: '68%',
        height: 220,
        display: 'flex',
        flexDirection: 'column',
        borderTopColor: 'rgb(240,240,240)',
        borderTopWidth: 1,
        paddingTop: 10,
        paddingHorizontal: 20

    },
    modalHeader: {
        fontSize: 20,
        fontFamily: 'Poppins',

    },
    modalText: {
        fontSize: 20,
        fontFamily: 'Poppins',
        alignSelf: 'center',
        marginBottom: 15,
        color: 'rgb(100,100,100)'

    },
    modalTopButtonContainer: {
        width: '100%',
        backgroundColor: '#1652f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 17,
        borderRadius: 30,
        marginBottom:20

    },
    modalBottomButtonContainer: {
        width: '100%',
        backgroundColor: 'rgb(240,240,240)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 17,
        borderRadius: 30,
        marginBottom:20

    },
    modalTopButtonText: {
        fontSize: 15,
        fontFamily: 'Poppins',
        color:'#fff'

    },
    modalBottomButtonText: {
        fontSize: 15,
        fontFamily: 'Poppins',
        color:"black"

    },

})

export default SendCryptoModal;