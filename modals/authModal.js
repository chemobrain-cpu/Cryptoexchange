import React from 'react'
import { View, Text, Modal, Dimensions, StyleSheet,TouchableOpacity } from 'react-native'



const AuthModal = ({ modalVisible,updateVisibility,message }) => {
    
    return (<>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            
        >
            <View style={styles.modalBackground}>
                
                <View style={styles.modalView}>

                    <Text style={styles.modalState}>{message}</Text>

                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity style={styles.acceptBtn} onPress={() => updateVisibility()} >
                            <Text style={styles.acceptBtnText}>got it!</Text>

                        </TouchableOpacity>

                        
                    </View>

                </View>


            </View>

        </Modal>
    </>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
   

    modalView: {
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: '#fff',
        width: Dimensions.get('window').width *0.9,
        display: 'flex',
        flexDirection: 'column',
        borderTopColor: 'rgb(240,240,240)',
        borderTopWidth: 1,
        paddingVertical:30
    },
   
    modalState: {
        paddingTop: 10,
        fontSize: 17,
        fontFamily: 'ABeeZee',
        fontWeight: '400',
        marginBottom: 15,
        alignSelf: 'center',
        paddingHorizontal: 15,

    },
    modalButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 2,

    },
    acceptBtn: {
        width: '90%',
        borderRadius: 50,
        paddingTop: 15,
        paddingBottom: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'ABeeZee',
        backgroundColor: 'rgb(240,240,240)',
    },
    acceptBtnText: {
        fontSize: 15,
        fontFamily: 'ABeeZee',
    },
  
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "#fff",
        fontFamily: 'Poppins',
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
});

export default AuthModal