import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Text, Alert, TextInput, ActivityIndicator, Keyboard } from 'react-native';
import Colors from './Components/Colors';
import Input from './Components/Input';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import Button from './Components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Imagepath from './Constants/Imagepath';
import { Field } from 'formik';
export default function Signup({ navigation }) {

    const [email, setEmail] = useState('')
    const [employeeid, setEmployeeId] = useState('')
    const [salary, setSalary] = useState('')
    const [designation, setDisignation] = useState('')
    const [isShown, setIsShown] = useState(false);
    const [secure, setSecure] = useState(true)
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState(false)
    const [contact,setContact] = useState('')
    const [age,setAge] = useState('')
    const [password,setPassword] = useState('')
    const [data,setData] = useState([])

    const[get,setGet] = useState([]);

    const[emailError,setEmailError] = useState(false)

    const [error, setError] = useState({ field: '', message: '' });
    const [econ, setEcon] = useState({ field: '', message: '' });

    const [ename, setEname] = useState({
        name: "",
        nameError: "",
    });
    const [state, setState] = useState({
        email: "",
        emailError: "",
    });

    const [epass, setEpass] = useState({
        password: "",
        passwordError: ""
    })

    const [eage, setEage] = useState({
        age: "",
        ageError: ""
    })

    const [econtact, setEcontact] = useState({
        contact: "",
        contactError: ""
    })
    useEffect(() => {
        getData();
      }, []);
    const getData = async()=>{
         await AsyncStorage.getItem('userData').then(value =>{
            console.log("value aayi",value)
            setGet(true)
         })

    }

    const nameValidator = () => {

        if (name.length > 20) {
            setEname({ nameError: "It takes maximum 20 characters " });
        } else {
            setEname({ nameError: "" });
        }
    };

    const emailValidator = () => {
        const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

        if (!strongRegex.test(email)) {
            setState({ emailError: "Email contains proper format " });
            return false;
        } 
        else {
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

    const ageValidator = () => {
        const re = /^[0-9\b]+$/;

        if (!re.test(age)) {
            setEage({ ageError: "it must be numeric value" });
        } else {
            setEage({ ageError: "" });
        }
    };

    const contactValidator = () => {
        const re = /^[0-9\b]+$/;

        if (!re.test(contact) || contact.length > 10 || contact.length < 10) {
            setEcontact({ contactError: "it must be numeric value" });
        } else {
            setEcontact({ contactError: "" });
        }
    };

    // const Valid = () =>{
    //     emailValidator();
    //     contactValidator();
    //     ageValidator();
    //     passwordValidator();
    //     nameValidator();

    //     // submit();
    // }

    const submit = async () => {

        emailValidator();
        contactValidator();
        ageValidator();
        passwordValidator();
        nameValidator();
        if (name.length==0 || email.length == 0 || employeeid.length == 0 || salary.length == 0 || designation.length == 0) {
            alert("please fill the full form  ")
        } else {
            try {
                var UserInfo = {
                    Name: name,
                    Email: email,
                    EmployeeId: employeeid,
                    Salary: salary,
                    Disignation: designation,
                   

                }
                setIsShown(true)
                await AsyncStorage.setItem('userData', JSON.stringify(UserInfo))
                console.log("userInfo", UserInfo)
                alert("Done!")
                setData(UserInfo)
                console.log("user",UserInfo)
                navigation.navigate('Home')
                data.push(UserInfo)
                console.log("data is ",data)
                console.log("done") 
            } catch (error) {
                console.log("error", error)
            }
        }
    }
    // const Validate =()=>{
    //     let signinError = {field:'',message:''};
    //     const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");



    // }
    //   const validate =()=> {
    //     Keyboard.dismiss();
    //     if(email == ""){
    //         handleErrors("please enter email address")
    //     }
    //   };
    //   const handleOnchange =(value,email)=>{
    //     setEmail(prevState =>({...prevState, [email]: value}));

    //   }

    //   const handleErrors =(errorMessage,email)=>{
    //     setEmailerror(prevState =>({...prevState, [email]: errorMessage}));
    //   }
const validateion = async() => {
    const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
    const re = /^[0-9\b]+$/;

    // setEmailError(false)
    setNameError(false)
    if(!name) {
        setNameError(true)
    }

     if (strongRegex.test(email) === false){
        setEmail(true)
        // return false;
        setNameError(true)
    }
    else{
        setEmail(true)
        console.log("email is correct")
    }

    // else if (password.length < 8){
    //     setNameError(true)
    // }

    // else if (!re.test(age)) {

    //     setNameError(true)
    // }

    // else if (!re.test(contact) || contact.length > 10 || contact.length < 10) {

    //     setNameError(true)
    // }

    // else {
    //     try {
    //         var UserInfo = {
    //             Email: email,
    //             Age: age,
    //             Contact: contact,
    //             Password: password,
    //             Name: name,

    //         }
    //         setIsShown(true)
    //         await AsyncStorage.setItem('userData', JSON.stringify(UserInfo))
    //         console.log("userInfo", UserInfo)
    //         alert("Done!")
    //         navigation.navigate('Login')
    //     } catch (error) {
    //         console.log("error", error)
    //     }
    // }
    // else{
    //     if(){}
    //     else if() {}
    // }
}

const multiSet = async () => {
    const firstPair = ["@MyApp_user", "value_1"]
    const secondPair = ["@MyApp_key", "value_2"]
    try {
        
        

      await AsyncStorage.multiSet([firstPair, secondPair])
    } catch(e) {
      //save error
    }
  
    console.log("Done.")
  }
    return (
        <View style={style.container}>
            <ActivityIndicator animating={isShown} size="large" color="black" />

            <View style={style.main}>
                <Text style={style.Tex}>Add Employee </Text>

            </View>
            <View >

                <Input
                    placeholder='Name'
                    onChangeText={(value) => { setName(value) }}
                    onBlur={() => nameValidator()}


                />
                {!name ? nameError === true ?  
                <Text style={{ color: 'red' }}>Name is Required</Text>
                : null : null}
                 {/* {nameError === false ? 
                <Text style={{ color: 'red' }}>Name is Required</Text>
                    : null } */}
                {/* <Text style={{ color: 'red' }}>{ename.name</Text> */}

                <Input
                    placeholder='Email'
                    onChangeText={(value) => { setEmail(value) }}
                    onBlur={() => emailValidator()}

                    keyboardType="email-address"
                // error={emailerror.email}
                // onChangeText={(value) => { handleOnchange(value,'email') }}
                />
                {/* <Text style={{color:'red'}}>{{emailerror}}</Text> */}
                {/* {error.field == 'email' && (
                    <Text style={{ color: 'red' }}>{error.message}</Text>
                )} */}
                {/* <Text style={{ color: 'red' }}>{state.emailError}</Text> */}

                {!email ? nameError === true ?  
                <Text style={{ color: 'red' }}>Email is Required</Text>
                : null : null}

                <Input
                    placeholder='Employee Id'
                    onChangeText={(value) => { setSalary(value) }}
                    onBlur={() => contactValidator()}

                    keyboardType="numeric"
                />
                {/* {error.field == 'contact' && (
                    <Text style={{ color: 'red' }}>{error.message}</Text>
                )} */}
                {/* <Text style={{ color: 'red' }}>{econtact.contactError}</Text> */}
                {!contact ? nameError === true ?  
                <Text style={{ color: 'red' }}>Contact is Required</Text>
                : null : null}

                <Input
                    placeholder='Employee Salary'
                    onChangeText={(value) => { setEmployeeId(value) }}
                    onBlur={() => ageValidator()}

                    keyboardType="numeric"
                />
                {/* {error.field == 'age' && (
                    <Text style={{ color: 'red' }}>{error.message}</Text>
                )} */}
                {/* <Text style={{ color: 'red' }}>{eage.ageError}</Text> */}

                {!age ? nameError === true ?  
                <Text style={{ color: 'red' }}>Age is Required</Text>
                : null : null}


                <Input
                    placeholder='Designation'
                    onChangeText={(value) => { setDisignation(value) }}
                    onBlur={() => passwordValidator()}

                    // rightIcon={Imagepath.showEye}
                    // secureTextEntry={secure}
                    // onPressRight={() => setSecure(!secure)}
                />
                {/* {error.field == 'password' && (
                    <Text style={{ color: 'red' }}>{error.message}</Text>
                )} */}
                {/* <Text style={{ color: 'red' }}>{epass.passwordError}</Text> */}

                {!password ? nameError === true ?  
                <Text style={{ color: 'red' }}>It must be 8 chatecters</Text>
                : null : null}

            </View>
            <Button
                btnText={'Submit'}
                onPress={submit}
            />
        </View>
    );
}
const style = StyleSheet.create({

    Tex: {
        fontSize: 25,
        color: 'black',
        fontWeight: '700'
    },
    InputView: {
        borderRadius: moderateScale(12),
        borderWidth: moderateScale(0.5),
        borderColor: 'grey',
        marginTop: moderateScale(20),

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: moderateScale(20)
    }

})
// export default Signup;