import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    SafeAreaView,
    ScrollView,
    Dimensions,
} from "react-native";

import { Feather, FontAwesome } from '@expo/vector-icons';
import Loader from '../loaders/Loader';

const Pin = ({ navigation }) => {
    let [value, setValue] = useState("")
    let [isLoading, setIsLoading] = useState(true)


     //preventing memory leak
     useEffect(() => {
        let focus = navigation.addListener('beforeRemove', (e) => {
            if (isLoading) {
                e.preventDefault();
            } else {
                //can go back
            }
        });
        return focus
    }, [isLoading]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    })


    let dataUi = (data) => {
        data = data.toString()

        //convert string to an array
        let arr = []
        for (let m of data) {
            arr.push(m)
        }
        return <View style={styles.dollarPriceInnerCon}>
            <Text style={{ ...styles.dollarPrice, fontSize: 25 }}>{arr[0] ? <FontAwesome name="asterisk" size={27} color="black" /> : <Feather name="circle" size={27} color="black" />}</Text>

            <Text style={{ ...styles.dollarPrice, fontSize: 25 }}>{arr[1] ? <FontAwesome name="asterisk" size={27} color="black" /> : <Feather name="circle" size={27} color="black" />}</Text>

            <Text style={{ ...styles.dollarPrice, fontSize: 25 }}>{arr[2] ? <FontAwesome name="asterisk" size={27} color="black" /> : <Feather name="circle" size={27} color="black" />}</Text>

            <Text style={{ ...styles.dollarPrice, fontSize: 25 }}>{arr[3] ? <FontAwesome name="asterisk" size={27} color="black" /> : <Feather name="circle" size={27} color="black" />}</Text>

        </View>






    }

    //button function
    let button = (num) => {
        setValue(prev => {
            if (prev.length > 3) {
                return prev
            }
            return prev + num
        })
    }

    //dot fun
    let point = () => {

        setValue(prev => {
            //check if it already contains decimal point 
            let pointExist = prev.includes(".")
            if (!pointExist) {
                let num = Number(prev)
                let decimalNum = num.toFixed(1)
                let numChar = decimalNum.toString()
                return numChar.slice(0, -1)

            }
            return prev


        })
    }

    //deleting algorithm
    let deleteHandler = () => {
        //get the value string and remove the last element
        setValue(prev => prev.slice(0, -1))

    }



    let proceedHandler = async () => {
        if (!value) {
            return;
        }
        navigation.navigate("ConfirmPin", {
            pin: value
        })

    }




    if (isLoading) {
        return <Loader />
    }




    return (<>
        {/* modal for proceeding*/}


        <SafeAreaView style={styles.screen}>
            <ScrollView contentContainerStyle={styles.scrollContainer} stickyHeaderIndices={[0]}>
                <View style={{ display: 'flex', width: '100%' }}>
                    <View style={styles.headerContainer}>

                        <Pressable>
                            <Text style={styles.title}>Enter a unique 4 digit pin</Text>
                        </Pressable>





                    </View>
                </View>



                <View style={styles.priceContainer}>


                    <View style={styles.dollarPriceCon}>

                        {dataUi((value))}

                    </View>

                </View>








                <View style={styles.calculatorCon}>
                    <View style={styles.numberContainer}>
                        <Pressable style={styles.numberButton} onPress={() => button('1')}>
                            <Text style={styles.number}>1</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => button('2')}>
                            <Text style={styles.number}>2</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => button('3')}>
                            <Text style={styles.number}>3</Text>
                        </Pressable>

                    </View>
                    <View style={styles.numberContainer}>
                        <Pressable style={styles.numberButton} onPress={() => button('4')}>
                            <Text style={styles.number}>4</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => button('5')}>
                            <Text style={styles.number}>5</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => button('6')}>
                            <Text style={styles.number}>6</Text>
                        </Pressable>

                    </View>
                    <View style={styles.numberContainer}>
                        <Pressable style={styles.numberButton} onPress={() => button('7')}>
                            <Text style={styles.number}>7</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => button('8')}>
                            <Text style={styles.number}>8</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => button('9')}>
                            <Text style={styles.number}>9</Text>
                        </Pressable>

                    </View>

                    <View style={styles.numberContainer}>
                        <Pressable style={styles.numberButton} onPress={() => point(".")}>
                            <Text style={styles.number}>.</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => button('0')}>
                            <Text style={styles.number}>0</Text>
                        </Pressable>

                        <Pressable style={styles.numberButton} onPress={() => deleteHandler()}>
                            <Feather name="arrow-left" size={22} color="rgb(44, 44, 44)" />
                        </Pressable>

                    </View>

                </View>

                <View style={styles.buttonCon}>
                    <Pressable style={{ ...styles.button }} onPress={proceedHandler}>
                        <Text style={styles.buttonText}>Continue</Text>

                    </Pressable>

                </View>



            </ScrollView>

        </SafeAreaView>
    </>);
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff'
    },

    scrollContainer: {
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
    },
    headerContainer: {
        paddingTop: 20,
        display: "flex",
        flexDirection: "row",
        marginBottom: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerContainerIcon: {


    },


    title: {
        fontSize: 20,
        fontFamily: 'ABeeZee',
        textAlign: 'center'

    },
    balance: {
        fontSize: 17,
        fontFamily: 'ABeeZee',
        paddingLeft: 8,
        color: 'rgb(100,100,100)'
    },
    priceContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 45,
        marginBottom: 90,
        width: '100%',
        justifyContent: 'center'
    },


    dollarPriceCon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%',
        alignSelf: 'center'
    },
    dollarPriceInnerCon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'

    },
    dollarPrice: {
        fontFamily: 'ABeeZee',
        color: '#1652f0',


    },
    cryptoPrice: {
        fontFamily: 'ABeeZee'

    },
    moneyCon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',


    },
    money: {
        fontSize: 40,
        color: '#1652f0',
        fontFamily: 'Poppins'

    },
    maxButtonCon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'rgb(240,240,240)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    maxText: {
        fontSize: 16,
        fontFamily: 'Poppins',

    },
    invertButtonCon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'rgb(240,240,240)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    card: {
        height: 80,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 35
    },
    cryptoCon: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cryptoWorth: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingRight: 15,
        justifyContent: 'center'
    },
    cryptoWorthCash: {
        fontSize: 17,
        fontFamily: 'ABeeZee'

    },
    cryptoWorthText: {
        fontSize: 17,
        fontFamily: 'ABeeZee'

    },
    image: {
        width: 30,
        height: 30

    },
    cryptoNameCon: {
        marginLeft: 10

    },
    cryptoName: {
        fontSize: 17,
        fontFamily: 'Poppins'
    },
    calculatorCon: {
        width: '100%',
    },
    numberContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    numberButton: {
        width: 40,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    number: {
        fontSize: 30,
        fontFamily: 'ABeeZee'
    },


    buttonCon: {
        width: '100%',
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    button: {
        width: '95%',
        backgroundColor: '#1652f0',
        paddingVertical: 17,
        borderRadius: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontFamily: "ABeeZee",
        color: '#fff',

    }
})

export default Pin;