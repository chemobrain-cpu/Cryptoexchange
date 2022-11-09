import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native'


const LoginModal = ({modalVisible,updateVisibility,navigateHandler}) => {
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
                    <Text style={styles.modalQuest}>You're not signed in yet?</Text>

                    <Text style={styles.modalState}>Are you sure you want to quit?</Text>

                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity style={styles.acceptBtn} onPress={() => navigateHandler()} >
                            <Text>yes, i'm sure</Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => updateVisibility()} style={styles.cancelBtn}>
                            <Text style={{ color: '#fff' }}>cancel</Text>

                        </TouchableOpacity>
                    </View>

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
        top: '62%',
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
        top: '65%',
        height: '35%',
        display: 'flex',
        flexDirection: 'column',
        borderTopColor: 'rgb(240,240,240)',
        borderTopWidth: 1




    },
    modalQuest: {
        paddingTop: 20,
        fontSize: 22,
        fontFamily: 'Poppins',
        paddingLeft: 15,
        alignSelf: 'flex-start'

    },
    modalState: {
        paddingTop: 10,
        fontSize: 18,
        fontFamily: 'ABeeZee',
        fontWeight: '500',
        marginBottom: 15,
        paddingLeft: 15,
        alignSelf: 'flex-start',
        color: 'grey',

    },
    modalButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 2,

    },

    acceptBtn: {
        width: '50%',
        borderRadius: 50,
        paddingTop: 25,
        paddingBottom: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        fontFamily: 'ABeeZee',
        borderWidth: 1,
        borderColor: 'rgb(240,240,240)',
        backgroundColor: 'rgb(240,240,240)',
    },
    cancelBtn: {
        width: '35%',
        paddingTop: 25,
        paddingBottom: 25,
        borderRadius: 50,
        backgroundColor: '#1652f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 16,
        fontFamily: 'ABeeZee'

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
    container: {
        width: '90%',
        marginHorizontal: '5%'

    },


})




export default LoginModal