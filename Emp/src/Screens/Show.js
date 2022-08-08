import React, { useState, useEffect } from 'react';

import { StyleSheet, View, SafeAreaView, Text, Alert, TextInput, ActivityIndicator, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from './Components/Button';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
// import AsyncStorage from '@react-native-async-storage/async-storage';


const Show = ({ navigation }) => {
 
  const [isShown, setIsShown] = useState(false);

  const [get, setGet] = useState([]);


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {

    await AsyncStorage.getItem('userData').then(value => {
      console.log("value aayi8", value)

      setGet(value)
      console.log("gazab", get)
    })

    
  }

  
  const renderItem = ({item} )  => {
    console.log("item", item)
  return (
    <View >
      <Text style={{ fontSize: 16, color: 'blue', fontWeight: '500' }}>{item.Email}</Text>

    </View>
  )

}
 console.log('get----->>>',get);
return (
<>
  <View style={{  justifyContent: 'center', alignItems: 'center', marginHorizontal: 20 }} >

  <FlatList 
  data={get}
  renderItem={renderItem}
  //  keyExtractor={item => item.id}
  />
    
  </View>
 
  
</>

);

}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  name: {
    fontSize: 30,
    color: 'skyblue',
    fontWeight: '700',
  },
  boxStyle: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'blue',
    width: '50%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: 'white',

  },
  textStyle: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
    padding: 10

  }
})
export default Show;