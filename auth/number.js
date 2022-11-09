import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet,  ScrollView,  Dimensions,  Image } from 'react-native'
import { useRoute} from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress'




const Number = ({navigation}) => {
    const route = useRoute();
    const {
        email
    } = route.params


    const continueHandler = ()=>{
        navigation.navigate('VerifyNumber', {
            email: email
        })
    }


    return (<SafeAreaView style={styles.screen}>
        <View style={styles.container}>
            <View style={styles.navigationHeader}>
                <TouchableOpacity style={styles.close} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} fontWeight={100} color="rgb(44, 44, 44)" style={{ fontWeight: '200' }} />
                </TouchableOpacity>

                <View style={styles.progress}>
                    <View style={styles.progressbar}>
                        <Progress.Bar progress={1} width={50} height={4} unfilledColor='rgb(240,240,240)' borderColor='#fff' />

                    </View>
                    <View style={styles.progressbar}>
                        <Progress.Bar progress={0.3} width={50} height={4} unfilledColor='rgb(240,240,240)' borderColor='#fff' />

                    </View>
                    <View style={styles.progressbar}>
                        <Progress.Bar progress={0} width={50} height={4} unfilledColor='rgb(240,240,240)' borderColor='#fff' />

                    </View>


                </View>

            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/icons/photo1(7).jpg')}
                        style={{ width: 300, height: 300 }} />
                </View>

                <Text style={styles.headerText}> secure your account</Text>
                <Text style={styles.statement}>
                    One way we keep your account secure is with 2-step verification,which requires your phone number .We will never call you or use your number without your permission
                </Text>

                <View>
                <TouchableOpacity style={styles.button} onPress={continueHandler} >
                    <Text style={styles.buttonText}>
                        Continue
                    </Text>
                    
                </TouchableOpacity>
                </View>

            </ScrollView>

        </View>

    </SafeAreaView>
    )


}

const styles = StyleSheet.create({
    screen:{ 
        flex: 1, 
        backgroundColor: "#fff" ,
        paddingTop: 20
    },
    container: {
        width: '90%',
        marginHorizontal: '5%',
       

    },
    navigationHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        zIndex: 10,
        borderColor: '#fff',



    },
    progress: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        paddingLeft: 40,
        justifyContent: 'space-around'

    },
    progressbar: {
        paddingLeft: 8

    },
    close: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',


    },
    body: {
        paddingTop: 20,
        display: 'flex',
        flexDirection:'column'
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height / 4,
        marginVertical: 20,
        marginBottom: 40,
    },
    

    headerText: {
        fontSize: 18,
        fontFamily: 'Poppins',
        color:'rgb(44, 44, 44)',
        paddingLeft:0
    },
    statement:{
        paddingTop:5,
        paddingBottom:120,
        fontSize:14,
        fontFamily:'ABeeZee',
        paddingLeft:4,
        lineHeight:22
        
    },
    







    button:{
        width:'100%',
        paddingVertical:17,
        borderRadius:30,
        backgroundColor:'#1652f0',
        marginBottom:50,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'

    },
    buttonText:{
        color:'#fff',
        fontFamily: 'Poppins',
        fontSize:15,
        fontWeight:'700'
    }

});

export default Number