import React from 'react'
import { View, Text,TouchableOpacity, StyleSheet, Modal, Dimensions} from 'react-native'

const SignupModal = ({modalVisible,updateVisibility,navigateHandler}) => {
    return (<Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={()=>updateVisibility()}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalTop}>
                </View>

                <View style={styles.modalView}>
                    <Text style={styles.modalQuest}>Are you sure you don't want to create a new account?</Text>

                    <Text style={styles.modalState}>you can always try again?</Text>

                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity style={styles.acceptBtn} onPress={() => navigateHandler()} >
                            <Text>yes, i'm sure</Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => updateVisibility()} style={styles.cancelBtn}>
                            <Text>cancel</Text>

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
        fontSize: 18,
        alignSelf: 'center',
        paddingHorizontal: 15,
        fontFamily: 'Poppins',

    },
    modalState: {
        paddingTop: 10,
        fontSize: 15,
        fontFamily: 'ABeeZee',
        fontWeight: '400',
        marginBottom: 15,
        alignSelf: 'flex-start',
        paddingHorizontal: 15,

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
    },
    cancelBtn: {
        width: '35%',
        paddingTop: 25,
        paddingBottom: 25,
        borderRadius: 50,
        backgroundColor: 'rgb(240,240,240)',
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
    

});




export default SignupModal