import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, TextInput, Dimensions,KeyboardAvoidingView } from 'react-native'
import { Feather, FontAwesome } from '@expo/vector-icons';


let EmptyList = ({ navigation, actionText }) => {
    let [text, setText] = useState('')

    return <SafeAreaView style={styles.screen}>
        <ScrollView stickyHeaderIndices={[0]}>
            <View style={styles.headerContainer}>
                <View style={styles.assetsheaderCon}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconCon}>
                        <Feather name="arrow-left" size={25} color={"rgb(44,44,44)"} />
                    </TouchableOpacity>


                    <Text style={styles.headerText}>Select asset to {actionText}</Text>



                </View>
                <View style={styles.searchCon}>

                    <KeyboardAvoidingView style={{ ...styles.inputContainer }}>
                        <FontAwesome name="search" size={18} color={"rgb(100,100,100)"} />
                        <TextInput
                            style={{ ...styles.input, borderColor: 'orange' }}
                            value={text}
                            placeholder="Search"


                        />
                    </KeyboardAvoidingView>

                </View>
            </View>

            <View style={styles.mesageContainer}>
                <Text style={styles.message}>You don't have any crypto to {actionText}. Try buying some to get started</Text>
            </View>
        </ScrollView>
    </SafeAreaView>

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        zIndex: 10,
        paddingTop: 50,
        paddingHorizontal: 20,

    },
    

    headerText: {
        fontSize: 20,
        fontFamily: 'Poppins',
        marginLeft:10

    },
    assetsheaderCon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: 20
    },
    searchCon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',

    },
    inputContainer: {
        width: '100%',
        marginRight: 15,
        borderRadius: 25,
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderColor: 'rgb(180,180,180)',
        height: 50

    },
    input: {
        paddingHorizontal: 10,
        fontFamily: 'ABeeZee',
        marginBottom: 5,
        alignSelf: 'stretch',
        width: '80%',
        fontSize: 17,

    },
    /*end of header section style*/
    mesageContainer: {
        paddingHorizontal: 20,
        width: Dimensions.get('window').width,
        height:Dimensions.get('window').height/1.8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    message:{
        fontSize:18,
        color:'rgb(100,100,100)',
        textAlign:'center',
        fontFamily:"ABeeZee"
    }



})

export default React.memo(EmptyList)