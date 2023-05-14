import React, { useState, useEffect} from 'react'
import { View, Text, SafeAreaView, StyleSheet, TextInput, FlatList, Pressable,KeyboardAvoidingView } from 'react-native'
import { Feather, FontAwesome } from '@expo/vector-icons'
import CryptoCard from '../component/currencyContainer'
import WalletAssetLoader from "../loaders/walletAssetsLoader";
import Error from '../component/errorComponent'
import { useDispatch,useSelector } from "react-redux"
import { loadWatchList } from "../store/action/appStorage";
import EmptyList from "../component/emptyList";

let ConvertList = ({ navigation }) => {
    //getting crypto data from coinmarcap
    let [text, setText] = useState('')
    let [focus, setFocus] = useState(false)
    let [coins, setCoins] = useState([])
    let [filteredCoins, setFilteredCoins] = useState([])
    let [isLoading, setIsLoading] = useState(true)
    let [error, setError] = useState(false)
    let dispatch = useDispatch()
    let { user,background,importantText,normalText,fadeColor,blue,fadeButtonColor,assets  } = useSelector(state => state.userAuth)


      //preventing memory leak
    useEffect(() => {
        let focus = navigation.addListener('beforeRemove', (e) => {
            if(isLoading){
                e.preventDefault();
            }else{
                //can go back
            }
        });
        return focus
    }, [isLoading]);

    //destructuring from param

    let navigationHandler = (coin) => {
        //here were navigating to send calculator
        return navigation.navigate('ConvertToList', {
            fromName: coin.id,
            fromImage: coin.image,
            fromPrice: coin.price,
            fromSymbol: coin.symbol
        })
    }


    const changeText = (e) => {
        if (e) {
            const newData = coins.filter((item) => {
                const itemData = item.id ? item.id.toUpperCase() : ''.toUpperCase();
                const textData = e.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setFilteredCoins(newData)
            setText(e)
        } else {
            setFilteredCoins(coins)
            setText(e)
        }

    }


    let fetchData = async (pageNumber) => {
        // You can await here
        setError(false)
        setIsLoading(true)

        
        if (assets.length == 0) {
            setCoins([]);
            setFilteredCoins([]);
            setIsLoading(false)
            return
        }

       
        //filtering message response
        let arr = []
        for (let mem of assets) {
            for (let val of user.personalAssets) {
                if (mem.id == val.id.toLowerCase()) {
                    /*mem.price = mem.current_price
                    mem.current_price = val.quantity * mem.current_price*/
                    arr.push(mem)
                }
            }
        }

        setCoins((existingCoins) => [...existingCoins, ...arr]);
        setFilteredCoins((existingCoins) => [...arr]);
        setIsLoading(false)


    }


    useEffect(() => {
        fetchData()
    }, [])

    const renderItem = ({ item, index }) => {

        return <CryptoCard navigationHandler={() => navigationHandler(item)}
            key={item}
            coin={item}
        />
    }


    if (isLoading) {
        return <WalletAssetLoader navigation={navigation} title="Convert an  asset" />
    }


    if (error) {
        return <Error tryAgain={fetchData} navigation={navigation} />
    }

    if (filteredCoins.length === 0) {
        return <EmptyList navigation={navigation} actionText="convert" />
    }

    return <SafeAreaView style={{ flex: 1, backgroundColor:background }}>
        <View style={{ ...styles.headerContainer,backgroundColor:background }}>


            <View style={styles.assetsheaderText}>
                <Pressable onPress={() => navigation.goBack()} style={styles.assetsheaderTextCon}>
                    <Feather name="arrow-left" size={25} color={background==='white'?"black":"white"} />
                    <Text style={{...styles.assetsText,color:importantText}}>Select to convert</Text>

                </Pressable>


            </View>

            <View style={styles.assetsheaderCon}>

                <KeyboardAvoidingView style={focus ? { ...styles.inputContainer, borderColor: blue } : { ...styles.inputContainer, borderColor:importantText , }}>

                    <FontAwesome name="search" size={18} color={focus ? blue : normalText} />

                    <TextInput
                        style={{ ...styles.input}}
                        onChangeText={changeText}
                        value={text}
                        placeholder="Search"
                        placeholderTextColor={normalText}
                        onFocus={() => {
                            setFocus(true);
                        }}
                        onBlur={() => {
                            setFocus(false);
                        }}
                    />

                </KeyboardAvoidingView>

            </View>


        </View>


        <View style={{...styles.middlesection,backgroundColor:background}}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredCoins}
                keyExtractor={(item, index) => item.id}
                initialNumToRender={20}
                renderItem={renderItem}
            />
        </View>
    </SafeAreaView>

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        zIndex: 10,
        paddingTop: 15,
        paddingHorizontal: 15
    },
    assetsheaderCon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingLeft: 10

    },
    assetsheaderText: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',


    },
    assetsheaderTextCon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'


    },
    assetsText: {
        fontSize: 21,
        fontFamily: 'ABeeZee',
        marginLeft: '6%'

    },
  

    inputContainer: {
        width: '90%',
        borderRadius: 25,
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15

    },
    input: {
        height: 45,
        paddingHorizontal: 10,
        fontFamily: 'ABeeZee',
        marginBottom: 5,
        alignSelf: 'stretch',
        width: '80%'
    },
    /*end of header section style*/
    middlesection: {
        backgroundColor: '#fff',
    },
    trending: {
        fontSize: 25,
        fontFamily: 'Poppins'
    },
    searchIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'rgb(240,240,240)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15


    },

    assetText: {
        fontSize: 16,
        fontFamily: 'Poppins',
        paddingLeft: 15
    },

    cryptoInfoCon: {
        paddingTop: 25,
        flexDirection: "row",
        alignItems: "center",
    },

})




export default ConvertList