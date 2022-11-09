import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Pressable
} from "react-native";
import { LineChart, CandlestickChart } from "react-native-wagmi-charts";
import { AntDesign, MaterialIcons, Feather, FontAwesome, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import {
  getDetailedCoinData,
  getCoinMarketChart,
  getCandleChartData,
} from "../store/action/appStorage";
import { useRoute } from "@react-navigation/native";
import Error from '../component/errorComponent'
import FilterComponent from '../component/filterComponent'
import {truncate} from "../utils/util"
import { useDispatch, } from "react-redux"
import millify from "millify";
import Loader from '../loaders/Loader'

const filterDaysArray = [
  { filterDay: "1", filterText: "24h" },
  { filterDay: "7", filterText: "7d" },
  { filterDay: "30", filterText: "30d" },
  { filterDay: "365", filterText: "1y" },
  { filterDay: "max", filterText: "All" },
];

const PriceChart = ({ navigation }) => {
  let dispatch = useDispatch()
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [coinCandleChartData, setCoinCandleChartData] = useState(null);
  const [header, setHeader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedRange, setSelectedRange] = useState("1");
  const [isCandleChartVisible, setIsCandleChartVisible] = useState(false);

  const route = useRoute();

  
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



  const {
    name: coinId,
    market_cap,
    market_cap_rank,
    percentage,
    total_volume,
  } = route.params



  const buyCrypto = () => {
    return navigation.navigate('Login')
  }

  

  const fetchCoinData = async () => {
    setIsLoading(true)
    const fetchedCoinData = await dispatch(getDetailedCoinData(coinId));
    if (!fetchedCoinData.bool) {
      //throw error screen
      setIsError(true)
      setIsLoading(false)
      return
    }
    setCoin(fetchedCoinData.message);
    setIsLoading(false)

  };

  const fetchMarketCoinData = async (selectedRangeValue) => {
    setIsLoading(true)
    const fetchedCoinMarketData = await dispatch(getCoinMarketChart(
      coinId,
      selectedRangeValue
    ));
    if (!fetchedCoinMarketData.bool) {
      //throw error screen
      setIsError(true)
      setIsLoading(false)
      return
    }

    setCoinMarketData(fetchedCoinMarketData.message);
    setIsLoading(false)
  };

  const fetchCandleStickChartData = async (selectedRangeValue) => {

    setIsLoading(true)
    const fetchedSelectedCandleChartData = await dispatch(getCandleChartData(
      coinId,
      selectedRangeValue
    ));
    if (!fetchedSelectedCandleChartData.bool) {
      //throw error screen
      setIsError(true)
      setIsLoading(false)
      return
    }

    setCoinCandleChartData(fetchedSelectedCandleChartData.message);

    setIsLoading(false)
  };
  const scrollHandler = (e) => {
    if (e.nativeEvent.contentOffset.y > 70) {
      setHeader(true)
    } else {
      setHeader(false)
    }
  }


 

  useEffect(() => {
    fetchCoinData();
    fetchMarketCoinData(1);
    fetchCandleStickChartData();
  }, []);


  const onSelectedRangeChange = (selectedRangeValue) => {
    setSelectedRange(selectedRangeValue);
    fetchMarketCoinData(selectedRangeValue);
    fetchCandleStickChartData(selectedRangeValue);
  };

  const memoOnSelectedRangeChange = React.useCallback(
    (range) => onSelectedRangeChange(range), []);

  if (isLoading || !coin || !coinMarketData || !coinCandleChartData) {
    return <Loader />
  }
  let reload = () => {
    setIsError(false)
    fetchCoinData()
    fetchMarketCoinData(1)
    fetchCandleStickChartData();

  }
  if (isError) {
    return <Error tryAgain={reload} />;
  }

  const {
    name,
    market_data: {
      current_price,
      price_change_percentage_24h,
    },
  } = coin;

  const { prices } = coinMarketData;

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "green";

  const chartColor = current_price.usd > prices[0][1] ? "green" : "#ea3943";

  const screenWidth = Dimensions.get("window").width;

  const formatCurrency = ({ value }) => {
    "worklet";
    if (value === "") {
      if (current_price.usd < 1) {
        return `$${current_price.usd}`;
      }
      return `$${current_price.usd.toFixed(3)}`;
    }
    if (current_price.usd < 1) {
      return `$${parseFloat(value).toFixed(3)}`;
    }
    return `$${parseFloat(value).toFixed(3)}`;
  };



  return (
    <SafeAreaView style={{ paddingHorizontal: 10, backgroundColor: '#fff', flex: 1 }}>
      <ScrollView style={styles.chartCon} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]} onScroll={scrollHandler}>
        {header ? <View >
          <View style={{ ...styles.scrollNavigationHeader }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ ...styles.goback }} >
              <Feather name="arrow-left" size={24} color="rgb(44, 44, 44)" />
            </TouchableOpacity>

            <Text style={{ ...styles.headerName }}>{name}</Text>

            <View style={styles.favouriteContainer}>
              <Pressable>
                <MaterialIcons name="star" size={22} fontWeight='Poppins' color="black" />

              </Pressable>

              <Pressable>
                <AntDesign name="download" size={22} fontWeight='Poppins' color="rgb(44, 44, 44)" />

              </Pressable>




            </View>

          </View>
        </View> : <></>}


        <LineChart.Provider
          data={prices.map(([timestamp, value]) => ({ timestamp, value }))}
        >

          {header ? <></> : <View style={{ ...styles.priceContainer, opacity: header ? 0 : 1 }}>
            <View style={styles.navigationHeader}>
              <TouchableOpacity style={styles.close} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={22} fontWeight='Poppins' color="rgb(44, 44, 44)" />
              </TouchableOpacity>



            </View>


            <View>
              <Text style={styles.name}>{name}</Text>
              <View style={styles.favoriteContainer}>
                <LineChart.PriceText
                  format={formatCurrency}
                  style={styles.currentPrice}
                />


                <View style={styles.favorite}>
                  <Pressable style={styles.favoriteIcon} >
                      <MaterialIcons name="star" size={22} fontWeight='Poppins' color="black" />
                  </Pressable>

                  <Pressable style={styles.favoriteIcon} >
                    <AntDesign name="download" size={22} fontWeight='Poppins' color="rgb(44, 44, 44)" />
                  </Pressable>
                </View>

              </View>

            </View>

            <View
              style={{
                paddingHorizontal: 3,
                paddingVertical: 8,
                borderRadius: 5,
                flexDirection: "row",
                color: percentageColor
              }}
            >
              <Feather
                name={price_change_percentage_24h < 0 ? "arrow-down-right" : "arrow-up-right"}
                size={24}
                color={percentageColor}
                style={{ alignSelf: "center", marginRight: 5 }}
              />
              <Text style={{ ...styles.priceChange, color: percentageColor }}>
                {Math.abs(price_change_percentage_24h)?.toFixed(3)}%
              </Text>
            </View>


          </View>}

          <View style={{ ...styles.chartContainer, marginTop: header ? 70 : 0 }}>
            {isCandleChartVisible ? (
              <CandlestickChart.Provider
                data={coinCandleChartData.map(
                  ([timestamp, open, high, low, close]) => ({
                    timestamp,
                    open,
                    high,
                    low,
                    close,
                  })
                )}
              >
                <CandlestickChart height={screenWidth / 1.3} width={screenWidth / 1.5}>
                  <CandlestickChart.Candles />
                  <CandlestickChart.Crosshair>
                    <CandlestickChart.Tooltip />
                  </CandlestickChart.Crosshair>
                </CandlestickChart>
                <View style={styles.candleStickDataContainer}>
                  <View>
                    <Text style={styles.candleStickTextLabel}>Open</Text>
                    <CandlestickChart.PriceText
                      style={styles.candleStickText}
                      type="open"
                    />
                  </View>
                  <View>
                    <Text style={styles.candleStickTextLabel}>High</Text>
                    <CandlestickChart.PriceText
                      style={styles.candleStickText}
                      type="high"
                    />
                  </View>
                  <View>
                    <Text style={styles.candleStickTextLabel}>Low</Text>
                    <CandlestickChart.PriceText
                      style={styles.candleStickText}
                      type="low"
                    />
                  </View>
                  <View>
                    <Text style={styles.candleStickTextLabel}>Close</Text>
                    <CandlestickChart.PriceText
                      style={styles.candleStickText}
                      type="close"
                    />
                  </View>
                </View>
                <CandlestickChart.DatetimeText
                  style={{ color: "#fff", fontWeight: "700", margin: 10 }}
                />
              </CandlestickChart.Provider>
            ) : (
              <LineChart height={screenWidth / 1.4} width={screenWidth / 1.2}>
                <LineChart.Path color={chartColor} />
                <LineChart.CursorCrosshair color={chartColor} />
              </LineChart>
            )}

          </View>
          <View style={styles.filtersContainer}>
            {filterDaysArray.map((day) => (
              <FilterComponent
                filterDay={day.filterDay}
                filterText={day.filterText}
                selectedRange={selectedRange}
                setSelectedRange={memoOnSelectedRangeChange}
                key={day.filterText}
              />
            ))}

          </View>
        </LineChart.Provider>

        <View style={styles.aboutContainer}>
          <Text style={styles.aboutHead}>About {name}</Text>
          <Text style={styles.aboutText}>{truncate(coin.description.en, 400)}</Text>
        </View>
        <View style={styles.marketContainer}>
          <Text style={styles.aboutHead}>Market stats</Text>


          <View style={styles.listContainer}>
            <View style={styles.leftListCon}>

              <View style={styles.logoCon}>
                <AntDesign name="layout" size={20} color='#1652f0' />

              </View>
              <View style={styles.logoTextCon}>
                <Text style={styles.logoText}>Market cap</Text>

              </View>



            </View>
            <View style={styles.rightListConCon}>
              <Text style={styles.rightListText}>{millify(market_cap)}</Text>


            </View>
          </View>

          <View style={styles.listContainer}>
            <View style={styles.leftListCon}>

              <View style={styles.logoCon}>
                <Entypo name="bar-graph" size={20} color='#1652f0' />

              </View>
              <View style={styles.logoTextCon}>
                <Text style={styles.logoText}>Volume</Text>

              </View>



            </View>
            <View style={styles.volumeListConCon}>
              <View style={styles.volumeListCon}>

                <Text style={{ ...styles.volumeListText, marginBottom: 5 }}>{millify(total_volume)}</Text>

              </View>
              <View style={styles.volumeListCon}>

                <Text style={{ ...styles.volumeListText, fontSize: 18, color: percentage < 0 ? 'red' : 'black' }}>{percentage < 0 ? <Feather name="arrow-down-right" size={20} color="red" /> : <Feather name="arrow-up-right" size={20} color="green" />}{Math.abs(percentage)?.toFixed(3)}%</Text>

              </View>


            </View>
          </View>

          <View style={styles.listContainer}>
            <View style={styles.leftListCon}>

              <View style={styles.logoCon}>
                <FontAwesome name="clock-o" size={20} color='#1652f0' />

              </View>
              <View style={styles.logoTextCon}>
                <Text style={styles.logoText}>Circulating supply</Text>

              </View>



            </View>
            <View style={styles.rightListConCon}>
              <Text style={styles.rightListText}>{millify(market_cap)}</Text>


            </View>
          </View>

          <View style={styles.listContainer}>
            <View style={styles.leftListCon}>

              <View style={styles.logoCon}>
                <MaterialCommunityIcons name="star-four-points" size={20} color='#1652f0' />

              </View>
              <View style={styles.logoTextCon}>
                <Text style={styles.logoText}>Popularity</Text>

              </View>



            </View>
            <View style={styles.popularityListCon}>
              <Text style={styles.rightListText}>#{market_cap_rank}</Text>


            </View>
          </View>



        </View>
      </ScrollView>



      <View style={styles.buttonCon} >
        <TouchableOpacity style={styles.button} onPress={buyCrypto}>
          <Text style={styles.buttonText}>buy</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollNavigationHeader: {
    paddingBottom: 10,
    backgroundColor: '#fff',
    zIndex: 10,
    width: '100%',
    borderBottomColor: 'rgb(197, 197, 197)',
    borderBottomWidth: .5,
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',


  },
  headerName: {
    fontFamily: 'ABeeZee',
    fontSize: 20,
    fontFamily: 'Poppins'

  },
  goback: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'

  },
  favouriteContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '30%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  chartCon: {
    height: Dimensions.get('window').height / 1,
    marginTop: 10,

  },
  navigationHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    zIndex: 5,
    paddingTop: 20

  },
  currentPrice: {
    color: "black",
    fontSize: 25,
    fontWeight: "600",
    letterSpacing: 1,
    flex: 2
  },
  name: {
    color: "rgb(100,100,100)",
    fontSize: 20,
    fontFamily: 'Poppins'
  },
  priceContainer: {
    padding: 15,
    flexDirection: "column",
  },
  favoriteContainer: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center"
  },
  favorite: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    flex: 1
  },
  priceChange: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "500",
    fontFamily: 'Poppins'
  },
  favoriteIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'rgb(240,240,240)',
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center"

  },
  input: {
    flex: 1,
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    padding: 10,
    fontSize: 16,
    color: "#fff",
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 30,
  },
  candleStickText: {
    color: "#fff",
    fontWeight: "700",
  },
  candleStickDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 30,
  },
  candleStickTextLabel: {
    color: 'rgb(100,100,100)',
    fontSize: 13
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  aboutContainer: {
    paddingVertical: 20,
    borderTopWidth: .5,
    borderTopColor: 'rgb(200,200,200)',
    borderBottomWidth: .5,
    borderBottomColor: 'rgb(200,200,200)',
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 8
  },
  marketContainer: {
    paddingVertical: 20,
    borderTopWidth: .5,
    borderTopColor: 'rgb(200,200,200)',
    borderBottomWidth: .5,
    borderBottomColor: 'rgb(200,200,200)',
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 15
  },
  aboutHead: {
    fontSize: 23,
    marginBottom: 10,
    fontFamily: 'Poppins'
  },
  aboutText: {
    fontSize: 18,
    fontFamily: 'ABeeZee',
    color: 'rgb(100,100,100)'

  },
  marketStatContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  marketStatHead: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Poppins'
  },
  buttonCon: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Poppins',
    backgroundColor: '#fff',
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: '100%',
    backgroundColor: '#1652f0',
    paddingVertical: 17,
    marginHorizontal: '5%',
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins'
  },

  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 25,
    paddingTop: 25,
    alignItems: 'center',
    width: Dimensions.get('window').width
  },

  leftListCon: {
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    flex: 1,


  },
  logoCon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },

  logoTextCon: {
    paddingLeft: 10

  },
  logoText: {
    fontSize: 19,
    fontFamily: 'ABeeZee'
  },
  rightListConCon: {
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'

  },
  rightListText: {
    fontSize: 19,
    fontFamily: 'ABeeZee',
    paddingRight: 5

  },
  popularityListCon: {
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'

  },
  volumeListConCon: {
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start'

  },
  volumeListCon: {
    display: 'flex',
    flexDirection: "column",
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',

  },
  volumeListText: {
    fontSize: 19,
    fontFamily: 'ABeeZee',
    paddingRight: 5
  }




});


export default PriceChart;