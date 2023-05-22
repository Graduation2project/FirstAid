/* eslint-disable prettier/prettier */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable  */

import React, { useContext, useState } from 'react';
import { View, Picker,TouchableOpacity, Text, Button } from 'react-native';
import uuid from 'react-native-uuid';
import {showLocation} from 'react-native-map-link';
import { StyleSheet } from 'react-native';
import { useMyContext } from './../context/context';
import { Image } from 'react-native';
export function PatientState({navigation,route}) {
  const data = route.params.data;
  const context = useMyContext()
  const userData = context.getUserData()

  // console.log("the user data is ",route.params.userData)

  Accepted = async (flag) => {

    await context.ChangeStatus(data.id,flag )

   
     navigation.navigate("Request" )

  }
 
      
    
      return (
        <View style={{flex:1 }}>
        <View style={{backgroundColor:"gray",width:"100%",height:80,alignItems:"flex-end"}}>
       <Image source={require("../images/nurse-svgrepo-com.png")} style={{width:50 , height:50 , transform:[{translateY:15} , {translateX:-25}]}} />

        </View>    
        
          <View style={{backgroundColor:"gray",width:"100%",marginTop:30 }}>
                <Text style={[styles.NormalText , {textAlign:"center"}]}> اسم الشخص المسعف</Text>
                <Text style={ {textAlign:"center" , fontSize:30}}> { data.approvedByUser ? data.approvedByUser.username : "Not Active Yet"}</Text>

                <Text style={[styles.NormalText , {textAlign:"center"} ]}> 
                {/* <FontAwesomeIcon icon={'location-arrow'} size={30} color="#900" />; */}
        العنوان</Text>

        <View style={{width:"100%" , paddingHorizontal:50 , paddingVertical:10}}>
        <TouchableOpacity style={{display:'flex' , justifyContent:"center" , alignItems:"center"}}  onPress={() => {
                  console.log( data.location)
                   showLocation({
                      latitude: data.location.latitude,
                      longitude: data.location.longitude,
                  
                     directionsMode: 'car', // optional, accepted values are 'car', 'walk', 'public-transport' or 'bike'
                    });
                }}>
                  <Image source={require('../images/location-pin-svgrepo-com.png')} style={{width:50 , height:50 }} />
                  </TouchableOpacity>
        </View>
       
          </View>

          { data.emergencies.map(em => (
             <View key={uuid.v4()} style={{backgroundColor:"gray",width:"100%",marginTop:30 }}>
                  <Text style={ {textAlign:"center" , fontSize:30 , color:"lightgreen"  , paddingVertical:20 , fontWeight:"bold"}}>{em.caseTitle}</Text>


                  {em.q_As.map(q_a => (
                        <View key={uuid.v4()} >
                        {/* <Text style={styles.NormalText}>السؤال الخاص بالمريض </Text> */}
                              <Text style={styles.Qquestions}>{q_a.question}</Text>
                              {/* <Text style={styles.NormalText}>الاجابه</Text> */}
                              <Text style={styles.Answer}>{q_a.answer}</Text>
                        </View>
          ))}
        
        </View>
          )) }
         
          <View style={{backgroundColor:"gray",width:"100%",marginTop:30 }}>

           
                <Text style={styles.lastSection} >  علي المسعف التوجهه لمكان المريض  </Text>
               
          </View>
          { 

            data.approvedBy == null ||  data.approvedBy == userData.userID ? 

                          <View style={{width:"100%" , paddingHorizontal:50 , paddingTop:10 }}>

                          <Button color={"green"} onPress={ () => {this.Accepted(1 )}}  title='قبول' />
                          <View style={{height:10}} />
                          <Button color={"#C83350"} onPress={ () => {this.Accepted(2 )}} title='رفض'></Button>
                          </View> : null
          
          
            }
            
          
           
       
          
        </View>

      )}
  
      const styles = StyleSheet.create({
        NormalText : {
          fontSize:25,
          color:"lightgreen"
        },
        Qquestions:{
          fontSize:20,
          paddingRight:20,
          color:'darkred'
        },
        Answer:{
          fontSize:20,
          paddingRight:20,
          fontWeight:"bold",
          color:'lightblue'
        },
        AcceptBtn:{
          fontSize:20,
          backgroundColor:"lightgreen",
          fontWeight:"bold",
          color:'lightblue'
        },
        lastSection : {
          textAlign:"center",
          fontSize:25,
          color:"red"
        }
      })