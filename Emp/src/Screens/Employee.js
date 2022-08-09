import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Employee = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [empId, setEmpId] = useState('');
  const [salary, setSalary] = useState('');
  const [designation, setDesignation] = useState('');
  const [empArray, setEmpArray] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  const onPressSave = () => {
    setIsUpdate(false);
    if (name && empId && salary && designation) {
      const element = {
        name: name,
        id: empId,
        salary: salary,
        designation: designation,
      };
      const check = empArray.some(val => {
        if (val.id === element.id) {
          return true;
        } else {
          return false;
        }
      });
      const index = empArray.findIndex(val => val.id === element.id);
      if (isUpdate) {
        empArray.splice(index, 1, element);
        setEmpData(empArray);
        setModalVisible(!modalVisible);
        setName('');
        setEmpId('');
        setDesignation('');
        setSalary('');
      } else {
        if (check) {
          alert(' exist');
        } else {
          empArray.push(element);
          setEmpData(empArray);
          setModalVisible(!modalVisible);
          setName('');
          setEmpId('');
          setDesignation('');
          setSalary('');
        }
      }
    } else {
      alert('empty input');
    }
  };
  const setEmpData = async data => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('empData', jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('empData');

      if (jsonValue != null) {
        setEmpArray(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = id => {
    let newArray = empArray.filter(val => {
      return val.id !== id;
    });
    setEmpArray([...newArray]);
    setEmpData(newArray);
  };

  const update = item => {
    setIsUpdate(true);
    setName(item.name);
    setEmpId(item.id);
    setDesignation(item.designation);
    setSalary(item.salary);
    setModalVisible(!modalVisible);
  };

  const modalView = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <View style={styles.modalItem}>
            <View style={styles.modalTopRow}>
              <Text style={styles.topText}>Enter Employee Details</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setName('');
                  setEmpId('');
                  setDesignation('');
                  setSalary('');
                }}>
                <Image
                  source={{
                    uri: 'https://img.icons8.com/ios-filled/344/delete-sign--v1.png',
                  }}
                  style={styles.closeImage}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder="Neme"
              style={styles.input}
              value={name}
              onChangeText={val => setName(val)}
            />
            <TextInput
              editable={!isUpdate}
              placeholder="Employee ID"
              style={styles.input}
              value={empId}
              onChangeText={val => setEmpId(val)}
            />
            <TextInput
              placeholder="Salary"
              style={styles.input}
              value={salary}
              onChangeText={val => setSalary(val)}
            />
            <TextInput
              placeholder="Designation"
              style={styles.input}
              value={designation}
              onChangeText={val => setDesignation(val)}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => onPressSave()}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  const EmpList = () => {
    const _renderItem = ({item}) => {
      return (
        <View style={styles.flatList}>
          <Text style={styles.listText}>{item.id}</Text>
          <Text style={styles.listText}>{item.name}</Text>
          <Text style={styles.listText}>{item.salary}</Text>
          <Text style={styles.listText}>{item.designation}</Text>
          <TouchableOpacity onPress={() => update(item)}>
            <Image
              source={{
                uri: 'https://img.icons8.com/color/344/approve-and-update.png',
              }}
              style={styles.closeImage}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteItem(item.id)}>
            <Image
              source={{
                uri: 'https://img.icons8.com/color/344/delete-forever.png',
              }}
              style={styles.closeImage}
            />
          </TouchableOpacity>
        </View>
      );
    };
    return (
      <FlatList
        data={empArray}
        keyExtractor={item => item.id}
        renderItem={_renderItem}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flatList}>
        <Text style={styles.listText}>Id</Text>
        <Text style={styles.listText}>Name</Text>
        <Text style={styles.listText}>Salary</Text>
        <Text style={styles.listText}>Dgn</Text>
        <Text style={styles.listText}>Action</Text>
      </View>
      {EmpList()}
      {modalView()}
      <TouchableOpacity
        onPress={() => {
          setModalVisible(!modalVisible);
          setIsUpdate(false);
        }}
        style={styles.addButton}>
        <Image
          source={{uri: 'https://img.icons8.com/ios-glyphs/344/plus-math.png'}}
          style={styles.addImage}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Employee;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 5,
  },
  addImage: {
    height: 40,
    width: 40,
    margin: 5,
    tintColor: '#426cf5',
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    marginHorizontal: 20,
  },
  closeImage: {
    height: 25,
    width: 25,
    alignSelf: 'flex-end',
    marginHorizontal: 5,
  },
  modalTopRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  topText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    elevation: 1,
    borderRadius: 10,
    marginVertical: 15,
    fontSize: 18,
    color: '#000',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#426cf5',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginVertical: 10,
  },
  flatList: {
    backgroundColor: '#fff',
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 5,
    padding: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  listText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 30,
    fontWeight: '500',
    color: '#000',
  },
});
