import React, { useState, useEffect } from 'react';

import { StyleSheet, View, SafeAreaView, Text, Alert, TextInput, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from './Components/Button';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
// import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = ({ navigation }) => {
  //   const [name, setName] = useState('')
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
      getData();
    }, []);

    const getData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        console.log("yaha", userData)
        // const name = JSON.parse(userData).Name;
        // setName(name)
        // console.log("Data", name)
      } catch (error) {
        console.log(error)
      }
    }
  const navigate = () => {
    navigation.navigate('Signup')
    // setIsShown(false)
  }

  // const removeData = async () => {
  //   try {
  //     await AsyncStorage.removeItem('userData')
  //     console.log("logout")
  //     navigation.navigate('Login')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  return (<>
   
        
    <View style={{ marginHorizontal: moderateScale(20) }}>

      <Button

        btnText={'Add Employee'}
        onPress={() => navigation.navigate("Signup")}

      />

<Button

btnText={'Show item'}
onPress={() => navigation.navigate('Show')}

/>
<View>
    


      </View>
    </View>

  </>
  );
}

const style = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    fontSize: 30,
    color: 'skyblue',
    fontWeight: '700',
  }
})
export default Home;