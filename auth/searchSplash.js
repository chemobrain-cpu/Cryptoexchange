import React, { useState, useEffect, useCallback } from 'react'
import { View, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, FlatList, KeyboardAvoidingView } from 'react-native'
import { Feather, FontAwesome } from '@expo/vector-icons'
import CryptoCard from '../component/currencyContainer'
import WalletAssetLoader from "../loaders/walletAssetsLoader";
import { loadCoins } from "../store/action/appStorage";
import Error from '../component/errorComponent'
import { useDispatch, } from "react-redux"
import FooterLoader from '../loaders/listFooterLoader'


let SearchSplash = ({ navigation }) => {
    //getting crypto data from coinmarcap
    let [text, setText] = useState('')
    let [focus, setFocus] = useState(false)
    let [coins, setCoins] = useState([])
    let [filteredCoins, setFilteredCoins] = useState([])
    let [isLoading, setIsLoading] = useState(true)
    let [error, setError] = useState(false)
    let [recall, setRecall] = useState(false)
    let dispatch = useDispatch()

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

    let navigationHandler = (coin) => {
        navigation.navigate('PriceChart', { price: coin.current_price, percentage: parseFloat(coin.price_change_percentage_24h).toFixed(3), name: coin.id.toLowerCase(), market_cap: coin.market_cap, total_volume: coin.total_volume, circulating_supply: coin.circulating_supply, market_cap_rank: coin.market_cap_rank })
    }

    let Footer = useCallback(() => {
        return <FooterLoader />
    }, [])

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


    let onEndFetch = async (pageNumber) => {
        return

    }


    useEffect(() => {
        let isSuscribe = true
        setError(false)
        dispatch(loadCoins(1)).then(response => {
            if (isSuscribe) {
                if (!response.bool) {
                    setError(true)
                    setIsLoading(false)
                    return
                }
                //removing duplicate
                let arr = [...coins, ...response.message]
                let uniqueIds = []
                const unique = arr.filter(element => {
                    const isDuplicate = uniqueIds.includes(element.id)
                    if (!isDuplicate) {
                        uniqueIds.push(element)
                        return true
                    }
                    return false
                })

                let selectedCoin = unique.filter((data, index) => {
                    if (index < 30) {
                        return data
                    }
                })

                setCoins(selectedCoin);
                setFilteredCoins(selectedCoin);
                setIsLoading(false)


            }
        })
        //cleanup function 
        return ()=>{
            isSuscribe = false
        }

    }, [recall])

    let fetchData = ()=>{
        setRecall(prev=>!prev)
    }


    const renderItem = ({ item, index }) => <CryptoCard navigationHandler={() => navigationHandler(item)}
        key={item}
        coin={item}
    />


    if (isLoading) {
        return <WalletAssetLoader title="Search assets" walletAssetLoaderGoBack />
    }
    if (error) {
        return <Error tryAgain={fetchData} navigation={navigation} />
    }

    return <SafeAreaView style={styles.screen}>
        <View style={styles.headerContainer}>
            <View style={styles.assetsheaderCon}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={25} color={"rgb(44, 44, 44)"} />
                </TouchableOpacity>

                <KeyboardAvoidingView style={focus ? { ...styles.inputContainer, borderColor: '#1652f0' } : { ...styles.inputContainer }}>
                    <FontAwesome name="search" size={18} color={focus ? "#1652f0" : "rgb(44, 44, 44)"} />
                    <TextInput
                        style={{ ...styles.input, borderColor: 'orange' }}
                        onChangeText={changeText}
                        value={text}
                        placeholder="Search"
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


        <View style={styles.middlesection}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredCoins}
                keyExtractor={(item, index) => index}
                initialNumToRender={50}
                renderItem={renderItem}
                onEndReached={() => onEndFetch(coins.length / 50 + 1)}
                ListFooterComponent={Footer}
            />
        </View>
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
        paddingTop:30,
        paddingHorizontal: 15
    },
    trendingContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        zIndex: 10,
        paddingTop: 20,
        paddingHorizontal: 15
    },
    assetsheaderCon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 10

    },
    inputContainer: {
        width: '80%',
        borderRadius: 25,
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginLeft: 12,


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




export default SearchSplash