import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';

import colors from '../Components/Colors'


const Button = ({
    btnText,
    btnStyle = {},
    onPress = () => { },
    img,
    btnTextStyle = {}
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={{ ...styles.btnStyle, ...btnStyle }}
        >

            <Text style={{ ...styles.btnTextStyle, ...btnTextStyle }}>{btnText}</Text>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btnStyle: {
        height: moderateScale(48),
        backgroundColor: colors.themeColor,
        borderRadius: moderateScale(4),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: moderateScale(30)
    },
    btnTextStyle: {
        fontSize: scale(16),
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }
});
export default Button;