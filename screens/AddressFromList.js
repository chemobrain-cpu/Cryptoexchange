import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Dimensions,KeyboardAvoidingView} from 'react-native'
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useSelector, } from "react-redux"
import { useDispatch, } from "react-redux"
import { changeWalletAsset, loadCoins } from "../store/action/appStorage";
import Error from '../component/errorComponent'
import UserAssetCard from "../component/userAssetsCard";
import Loader from '../loaders/indicatorLoader'
import FooterLoader from '../loaders/listFooterLoader'
import { OptimizedFlatList } from 'react-native-optimized-flatlist'

let AddressFromList = ({ navigation }) => {
    //getting crypto data from coinmarcap
    let [text, setText] = useState('')
    let [focus, setFocus] = useState(false)
    let [coins, setCoins] = useState([])
    let [filteredCoins, setFilteredCoins] = useState([])
    let [isLoading, setIsLoading] = useState(true)
    let { user } = useSelector(state => state.userAuth)
    let [error, setError] = useState(false)
    let [isRefreshing, setIsRefreshing] = useState(false)
    let dispatch = useDispatch()

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



    //handler to change selected wallet
    let selectionHandler = async (data) => {
        try {
            setIsLoading(true)
            data.user = user
            let res = await dispatch(changeWalletAsset(data))

            if (!res.bool) {
                setError(true)
                setIsLoading(false)
                return
            }
            setIsLoading(false)

        } catch (err) {
            console.log(err)
            setError(true)
            setIsLoading(false)
        }

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
        try {
            setError(false)
            let response = await dispatch(loadCoins(1))
            
            if (!response.bool) {
                setError(true)
                setIsLoading(false)
                return
            }
            
            setCoins((existingCoins) => [...existingCoins, ...response.message]);
            setFilteredCoins((existingCoins) => [...existingCoins, ...response.message]);
            setIsLoading(false)

        } catch (err) {
            setError(true)
            setIsLoading(false);
        }
    }

    let onEndFetch = async (pageNumber) => {
        // You can await here
        if (isRefreshing) {
            return;
        }
        let response = await dispatch(loadCoins(pageNumber))
        if (!response.bool) {

            setError(true)
            return
        }
        setCoins((existingCoins) => [...existingCoins, ...response.message]);
        setFilteredCoins((existingCoins) => [...existingCoins, ...response.message]);

    }

    let Footer = ()=>{
        return <FooterLoader/>
    }

    useEffect(() => {
        fetchData()
    }, [])

    const tryAgain = () => {
        fetchData()
    }

    const renderItem = ({ item, index }) => {
        return <UserAssetCard
            coin={item}
            user={user}
            navigationHandler={selectionHandler}
        />
    }


    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <Error tryAgain={tryAgain} />
    }


    return <SafeAreaView style={styles.screen}>
        <View style={styles.headerContainer}>
            <View style={styles.assetsheaderCon}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconCon}>
                    <Feather name="arrow-left" size={25} color={"rgb(44,44,44)"} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.headerTextCon} onPress={() => navigation.goBack()}>
                    <Text style={styles.headerText}>Select an asset</Text>
                </TouchableOpacity>


            </View>
            <View style={styles.searchCon}>
                <KeyboardAvoidingView style={focus ? { ...styles.inputContainer, borderColor: '#1652f0' } : { ...styles.inputContainer }}>
                    <FontAwesome name="search" size={18} color={focus ? "#1652f0" : "grey"} />

                    <TextInput
                        style={{ ...styles.input, borderColor: 'orange' }}
                        onChangeText={changeText}
                        value={text}
                        placeholder="Search"
                    />
                </KeyboardAvoidingView>

            </View>
        </View>


        <OptimizedFlatList
            showsVerticalScrollIndicator={false}
            data={filteredCoins}
            keyExtractor={(item, index) => item.id}
            initialNumToRender={50}
            renderItem={renderItem}
            onEndReached={() => onEndFetch(coins.length / 100 + 1)}
            ListFooterComponent={Footer}
        />

    </SafeAreaView>

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',

        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        zIndex: 10,
        paddingTop: 20,

        height: Dimensions.get('window').height / 5

    },
    headerIconCon: {
        flex: 1

    },
    headerTextCon: {
        flex: 3

    },
    headerText: {
        fontSize: 18,
        fontFamily: 'Poppins'

    },
    assetsheaderCon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
        paddingTop: 10
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
    /* list footer loader */
    

})


export default AddressFromList