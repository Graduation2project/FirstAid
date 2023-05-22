/* eslint-disable prettier/prettier */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable  */

import React, { useState , useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text    } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { useMyContext } from './../context/context';
import * as Animatable from 'react-native-animatable';




const ColorsConfig = {
  0:{ content:"Not Seen" ,  color:"lightgreen"},
  1:{ content : "Active" , color : "rgba(255, 25, 25, .5)"},
  2: { content:"Denied" , color:"#a2258a"},
  3: { content:"Seen" , color:"#a2258a"}
}
// const { set, useCode, Value } = Animated;

const MyDropDownList = ({navigation , route}) => {
  const [selectedValue, setSelectedValue] = useState('all');
  const context = useMyContext()


   //||  {"email": "modyv2020@gmail.com", "userID": "3c052b82-49ee-4af5-8567-5a7fa39d3ced", "username": "mody"}

   useEffect(() => {
    let trigger = async () => {
  await context.GetRequests()
   return
    }

    trigger()



    
   },[])

   const Response = context ? context.getData() : null
   const GetVsisbilityValue = (e_id , E_status) => {
      const foundVisibility = Response.visibility ? Response.visibility.find(e => e.e_ID == e_id) : null
      //if the e_status is active just print that
      if(E_status == 1){return 1}

      //if the e_id exists in visibility just print that
      else if(foundVisibility){ return foundVisibility.status  }
      //just print the Not_seen state which is 0
      else{return 0}


   }

    const Pressed = async (data ) => {
      const Em_data = await context.GetOneEm(data.id)
      navigation.navigate("PatientState" , {data:Em_data})

        //change status only if not seen
      if(GetVsisbilityValue(data.id , data.status) != 0){return}
    
      await context.ChangeStatus(data.id,3 )

    


    }

  


  return (
    <View>
        <View style={{backgroundColor:"gray",width:"100%",height:50}}>  
            
        <Picker
        selectedValue={selectedValue}
 
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="All Requests" value="all" />
        <Picker.Item label="Active" value="active" />
        <Picker.Item label="Denied" value="denied" />
      </Picker>
    </View>
    <ScrollView style={{marginBottom:"12%"}}>

      { 
      
      
      Response ? 
      Response.data.map( (element,index) =>{
       const visible_value = GetVsisbilityValue(element.id  , element.status )
       if(ColorsConfig[visible_value].content.toLowerCase() == selectedValue || selectedValue == 'all' )
        return (
          <TouchableOpacity key={element.id} onPress={ () => {Pressed(element)} }
           style={{backgroundColor:"gray",width:"100%",marginTop:30 , paddingVertical:50 , position:"relative" }}>
                          <Text style={{fontSize:20}}> <Text style={{fontFamily:"SansSerif" , fontSize:25}}> {element.createdAt}</Text>   <Text> {element.username} </Text> </Text>
        
         <Animatable.View animation={fadeIn} iterationCount={'infinite'} direction={'alternate-reverse'} style={[  css.iconAnimated , {backgroundColor:ColorsConfig[visible_value].color} ]}  >
          <Text>{ColorsConfig[visible_value].content}</Text>
              </Animatable.View> 
              
          </TouchableOpacity>
        )
      } 
      
      
      ) : <ActivityIndicator  size={200} color={"red"} /> }
            </ScrollView>

    </View>
  );
};



const css = StyleSheet.create({
  iconAnimated : {
    position:"absolute" , 
    right:20 , 
    top:20 , 
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    color:"white",
    borderRadius:50,
    left:300, 
     padding:5,
       
    fontSize:"20",
  
  }
})

const fadeIn = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};
export default MyDropDownList;