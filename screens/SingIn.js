/* eslint-disable prettier/prettier */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable  */
import * as React from 'react'
import { Text, StyleSheet, View, Image, ScrollView, ImageBackground, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import baseUrl from '../my_axios'
import { ToastAndroid } from 'react-native';
import { useState } from 'react';
import { useMyContext } from './../context/context';

export default  SignIn = ({navigation}) => {

  const context = useMyContext();
  const [email , setEmail] = useState("")
  const [pass , setPass] = useState("")
  const [err_email , setErr_email] = useState("")
  const [err_pass , setErr_Pass] = useState("")
  login = () => {
   

   

    if (email == '') {
      setErr_email('Invalid email')
    }
    if (pass == '') {
     setErr_Pass ('Invalid pass')
    }
  //  console.log(email,pass)

  
  context.login(email , pass).then((res) => {
      //console.log(JSON.stringify(res))
      ToastAndroid.show(`Welcome Back , ${res.username}` , 200)
      navigation.navigate("Request" )
    }).catch(err => {
      console.log(err)
      setErr_email("Wrong Email or Password")
    })
 

  //  this.setState({ error_email: err_email, error_pass: err_pass })
  }
 
    return (
      <>
        <View style={{ justifyContent: "space-between" ,marginTop:50,marginRight:20}}>
          <View>
            <Text >مرحبا بك,
            </Text>
            <Text>
              قم بالتسجيل للمتابعه
            </Text>
          </View>

            <Image source={require("../images/emergency(1).png")}  style={{ transform:[{translateX:30 } , {translateY:-50}] ,height:60,width:60}}/>


        </View>






        <View style={{ justifyContent: 'center' , transform:[{translateY:50}] }}>

          <View style={{ padding: 10 }}>
            <Text style={{fontWeight:"bold"}}>البريدالالكتروني</Text>
            <TextInput
              value={email}
              onChangeText={value => setEmail(value)}
              placeholder='البريدالالكتروني'
              style={{
                marginTop: 5,
                backgroundColor: '#cbcbcb',
                borderRadius:10

              }}
            />
          </View>

          <View style={{ padding: 10 }}>
            <Text style={{fontWeight:"bold"}}>كلمةالمرور</Text>
            <TextInput
              value={pass}
              onChangeText={value =>  setPass(value )}
              placeholder='كلمةالمرور'
              style={{
                marginTop: 5,
                backgroundColor: '#cbcbcb'
                , borderRadius:10
              }}
            />
             <View style={{ paddingRight:10 }}>
          <Text style={{fontWeight:"bold"}}>هل نسيت كلمة المرور؟</Text>
          </View>
            <Text style={{
              color: '#f00'
            }}>{err_email}</Text>

          </View>

          <TouchableOpacity
              onPress={() => {
                login()
              }}
              style={{
                paddingHorizontal:30,
                paddingVertical:15,
                backgroundColor:'#2196F3',
                width:"90%",
                marginTop:30,
                alignSelf:"center",
                borderRadius:10

              }}
            >
              <Text style={{textAlign:"center",color:"#fff",fontWeight:"bold"}}>تسجيل الدخول</Text>

            </TouchableOpacity>
            <Text onPress={() => {  navigation.navigate("SignUp")}} style={{fontWeight:'bold', textAlign:'center',marginTop:'5%'}}>تسجيل </Text>
            <Text style={{fontWeight:'bold', textAlign:'center',marginTop:'80%'}}>الشروط والاحكام </Text>
        </View>
      </>
    )
  
}