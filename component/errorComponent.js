import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Dimensions, ScrollView,Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

let Error = ({tryAgain}) => {
    const handleTry = ()=>{
        tryAgain()
    }

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/icons/setting.jpg')}
                        style={{ width: 300, height: 300 }} />

                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>We're having connection issues</Text>
                    <Text style={styles.text}>We're looking into it right now. </Text>
                    <Text style={styles.text}>
                        please quit the app and try
                    </Text>
                    <Text style={styles.text}>
                        again.funds are safe
                    </Text>

                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.tryContainer} onPress={handleTry}>
                        <Text style={styles.statusText}>
                            Try again
                        </Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.statusContainer}>
                        <Text style={styles.statusText}>check status</Text>

                    </TouchableOpacity>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 15
    },
    imageContainer: {
        height: Dimensions.get('window').height / 2.2,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'



    },
    textContainer: {
        height: Dimensions.get('window').height /4,

    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        fontFamily: 'Poppins',

    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'ABeeZee',
        color: 'rgb(100,100,100)'
    },
    buttonContainer: {
        height: Dimensions.get('window').height / 4,
        display: 'flex',
        flexDirection: 'column'

    },
    tryContainer: {
        width: '100%',
        paddingVertical: 17,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: 'rgb(240,240,240)',
        marginBottom: 20

    },
    statusContainer: {
        width: '100%',
        paddingVertical: 17,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: 'rgb(240,240,240)',


    },
    statusText: {
        fontSize: 15,
        fontFamily: 'Poppins'
    }




})

export default React.memo(Error)