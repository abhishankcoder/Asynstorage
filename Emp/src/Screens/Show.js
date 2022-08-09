import React, { useState, useEffect } from 'react';

import { StyleSheet, View, SafeAreaView, Text, Alert, TextInput, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from './Components/Button';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
// import AsyncStorage from '@react-native-async-storage/async-storage';


const Show = ({ navigation }) => {
  const [isShown, setIsShown] = useState(false);
  const [arr, setArr] = useState({})
  const [data, setData] = useState();
  const [email, setEmail] = useState('')
  const [isUpdate,setIsUpdate] = useState(false)
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await AsyncStorage.getItem('userData').then(value => {
      setData(JSON.parse(value))
    })
  }
  console.log("value aayi", data)


  const update = item => {
    setIsUpdate(true);
    // setName(item.name);
    // setEmpId(item.id);
    // setDesignation(item.designation);
    // setSalary(item.salary);
    navigation.navigate("Signup")
    // setModalVisible(!modalVisible);
  };
  const _renderItem = ({ item }) => {
    console.log("--------------->>", item);
    return (
      <View style={styles.box}>

        <Text style={styles.ftext}>
          {item.Name}
        </Text>

        <Text style={styles.ftext}>
          {item.Email}
        </Text>
        <Text style={styles.ftext}>
          {item.EmployeeId}
        </Text>
        <Text style={styles.ftext}>
          {item.Salary}
        </Text>
        <Text style={styles.ftext}>
          {item.Disignation}
        </Text>
        <TouchableOpacity onPress={() => update(item)}>
          <Image
            style={styles.img}
            source={require('../../assets/edit.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>

          <Image
            style={styles.img}
            source={require('../../assets/delete.png')}
          />
        </TouchableOpacity>

      </View>
    )
  }
  return (
    <>
      <View  >
        <View style={styles.Box}>
          <Text style={styles.head}>Name</Text>
          <Text style={styles.head}>Email</Text>
          <Text style={styles.head}>Id</Text>
          <Text style={styles.head}>Salary</Text>
          <Text style={styles.head}>Designation</Text>
          <Text style={styles.head}>Action</Text>
        </View>
        <FlatList
          style={{ height: '100%', width: '100%' }}
          data={data}
          renderItem={_renderItem}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  head: {
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
    marginLeft: moderateScale(15)
  },
  Box: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: moderateScale(10),
    marginTop: moderateScale(20),
    elevation:10,
    backgroundColor:'white'
  },
  box: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius:moderateScale(12),
    padding: moderateScale(10),
    marginTop: moderateScale(20),
    width: '100%',
    backgroundColor: 'darkorange'
  },
  ftext: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
    // marginLeft:moderateScale(10),
    width: '16%'


  },
  img: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginLeft: moderateScale(10)

  }
})
export default Show;