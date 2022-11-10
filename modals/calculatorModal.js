import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Modal,
} from "react-native";



const Calculator = ({ modalVisible,changeVisibility,navigateToCard,modalTopic,modalText}) => {
    



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

                    <Text style={styles.modalHeader}>{modalTopic}</Text>

                    <Text style={styles.modalText}>{modalText}</Text>

                    <TouchableOpacity style={styles.modalButtonContainer} onPress={navigateToCard}>
                        <Text style={styles.modalButtonText}>got it!</Text>
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
        top: '62%',
        alignSelf: 'center',
        borderRadius: 5

    },
    modalView: {
        borderRadius: 20,
        position: 'absolute',
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        top: '65%',
        height:240,
        display: 'flex',
        flexDirection: 'column',
        borderTopColor: 'rgb(240,240,240)',
        borderTopWidth: 1,
        paddingTop: 20,
        paddingHorizontal: 20

    },
    modalHeader: {
        fontSize: 20,
        fontFamily: 'Poppins',
        alignSelf: 'flex-start',
        marginBottom: 10

    },
    modalText: {
        fontSize: 16,
        fontFamily: 'ABeeZee',
        alignSelf: 'flex-start',
        marginBottom: 15,
        color: 'rgb(100,100,100)'

    },
    modalButtonContainer: {
        width: '100%',
        backgroundColor: 'rgb(240,240,240)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 30

    },
    modalButtonText: {
        fontSize: 15,
        fontFamily: 'Poppins',

    },

})

export default Calculator;