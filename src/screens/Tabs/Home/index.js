import React from 'react'
import { StyleSheet, SafeAreaView, StatusBar, Text, View } from 'react-native';





export default function Index() {


    return (
        <SafeAreaView>
            {Platform.OS == 'ios' ?
                <StatusBar barStyle={'dark-content'} /> :
                <StatusBar barStyle={'dark-content'} />
            }

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

})
