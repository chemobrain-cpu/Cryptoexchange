import React, { useState} from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, ScrollView, Dimensions,ActivityIndicator,KeyboardAvoidingView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress'
import { useDispatch,useSelector} from "react-redux";
import { phoneNumber } from "../store/action/appStorage";
import AuthModal from '../modals/authModal'
import { useRoute} from "@react-navigation/native";
import {Picker} from '@react-native-picker/picker';

const VerifyNumber = ({navigation}) => {
    let [phone, setPhone] = useState('')
    let [country, setCountry] = useState('')
    const [isAuthError,setIsAuthError] = useState(false)
    const [authInfo,setAuthInfo] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const route = useRoute();
    let dispatch = useDispatch()
    
    const {
        email
    } = route.params
    

   let { background, importantText, normalText, fadeColor, blue, fadeButtonColor } = useSelector(state => state.userAuth)

    
   
    let changePhone = (e) => {
        setPhone(e)
    }
    let selectCountryHandler = (country)=>{
        setCountry(country)
    }
    let submitHandler = async()=>{
        //validation
        if(!phone|| !country || phone.length <= 5){
            return
        }
        setIsLoading(true)
       try{
        let res = await dispatch(phoneNumber({
            phone,
            country,
            email:email
        }))
        if(!res.bool){
            setIsLoading(false)
            setAuthInfo(res.message)
            setIsAuthError(true)
            return
        }
        setIsLoading(false)
        navigation.navigate('Authenticate',{
            email:res.message
        })
       }catch(err){
            setIsLoading(false)
            setAuthInfo(err.message)
            setIsAuthError(true)
            return
       } 
    }
    const updateAuthError = ()=>{
        setIsAuthError(prev=>!prev)
    }

    return (<>
     {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo}/>}
     <SafeAreaView style={{ ...styles.screen, backgroundColor: background }}>
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
                <Text style={{ ...styles.headerText, color: importantText }}>
                    Set up 2-step verification
                </Text >
                <Text style={{ ...styles.text, color: normalText }}>Enter your phone number so we can text you an authentication code</Text>





                <KeyboardAvoidingView style={styles.formContainer}>
                    <View style={styles.codeCon}>
                        <Text style={{...styles.countryText,color:normalText}}>Country</Text>
                        <View style={{...styles.selectorContainer,backgroundColor:background}}>
                        <Picker
                            style={{ color: normalText }}
                            onValueChange={selectCountryHandler}
                            selectedValue={country}
                            >
                                <Picker.Item label="Afghanistan(+93)" value ="Afghanistan(+93)"  />
                                <Picker.Item label="Albania(+355)"  value = "Albania(+355)"   />
                                <Picker.Item label="Algeria(+213)"  value = "Algeria(+213)"   />
                                <Picker.Item label="American Samoa(+1)"  value = "American Samoa(+1)"   />
                                <Picker.Item label="Andorra(+376)"  value = "Andorra(+376)"   />
                                <Picker.Item label="Angola(+244)"  value = "Angola(+244)"   />
                                <Picker.Item label="Anguilla(+1)"  value = "Anguilla(+1)"   />
                                <Picker.Item label="Antarctica(+672)"  value = "Antarctica(+672)"   />
                                <Picker.Item label="Antigua and Barbuda(+1)"  value = "Antigua and Barbuda(+1)"   />
                                <Picker.Item label="Argentina(+54)"  value = "Argentina(+54)"   />
                                <Picker.Item label="Armenia(+374)"  value = "Armenia(+374)"   />
                                <Picker.Item label="Aruba(+297)"  value = "Aruba(+297)"   />
                                <Picker.Item label="Australia(+43)"  value = "Australia(+43)"   />
                                <Picker.Item label="Azerbaijan(+994)"  value = "Azerbaijan(+994)"   />
                                <Picker.Item label="Bahamas(+1)"  value = "Bahamas(+1)"   />
                                <Picker.Item label="Bahrain(+973)"  value = "Bahrain(+973)"   />
                                <Picker.Item label="Bangladesh(+880)"  value = "Bangladesh(+880)"   />
                                <Picker.Item label="Barbados(+1)"  value = "Barbados(+1)"   />
                                <Picker.Item label="Belarus(+375)"  value = "Belarus(+375)"   />
                                <Picker.Item label="Belgium(+32)"  value = "Belgium(+32)"   />
                                <Picker.Item label="Belize(+501)"  value = "Belize(+501)"   />
                                <Picker.Item label="Benin(+229)"  value = "Benin(+229)"   />
                                <Picker.Item label="Bermuda(+1)"  value = "Bermuda(+1)"   />
                                <Picker.Item label="Bhutan(+975)"  value = "Bhutan(+975)"   />
                                <Picker.Item label="Bolivia(+591)"  value = "Bolivia(+591)"   />
                                <Picker.Item label="Bonaire, Sint Eustatius and Saba (+599)"  value = "Bonaire, Sint Eustatius and Saba (+599)"   />
                                <Picker.Item label="Bosnia and Herzegovina(+387)"  value = "Bosnia and Herzegovina(+387)"   />
                                <Picker.Item label="Botswana(+267)"  value = "Botswana(+267)"   />
                                <Picker.Item label="Bouvet Island(+47)"  value = "Bouvet Island(+47)"   />
                                <Picker.Item label="Brazil(+55)"  value = "Brazil(+55)"   />
                                <Picker.Item label="British Indian Ocean Territory(+246)"  value = "British Indian Ocean Territory(+246)"   />
                                <Picker.Item label="Brunei Darussalam(+673)"  value = "Brunei Darussalam(+673)"   />
                                <Picker.Item label="Bulgaria(+359)"  value = "Bulgaria(+359)"   />
                                <Picker.Item label="Burkina Faso(+226)"  value = "Burkina Faso(+226)"   />
                                <Picker.Item label="Burundi(+257)"  value = "Burundi(+257)"   />
                                <Picker.Item label="Cambodia(+855)"  value = "Cambodia(+855)"   />
                                <Picker.Item label="Cameroon(+237)"  value = "Cameroon(+237)"   />
                                <Picker.Item label="Canada(+1)"  value = "Canada(+1)"   />
                                <Picker.Item label="Cape Verde(+238)"  value = "Cape Verde(+238)"   />
                                <Picker.Item label="Cayman Islands(+1)"  value = "Cayman Islands(+1)"   />
                    
                                <Picker.Item label="Central African Republic(+236)"  value = "Central African Republic(+236)"   />
                                <Picker.Item label="Chad(+235)"  value = "Chad(+235)"   />
                                <Picker.Item label="Chile(+56)"  value = "Chile(+56)"   />
                                <Picker.Item label="China(+86)"  value = "China(+86)"   />
                                <Picker.Item label="Christmas Island(+61)"  value = "Christmas Island(+61)"   />
                                <Picker.Item label="Cocos Islands(+61)"  value = "Cocos Islands(+61)"   />
                                <Picker.Item label="Colombia(+57)"  value = "Colombia(+57)"   />
                                <Picker.Item label="Comoros(+269)"  value = "Comoros(+269)"   />
                                <Picker.Item label="Congo(+242)"  value = "Congo(+242)"   />
                                <Picker.Item label="Congo,The Democratic Republic Of The(+243)"  value = "Congo,The Democratic Republic Of The(+243)"   />
                                <Picker.Item label="Cook Islands(+682)"  value = "Cook Islands(+682)"   />
                                <Picker.Item label="Costa Rica(+596)"  value = "Costa Rica(+596)"   />
                                <Picker.Item label="Croatia(+385)"  value = "Croatia(+385)"   />
                                <Picker.Item label="Cuba(+53)"  value = "Cuba(+53)"   />
                                <Picker.Item label="Curacao(+599)"  value = "Curacao(+599)"   />
                                <Picker.Item label="Cyprus(+357)"  value = "Cyprus(+357)"   />
                                <Picker.Item label="Czech Republic(+420)"  value = "Czech Republic(+420)"   />
                                <Picker.Item label="Cote D'Ivoire(+225)"  value = "Cote D'Ivoire(+225)"   />
                                <Picker.Item label="Denmark(+45)"  value = "Denmark(+45)"   />
                                <Picker.Item label="Djibouti(+253)"  value = "Djibouti(+253)"   />
                                <Picker.Item label="Dominica(+1)"  value = "Dominica(+1)"   />
                                <Picker.Item label="Dominican Republic(+1)"  value = "Dominican Republic(+1)"   />
                                <Picker.Item label="Ecuador(+593)"  value = "Ecuador(+593)"   />
                                <Picker.Item label="Egypt(+20)"  value = "Egypt(+20)"   />
                                <Picker.Item label="El Salvador(+503)"  value = "El Salvador(+503)"   />
                                <Picker.Item label="Equatorial Guinea(+240)"  value = "Equatorial Guinea(+240)"   />
                                <Picker.Item label="Eritrea(+291)"  value = "Eritrea(+291)"   />
                                <Picker.Item label="Estonia(+372)"  value = "Estonia(+372)"   />
                                <Picker.Item label="Ethiopia(+251)"  value = "Ethiopia(+251)"   />
                                <Picker.Item label="Falkland Islands(+500)"  value = "Falkland Islands(+500)"   />
                                <Picker.Item label="Faroe Islands(+298)"  value = "Faroe Islands(+298)"   />
                                <Picker.Item label="Fiji(+679)"  value = "Fiji(+679)"   />
                                <Picker.Item label="Finland(+358)"  value = "Finland(+358)"   />
                                <Picker.Item label="France(+33)"  value = "France(+33)"   />
                                <Picker.Item label="French Guiana(+594)"  value = "French Guiana(+594)"   />
                                <Picker.Item label="French Polynesia(+689)"  value = "French Polynesia(+689)"  />
                                <Picker.Item label="French Southern Territories(+262)"  value = "French Southern Territories(+262)"   />
                                <Picker.Item label="Gabon(+241)"  value = "Gabon(+241)"   />
                                <Picker.Item label="Gambia(+220)"  value = "Gambia(+220)"   />
                                <Picker.Item label="Georgia(+995)"  value = "Georgia(+995)"   />
                                <Picker.Item label="Germany(+49)"  value = "Germany(+49)"   />
                                <Picker.Item label="Ghana(+233)"  value = "Ghana(+233)"   />
                                <Picker.Item label="Gibraltar(+350)"  value = "Gibraltar(+350)"   />
                                <Picker.Item label="Greece(+30)"  value = "Greece(+30)"   />
                                <Picker.Item label="Greenland(+299)"  value = "Greenland(+299)"   />
                                <Picker.Item label="Greenada(+1)"  value = "Greenada(+1)"   />
                                <Picker.Item label="Guadeloupe(+590)"  value = "Guadeloupe(+590)"   />
                                <Picker.Item label="Guam(+1)"  value = "Guam(+1)"   />
                                <Picker.Item label="Guatemala(+502)"  value = "Guatemala(+502)"   />
                                <Picker.Item label="Guernsey(+44)"  value = "Guernsey(+44)"   />
                                <Picker.Item label="Guinea(+224)"  value = "Guinea(+224)"   />
                                <Picker.Item label="Guinea Bissau(+245)"  value = "Guinea Bissau(+245)"   />
                                <Picker.Item label="Guyana(+224)"  value = "Guyana(+224)"   />
                                <Picker.Item label="Haiti(+509)"  value = "Haiti(+509)"   />
                                <Picker.Item label="Heard and McDonald Islands(+672)"  value = "Heard and McDonald Islands(+672)"   />
                                <Picker.Item label="Holy See(+39)"  value = "Holy See(+39)"   />
                                <Picker.Item label="Honduras(+504)"  value = "Honduras(+504)"   />
                                <Picker.Item label="Hong Kong(+852)"  value = "Hong Kong(+852)"   />
                                <Picker.Item label="Hungary(+36)"  value = "Hungary(+36)"   />
                                <Picker.Item label="Iceland(+354)"  value = "Iceland(+354)"   />
                                <Picker.Item label="India(+91)"  value = "India(+91)"   />
                                <Picker.Item label="Indonesia(+62)"  value = "Indonesia(+62)"   />
                                <Picker.Item label="Iran,Islamic Republic Of(+98)"  value = "Iran,Islamic Republic Of(+98)"   />
                                <Picker.Item label="Iraq(+964)"  value = "Iraq(+964)"   />
                                <Picker.Item label="Ireland(+353)"  value = "Ireland(+353)"   />
                                <Picker.Item label="Isle of Man(+44)"  value = "Isle of Man(+44)"   />
                                <Picker.Item label="Isreal(+972)"  value = "Isreal(+972)"   />
                                <Picker.Item label="Italy(+39)"  value = "Italy(+39)"   />
                                <Picker.Item label="Jamaica(+1)"  value = "Jamaica(+1)"   />
                                <Picker.Item label="Japan(+81)"  value = "Japan(+81)"   />
                                <Picker.Item label="Jersey(+44)"  value = "Jersey(+44)"   />
                                <Picker.Item label="Jordan(+962)"  value = "Jordan(+962)"   />
                                <Picker.Item label="Kazakhstan(+7)"  value = "Kazakhstan(+7)"   />
                                <Picker.Item label="Kenya(+254)"  value = "Kenya(+254)"   />
                                <Picker.Item label="Kiribati(+686)"  value = "Kiribati(+686)"   />
                                <Picker.Item label="Korea,Democratic People's Republic of (+850)"  value = "Korea,Democratic People's Republic of (+850)"   />
                                <Picker.Item label="Korea,Republic of (+82)"  value = "Korea,Republic of (+82)"   />
                                <Picker.Item label="Kuwait(+965)"  value = "Kuwait(+965)"   />
                                <Picker.Item label="Kyrgyzstan(+996)"  value = "Kyrgyzstan(+996)"   />
                                <Picker.Item label="Lao People's Democratic  Republic  (+856)"  value = "Lao People's Democratic  Republic  (+856)"   />
                                <Picker.Item label="Latvia(+371)"  value = "Latvia(+371)"   />
                                <Picker.Item label="Lebanon(+961)"  value = "Lebanon(+961)"   />
                                <Picker.Item label="Lesotho(+266)"  value = "Lesotho(+266)"   />
                                <Picker.Item label="Liberia(+231)"  value = "Liberia(+231)"   />
                                <Picker.Item label="Libya(+281)"  value = "Libya(+281)"   />
                                <Picker.Item label="Liechtenstein(+423)"  value = "Liechtenstein(+423)"   />
                                <Picker.Item label="Lithuania(+370)"  value = "Lithuania(+370)"   />
                                <Picker.Item label="Luxembourg(+352)"  value = "Luxembourg(+352)"   />
                                <Picker.Item label="Macao(+853)"  value = "Macao(+853)"   />
                                <Picker.Item label="Madagascar(+261)"  value = "Madagascar(+261)"   />
                                <Picker.Item label="Malawi(+265)"  value = "Malawi(+265)"   />
                                <Picker.Item label="MalaySia(+60)"  value = "MalaySia(+60)"   />
                                <Picker.Item label="Maldives(+960)"  value = "Maldives(+960)"   />
                                <Picker.Item label="Mali(+223)"  value = "Mali(+223)"   />
                                <Picker.Item label="Malta(+356)"  value = "Malta(+356)"  />
                                <Picker.Item label="Marshall Islands(+692)"  value = "Marshall Islands(+692)"   />
                                <Picker.Item label="Martinique(+596)"  value = "Martinique(+596)"   />
                                <Picker.Item label="Mauritania(+222)"  value = "Mauritania(+222)"   />
                                <Picker.Item label="Mauritius(+230)"  value = "Mauritius(+230)"   />
                                <Picker.Item label="Mayotte(+262)"  value = "Mayotte(+262)"   />
                                <Picker.Item label="Mexico(+52)"  value = "Mexico(+52)"   />
                                <Picker.Item label="Micronesia,Federated States Of(+691)"  value = "Micronesia,Federated States Of(+691)"   />
                                <Picker.Item label="Moldova, Republic of(+373)"  value = "Moldova, Republic of(+373)"   />
                                <Picker.Item label="Monaco(+377)"  value = "Monaco(+377)"   />
                                <Picker.Item label="Mongolia(+976)"  value = "Mongolia(+976)"   />
                                <Picker.Item label="Montenegro(+382)"  value = "Montenegro(+382)"   />
                                <Picker.Item label="Montserrat(+1)"  value = "Montserrat(+1)"   />
                                <Picker.Item label="Morocco(+212)"  value = "Morocco(+212)"   />
                                <Picker.Item label="Mozambique(+258)"  value = "Mozambique(+258)"   />
                                <Picker.Item label="Myanmar(+95)"  value = "Myanmar(+95)"   />
                                <Picker.Item label="Namibia(+264)"  value = "Namibia(+264)"   />
                                <Picker.Item label="Nauru(+674)"  value = "Nauru(+674)"   />
                                <Picker.Item label="Nepal(+977)"  value = "Nepal(+977)"   />
                                <Picker.Item label="Netherlands(+31)"  value = "Netherlands(+31)"   />
                                <Picker.Item label="Netherlands Antilles(+599)"  value = "Netherlands Antilles(+599)"   />
                                <Picker.Item label="New Caledonia(+687)"  value = "New Caledonia(+687)"   />
                                <Picker.Item label="New Zealand(+64)"  value = "New Zealand(+64)"   />
                                <Picker.Item label="Nicaragua(+505)"  value = "Nicaragua(+505)"   />
                                <Picker.Item label="Niger(+227)"  value = "Niger(+227)"   />
                                <Picker.Item label="Nigeria(+234)"  value = "Nigeria(+234)"   />
                                <Picker.Item label="Niue(+683)"  value = "Niue(+683)"   />
                                <Picker.Item label="Norfolk Island(+672)"  value = "Norfolk Island(+672)"   />
                                <Picker.Item label="North Macedonia, Republic of(+389)"  value = "North Macedonia, Republic of(+389)"   />
                                <Picker.Item label="Northern Mariana Islands(+1)"  value = "Northern Mariana Islands(+1)"   />
                                <Picker.Item label="Norway(+47)"  value = "Norway(+47)"   />
                                <Picker.Item label="Oman(+968)"  value = "Oman(+968)"   />
                                <Picker.Item label="Pakistan(+92)"  value = "Pakistan(+92)"   />
                                <Picker.Item label="Palau(+680)"  value = "Palau(+680)"   />
                                <Picker.Item label="Palestine,State of(+970)"  value = "Palestine,State of(+970)"   />
                                <Picker.Item label="Panama(+507)"  value = "Panama(+507)"   />
                                <Picker.Item label="Papua New Guinea(+675)"  value = "Papua New Guinea(+675)"   />
                                <Picker.Item label="Paraguay(+595)"  value = "Paraguay(+595)"   />
                                <Picker.Item label="Peru(+51)"  value = "Peru(+51)"   />
                                <Picker.Item label="Philippines(+63)"  value = "Philippines(+63)"   />
                                <Picker.Item label="Pitcairn(+64)"  value = "Pitcairn(+64)"   />
                                <Picker.Item label="Poland(+48)"  value = "Poland(+48)"   />
                                <Picker.Item label="Portugal(+351)"  value = "Portugal(+351)"   />
                                <Picker.Item label="Puerto Rico(+1)"  value = "Puerto Rico(+1)"   />
                                <Picker.Item label="Qatar(+974)"  value = "Qatar(+974)"   />
                                <Picker.Item label="Romania(+40)"  value = "Romania(+40)"   />
                                <Picker.Item label="Russian Federation(+7)"  value = "Russian Federation(+7)"   />
                                <Picker.Item label="Rwanda(+250)"  value = "Rwanda(+250)"   />
                                <Picker.Item label="Reunion(+262)"  value = "Reunion(+262)"   />
                                <Picker.Item label="Saint Barthelemy(+590)"  value = "Saint Barthelemy(+590)"   />
                                <Picker.Item label="Saint Helena(+290)"  value = "Saint Helena(+290)"   />
                                <Picker.Item label="Saint Kitts And Nevis(+1)"  value = "Saint Kitts And Nevis(+1)"   />
                                <Picker.Item label="Saint Lucia(+1)"  value = "Saint Lucia(+1)"   />
                                <Picker.Item label="Saint Martin(+590)"  value = "Saint Martin(+590)"   />
                                <Picker.Item label="Saint Pierre And Miquelon(+508)"  value = "Saint Pierre And Miquelon(+508)"   />
                                <Picker.Item label="Saint Vincent And The Grenedines(+1)"  value = "Saint Vincent And The Grenedines(+1)"   />
                                <Picker.Item label="Samoa(+685)"  value = "Samoa(+685)"   />
                                <Picker.Item label="San Marino(+378)"  value = "San Marino(+378)"   />
                                <Picker.Item label="Sao Tome and Principe(+239)"  value = "Sao Tome and Principe(+239)"   />
                                <Picker.Item label="Saudi Arabia(+966)"  value = "Saudi Arabia(+966)"   />
                                <Picker.Item label="Senegal(+221)"  value = "Senegal(+221)"   />
                                <Picker.Item label="Serbia(+381)"  value = "Serbia(+381)"   />
                                <Picker.Item label="Seychelles(+248)"  value = "Seychelles(+248)"   />
                                <Picker.Item label="Seirra Leone(+232)"  value = "Seirra Leone(+232)"   />
                                <Picker.Item label="Singapore(+65)"  value = "Singapore(+65)"   />
                                <Picker.Item label="Sint Maarten(+1)"  value = "Sint Maarten(+1)"   />
                                <Picker.Item label="Slovakia(+386)"  value = "Slovakia(+386)"   />
                                <Picker.Item label="SolomoN Islands(+677)"  value = "Solomon Islands(+677)"   />
                                <Picker.Item label="Somalia(+252)"  value = "Somalia(+252)"   />
                                <Picker.Item label="South Africa(+27)"  value = "South Africa(+27)"   />
                                <Picker.Item label="South Georgia and the south Sandwich Islands(+500)"  value = "South Georgia and the south Sandwich Islands(+500)"   />
                                <Picker.Item label="South Sudan(+211)"  value = "South Sudan(+211)"   />
                                <Picker.Item label="Spain(+34)"  value = "Spain(+34)"   />
                                <Picker.Item label="Sri Lanka(+94)"  value = "Sri Lanka(+94)"   />
                                <Picker.Item label="Sudan(+249)"  value = "Sudan(+249)"   />
                                <Picker.Item label="Suriname(+597)"  value = "Suriname(+597)"   />
                                <Picker.Item label="Svalbard And Jan Mayen(+47)"  value = "Svalbard And Jan Mayen(+47)"   />
                                <Picker.Item label="Swiziland(+268)"  value = "Swiziland(+268)"   />
                                <Picker.Item label="Sweden(+46)"  value = "Sweden(+46)"   />
                                <Picker.Item label="Switzerland(+41)"  value = "Switzerland(+41)"   />
                                <Picker.Item label="Syrian Arab Republic(+963)"  value = "Syrian Arab Republic(+963)"   />
                                <Picker.Item label="Taiwan,Republic Of China(+886)"  value = "Taiwan,Republic Of China(+886)"   />
                                <Picker.Item label="Tajikistan(+992)"  value = "Tajikistan(+992)"   />
                                <Picker.Item label="Tanzania,United Republic Of (+255)"  value = "Tanzania,United Republic Of (+255)"   />
                                <Picker.Item label="Thailand(+66)"  value = "Thailand(+66)"   />
                                <Picker.Item label="Timor-Leste(+670)"  value = "Timor-Leste(+670)"   />
                                <Picker.Item label="Togo(+228)"  value = "Togo(+228)"   />
                                <Picker.Item label="Tokelau(+690)"  value = "Tokelau(+690)"   />
                                <Picker.Item label="Tonga(+676)"  value = "Tonga(+676)"   />
                                <Picker.Item label="Trinidad and Tobago(+1)"  value = "Trinidad and Tobago(+1)"   />
                                <Picker.Item label="Tunisia(+216)"  value = "Tunisia(+216)"   />
                                <Picker.Item label="Turkey(+90)"  value = "Turkey(+90)"   />
                                <Picker.Item label="Turkmenistan(+993)"  value = "Turkmenistan(+993)"   />
                                <Picker.Item label="Turks and Caicos Islands(+1)"  value = "Turks and Caicos Islands(+1)"   />
                                <Picker.Item label="Tuvalu(+688)"  value = "Tuvalu(+688)"   />
                                <Picker.Item label="Uganda(+256)"  value = "Uganda(+256)"   />
                                <Picker.Item label="Ukraine(+380)"  value = "Ukraine(+380)"   />
                                <Picker.Item label="United Arab Emirates(+971)"  value = "United Arab Emirates(+971)"   />
                                <Picker.Item label="United Kingdom(+44)"  value = "United Kingdom(+44)"   />
                                <Picker.Item label="United States(+1)"  value = "United States(+1)"   />
                                <Picker.Item label="United States Minor Outlying Islands(+246)"  value = "United States Minor Outlying Islands(+246)"   />
                                <Picker.Item label="Uruguay(+598)"  value = "Uruguay(+598)"   />
                                <Picker.Item label="Uzbekistan(+998)"  value = "Uzbekistan(+998)"   />
                                <Picker.Item label="Vanuatu(+678)"  value = "Vanuatu(+678)"   />
                                <Picker.Item label="Venezuela, Bolivarian Republic(+58)"  value = "Venezuela, Bolivarian Republic(+58)"   />
                                <Picker.Item label="Veitnam(+84)"  value = "Veitnam(+84)"   />
                                <Picker.Item label="Virgin Islands, British(+1)"  value = "Virgin Islands, British(+1)"   />
                                <Picker.Item label="Virgin Islands, U.S.(+1)"  value = "Virgin Islands, U.S.(+1)"   />
                                <Picker.Item label="Wallis and Futuna(+681)"  value = "Wallis and Futuna(+681)"   />
                                <Picker.Item label="Western Sahara(+212)"  value = "Western Sahara(+212)"   />
                                <Picker.Item label="Yemen(+967)"  value = "Yemen(+967)"   />
                                <Picker.Item label="Zambia(+260)"  value = "Zambia(+260)"   />
                                <Picker.Item label="Zimbabwe(+263)"  value = "Zimbabwe(+263)"   />
                                <Picker.Item label="Aland Islands(+358)"  value = "Aland Islands(+358)"   />
                               
                            
                        </Picker>
                        </View>
                    </View>
                    <View style={styles.phoneCon}>
                        <Text style={styles.phoneText}>Phone</Text>
                        <TextInput
                            style={{...styles.input,color:normalText}}
                            onChangeText={changePhone}
                            value={phone}
                            placeholder='Phone Number'
                            keyboardType='phone-pad'
                        />

                    </View>

                </KeyboardAvoidingView>


                <View>
                    <TouchableOpacity style={styles.button} onPress={submitHandler}>
                    {isLoading?<ActivityIndicator color='#fff' size='large'/>:<Text style={styles.buttonText}>
                            Continue
                        </Text>}

                    </TouchableOpacity>
                </View>


    </ScrollView>

        </View>

    </SafeAreaView>
    </>)

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: '5%',
        paddingTop: 20
    },
    
    navigationHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        zIndex: 10,
        borderColor: '#fff',

    },
    close: {
        width: '20%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',

    },
    progress: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        paddingLeft: 40,
        justifyContent: 'space-around'

    },
    progressbar: {

    },
    close: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',


    },
    body: {
        paddingTop: 15,
        display: 'flex',
        flexDirection: 'column'
    },
    headerText:{
        marginBottom:15,
        fontSize:20,
        fontWeight:'700',
        color:'rgb(44, 44, 44)',
        fontFamily: 'ABeeZee',

    },
    text:{
         marginBottom:25,
         fontSize:16,
         color:'rgb(100,100,100)',
         fontFamily:'ABeeZee'
        
    },
    input: {
        borderWidth: .5,
        borderColor: 'rgb(200,200,200)',
        height:55,
        borderRadius:5,
        paddingLeft:10,
    },
    selectorContainer:{
        borderWidth:1,
        borderColor:'rgb(100,100,100)',
        height:55,
        borderRadius:2,

    },
    select:{
        borderColor:'rgb(100,100,100)',
        borderWidth:1

    },

    formContainer:{
        display:'flex',
        flexDirection:'row',
        width:Dimensions.get('window').width,
        alignItems:'center',
        marginBottom:Dimensions.get('window').height/2.2

    },
    phoneCon:{
        width:'70%'

    },
    codeCon:{
        width:'20%',
        

    },
    countryText:{
        fontFamily:'ABeeZee'

    },
    phoneText:{
        fontFamily:'ABeeZee',
        color:'#1652f0'

    },


    button: {
        width: '100%',
        paddingVertical: 17,
        borderRadius: 30,
        backgroundColor: '#1652f0',
        marginBottom: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Poppins',
    }

});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical:8,
        borderWidth: 1,
        borderColor: 'purple',
        borderRadius: 10,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon,
        
    },
});

export default VerifyNumber