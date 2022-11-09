import React from 'react'
import { View, Text, Pressable, StyleSheet, Modal, Dimensions } from 'react-native'


const SettingModal = ({modalVisible,updateVisibility,topic,info,action}) => {

    const handler = ()=>{
        if(action=="closeAccount"){
            updateVisibility("closeAccount")

        }else{
            updateVisibility("changeInfo")

        }
        
    }
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
                    <Text style={styles.modalQuest}> {topic}</Text>

                    <Text style={styles.modalState}>{info}</Text>

                    <Pressable style={styles.button} onPress={handler}>
                        <Text style={styles.buttonText}>Continue</Text>
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
        top: '65%',
        alignSelf: 'center',
        borderRadius: 5
    },

    modalView: {
        backgroundColor: "#fff",
        borderRadius: 30,
        alignItems: "center",

        position: 'absolute',
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        top: '69%',
        height: '35%',
        display: 'flex',
        flexDirection: 'column',
        borderTopColor: 'rgb(240,240,240)',
        borderTopWidth: 1,
        paddingHorizontal:15




    },
    modalQuest: {
        paddingTop: 20,
        fontSize: 22,
        fontFamily: 'Poppins',
        alignSelf: 'flex-start'

    },
    modalState: {
        paddingTop: 10,
        fontSize: 18,
        fontFamily: 'ABeeZee',
        fontWeight: '500',
        marginBottom: 15,
        alignSelf: 'flex-start',
        color: 'grey',

    },
    button:{
        width: '100%',
        borderRadius: 50,
        paddingVertical:17,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'ABeeZee',
        borderColor: 'rgb(240,240,240)',
        backgroundColor: 'rgb(240,240,240)',
        marginBottom: 15,

    },
    buttonText:{
        fontSize: 15,
        fontFamily: 'Poppins',

    }

   


})




export default SettingModal