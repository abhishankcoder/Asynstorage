import React from 'react';
import { Text, View,StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
const Apploader = ({ navigation }) => {
  return (
   <View style={ [StyleSheet.absoluteFillObject,style.container]}>
<LottieView source={require('../../../assets/loader.json')} autoPlay loop />
   </View>
  );
}

const style = StyleSheet.create({
container:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.3)',
    zIndex:1
}
})
export default Apploader;