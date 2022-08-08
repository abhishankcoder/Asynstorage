import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Text, Alert, TextInput, ActivityIndicator } from 'react-native';
import Input from './Components/Input';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import Button from './Components/Button';
import Colors from './Components/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import Imagepath from './Constants/Imagepath';


const Login = ({ navigation }) => {
  const [state, setState] = useState({
    email: "",
    emailError: "",
  });
  const [epass, setEpass] = useState({
    password: "",
    passwordError: ""
  })

  const [email, setEmail] = useState('')


  const [password, setPassword] = useState('')
  const [isShown, setIsShown] = useState(false);
  const [secure, setSecure] = useState(true);


  useEffect(() => {
    // setIsShown(true)
    saveData();
  }, []);
  const getData = async () => {
    emailValidator();
    passwordValidator();

    // const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
    // if (!strongRegex.test(email)) {
    //   alert("please enter correct email")
    //   return false;
    // } else if (password.length < 8) {
    //   alert("make sure it has to 8 charecters")
    //   return false;
    // }
   
    try {
      
      const userData = await AsyncStorage.getItem('userData');
      console.log("yaha", userData)
      const email = JSON.parse(userData).Email;
      console.log("Data", email)
      const pass = JSON.parse(userData).Password;
      console.log("Data here", pass)
      if (email == email && pass == password) {

        setIsShown(true)
        navigation.navigate("Home")
        setIsShown(false)
      } else {
        alert("something wrong")
      }

    } catch (error) {
      console.log(error)
    }

  }
  const saveData = async() => {
    // setIsShown(true)
    try {
      AsyncStorage.getItem('userData')
        .then(value => {
          if (value != null) {
            console.log("data aa raha hai")
            navigation.navigate('Home')
          }
        })
    } catch (error) {
      console.log(error)
    }
  }
  const emailValidator = () => {
    const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

    if (!strongRegex.test(email)) {
      setState({ emailError: "Email contains proper format " });
    } else {
      setState({ emailError: "" });
    }
  };

  const passwordValidator = () => {

    if (password.length < 8) {
      setEpass({ passwordError: "it must be 8 charecters" });
    } else {
      setEpass({ passwordError: "" });
    }
  };
  return (<>
    <View style={style.container}>
      <ActivityIndicator animating={isShown} size="large" color="black" />
      <Text style={style.Head}>Login</Text>
      <View >
        <Input
          placeholder='Email'
          onChangeText={(value) => { setEmail(value) }}
          onBlur={() => emailValidator()}
          keyboardType="email-address"
        />
        <Text style={{ color: 'red' }}>{state.emailError}</Text>
        <Input
          placeholder='Password'
          onChangeText={(value) => { setPassword(value) }}
          onBlur={() => passwordValidator()}
          rightIcon={Imagepath.showEye}
          secureTextEntry={secure}
          onPressRight={() => setSecure(!secure)}
        />
        <Text style={{ color: 'red' }}>{epass.passwordError}</Text>

      </View>
      <Button
        btnText={'login'}
        onPress={getData}
      />
      <Button
        btnText={'signup'}
        onPress={() => navigation.navigate("Signup")}
      />
    </View>
  </>
  );
}

const style = StyleSheet.create({
  mainStyle: {
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateVerticalScale(44),

  },
  InputView: {
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(0.5),
    borderColor: 'grey',
    marginTop: moderateScale(20),
    backgroundColor: 'white'
  },
  Head: {
    fontSize: 25,
    color: 'black',
    fontWeight: '700'
  },
  container: {

    width: '100%',
    // alignItems: 'center',
    backgroundColor: 'white',
    padding: moderateScale(10),
    elevation: moderateScale(10),
    backgroundColor: '#e6e6e6',
    // flex:1
  },


})
export default Login;
