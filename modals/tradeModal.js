import React from 'react'
import { View, Pressable, StyleSheet, Modal, Dimensions,Text } from 'react-native'
import { Octicons, Entypo } from '@expo/vector-icons'

const LoginModal = ({ modalVisible, updateVisibility, navigateHandler ,coinName}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={updateVisibility}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalTop}>

                </View>
                <View style={styles.modalView}>
                    <Pressable style={styles.modalButtonCon} onPress={()=>navigateHandler('sell')}>
                        <View style={styles.modalButtonIcon}>
                            <Entypo name="plus" size={24} color="black" />

                        </View>
                        <View style={styles.modalButtonTextCon}>
                            <Text style={styles.topText}>Sell {coinName}</Text>
                            <Text style={styles.bottomText}>Sell {coinName.toUpperCase()} for cash</Text>

                        </View>

                    </Pressable>


                    <Pressable style={styles.modalButtonCon} onPress={()=>navigateHandler('convert')}>

                        <View style={styles.modalButtonIcon}>
                            <Octicons name="sync" size={24} color="black" />

                        </View>
                        <View style={styles.modalButtonTextCon}>
                            <Text style={styles.topText}>Convert {coinName}</Text>
                            <Text style={styles.bottomText}>Convert {coinName.toUpperCase()} to another...</Text>

                        </View>



                    </Pressable>


                </View>

            </View>
        </Modal>
    )
}

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
        top: '67%',
        alignSelf: 'center',
        borderRadius: 5
    },

    modalView: {
        backgroundColor: "#fff",
        borderRadius: 20,
        alignItems: "center",

        position: 'absolute',
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        top: '70%',
        height: '30%',
        display: 'flex',
        flexDirection: 'column',
        borderTopColor: 'rgb(240,240,240)',
        borderTopWidth: 1




    },
    modalButtonCon:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        paddingVertical:20


    },
    modalButtonIcon:{
        width:'20%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'

    },
    modalButtonTextCon:{
        width:'80%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',

    },
    topText:{
        fontSize:20,
        fontFamily:'Poppins'

    },
    bottomText:{
        fontSize:18,
        fontFamily:'ABeeZee',
        color:'rgb(100,100,100)'

    }



})




export default LoginModal