import React from 'react'
import { StyleSheet, SafeAreaView, StatusBar, Text, View } from 'react-native';

export default function Index() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {Platform.OS == 'ios' ?
                <StatusBar barStyle={'dark-content'} /> :
                <StatusBar />
            }
            {/* Aleks your code goes inside this SafeAreaView
                You can delete the View and Text below once you start coding */}
            <View style={{flex: 1,  alignItems: 'center', justifyContent: 'center' }}>
                <Text >Home Page (Aleks)</Text>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

})
