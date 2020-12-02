import React, {Component} from 'react';
import {FlatList, View, StyleSheet, Text, ImageBackground, UIManager, Platform, LayoutAnimation} from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Card from '../components/Card';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import Icon from '../components/Icon';

const listings =[
            {
              id: 1,
              expanded: false,
              title: 'Career Day',
              date: 'October 20, 2020',
              image: require("./app/assets/career.png"),
              Drop: [{
                        "subText" : "Description:                                                                                SUN Career Center career fairs connect your organization with students and alumni who are pursuing a full-time, part-time, internship, volunteer, and graduate." 
                    }]
            },
            {
                id: 2,
                expanded: false,
                title: 'Game Night',
                date: 'October 21, 2020',
                image: require("./app/assets/game.png") ,
                Drop: [{
                          "subText" : "Description:                                                                                This fall, it’s all free fun and games on one special Wednesday night every month! The Games Room of the University Student Union invites all CSUN students to Games Night,  an evening full of free gaming, free food and cool prizes!" 
                      }]
            },
            {
                id: 3,
                expanded: false,
                title: 'Workshop LRC',
                date: 'October 22, 2020',
                image: require("./app/assets/workshop.png"),
                Drop: [{
                        "subText" : "Description:                                                                             The Writing Center is excited to offer all our workshops in a live online format using Zoom. Our workshops offer opportunities for CSUN students to refine their reading, writing, and studying skills in interactive workshops facilitated by CSUN Faculty Consultants. We offer workshops focused on all stages of the crafting process, from close reading texts to proofreading final drafts. " 
                      }] 
            },
            {
                id: 4,
                expanded: false,
                title: 'Comedy Night',
                date: 'October 22, 2020',
                image: require("./app/assets/laugh.png"),
                Drop: [{
                        "subText" : "DESCRIPTION:                                                                          USU invites all Student Veterans and military-connected Matadors to have some fun at our virtual Game Night on Zoom! " 
                      }]
            },
];



export default class Events extends React.Component{

            constructor(){
                super()
                if(Platform.OS === 'android')
                UIManager.setLayoutAnimationEnabledExperimental(true)
                this.state = {
                      data: listings
                }
            }

            updateExpand = (index) => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                const array = [...this.state.data]
                array[index]['expanded'] = !array[index]['expanded']
                this.setState({data:array}) 
            }

            renderItem = ({item, index}) => {
                let items = [];
                const row = item.Drop;
              
                items = row.map(rowItem => {
                    return  (
                            <View style={styles.description}>
                              <AppText>{rowItem.subText}</AppText>  
                            </View>
                            )
                })

                    return (
                            <View style = {styles.flatlistContainer}>
                              <TouchableOpacity activeOpacity={0.7} onPress= {() => {this.updateExpand(index)}} style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 20}}>

                                <Card title={item.title} subTitle={item.date} image={item.image} />
                                {item.expanded ? items : null}

                              </TouchableOpacity>
                            </View>
                          )
          }


          render(){

              return(
                <View style={styles.container}>
                  <ImageBackground
                    source= {require("./app/assets/Background-Img.png")}
                    style={styles.background}
                    >

                      {/* menu */}
                      <View style={styles.menu}>
                        <MaterialCommunityIcons name="menu" size={30} color="black" />
                      </View>

                      {/* notification */}
                      <View style={styles.notification}>
                        <Ionicons name="md-notifications-outline" size={30} color="black" />
                      </View>

                      {/* logoholder */}
                      <View style={styles.logoholder}>
                        <Ionicons name="logo-tux" size={24} color="black" />
                      </View>

                      {/* Header: Events List */}
                      <LinearGradient
                      colors={['#A5FAEA', '#6EC8F5']} style={styles.header}>
                        <AppText>Events</AppText> 
                      </LinearGradient>

                      {/* Buttons */}
                      <View style={styles.buttonposition}>
                        {/* <TouchableOpacity style={styles.wrapper}>    */}
                        <AppButton title="     Today" onPress={() => console.log("Tapped")}/>
                        {/* </TouchableOpacity>  */}
                        <AppButton title="Tomorrow" onPress={() => console.log("Tapped")}/>
                        <AppButton title="This week" onPress={() => console.log("Tapped")}/>
                        <AppButton title="This month" onPress={() => console.log("Tapped")}/>
                      </View>

                      {/* Cards */}
                      <View style={styles.cardposition}>
                          <FlatList
                            data = {this.state.data} 
                            renderItem = {this.renderItem}
                          />
                      </View>

                      {/* Bottom Icons */}
                      <View style={styles.bottomicons}>            
                      <Icon name="home" size={28} backgroundColor="white" iconColor="firebrick" 
                      onPress={() => console.log("Tapped")}/>
                      <Icon name="map-marker" size={28} backgroundColor="white" iconColor="blue"
                      onPress={() => console.log("Tapped")} />
                      <Icon name="calendar-month" size={28} backgroundColor="white" iconColor="green"
                      onPress={() => console.log("Tapped")} />
                      <Icon name="account" size={28} backgroundColor="white" iconColor="black"
                      onPress={() => console.log("Tapped")} />
                    </View>  
                  </ImageBackground>
                </View>
              );

            }
  }

const styles = StyleSheet.create({
              container:{    
                            flex: 1,
                            paddingTop: Constants.statusBarHeight,  
                          }, 
              background:{
                            flex: 1,
                            resizeMode: "cover",
                            justifyContent: "center",
                            overflow: "hidden",
                        },
              menu:{
                          position: "absolute",
                          top:15,
                          left: 20
                        },
              notification:{
                          position: "absolute",
                          top: 12,
                          right: 20
                        },
              logoholder:{
                          position: "absolute",
                          top: 15,
                          left: 195
                        },
              header:{
                          justifyContent: "center",
                          alignItems:"center",
                          position:  "absolute",
                          top:45,
                          backgroundColor: "paleturquoise",
                          width:'100%',
                          height: 40,
                        },
              buttonposition:{
                          position:  "absolute",
                          top: 95,
                          marginRight: 8,
                          flexDirection: "row",
                        },
              description:{
                            width: 350, 
                            backgroundColor: '#F5F8F7',
                            // borderBottomRightRadius: 10, 
                            // borderBottomLeftRadius: 10, 
                            shadowColor: 'grey',
                            shadowOffset: {width: 6, height: 6 },
                            shadowOpacity: 0.3,
                            shadowRadius: 8,
                            elevation: 20,
                            paddingBottom: 10,
                            paddingLeft: 10,
                            paddingRight: 10,              
                          },
            cardposition:{
                            position:"absolute",
                            top:125,
                            padding: 5,
                          },
            bottomicons:{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            position: "absolute",
                            marginLeft: 25,
                            marginRight : 25,
                            bottom: 20,
                            width: '100%',
                          }
})