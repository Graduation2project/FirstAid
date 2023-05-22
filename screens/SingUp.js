/* eslint-disable prettier/prettier */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable  */

import * as React from 'react'
import { Text, StyleSheet, View, Image, ScrollView, ImageBackground, StatusBar, TextInput, TouchableOpacity  } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import baseUrl from '../my_axios'
import { ToastAndroid , Linking } from 'react-native';
export default class SignUp extends React.Component {
  constructor() {
    super()
    this.state = {
      الاسم: '',
      البريدالالكتروني: '',
      كلمةالمرور: '',
      error_fname: "",
      error_lname: "",
      error_email: "",
      error_pass: "",
    }
  }
  async login() {
    let fname = this.state.الاسم.trim()
    let email = this.state.البريدالالكتروني.trim()
    let pass = this.state.كلمةالمرور.trim()



    let err_fname = ''
    let err_lname = ''
    let err_email = ''
    let err_pass = ''
    if (fname == '' || email == '' || pass == '') {


      err_fname = 'Invalid fname'
      
      if (email == '') {
        err_email = 'Invalid email'
      }
      if (pass == '') {
        err_pass = 'Invalid pass'
      }
    }
   
  


     axios.post(baseUrl+"/Auth/register",{
      
        firstname: fname,
        lastName: fname,
        username: fname,
        email: email,
        password: pass
      
    }).then(res => {
      this.props.navigation.navigate("SignIn")
      console.log( res.data)
    })
    .catch(err => ToastAndroid.show("Invalid Data Submitted" , 200))


    //this.props.navigation.navigate("Home")
    //this.setState({ error_fname: err_fname, error_lname: err_lname, error_email: err_email, error_pass: err_pass })
  }
  render() {
    return (
      <>
        <View style={{ justifyContent: "space-between" ,marginTop:50,marginRight:20}}>
          <View>
            <Text >مرحبا بك
            </Text>
            <Text>قم بانشاء حساب
            </Text>
          </View>
            {/* image is not appearing correctly */}
            <Image source={require("../images/emergency(1).png")}  style={{ transform:[{translateX:30 } , {translateY:-50}] ,height:60,width:60}}/>


        </View>






        <View style={{ justifyContent: 'center' }}>
          <View style={{ padding: 10 }}>
            <Text style={{fontWeight:"bold"}}>الاسم</Text>
            <TextInput
              value={this.state.الاسم}
              onChangeText={value => {
                this.setState({
                  الاسم: value
                })
              }}
              placeholder='الاسم'
              style={{
                marginTop: 5,
                backgroundColor: '#cbcbcb',
                borderRadius:10
              }}
            />
            <Text style={{
              color: '#f00'
            }}>{this.state.error_fname}</Text>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={{fontWeight:"bold"}}>البريدالالكتروني</Text>
            <TextInput
              value={this.state.البريدالالكتروني}
              onChangeText={value => {
                this.setState({
                  البريدالالكتروني: value
                })
              }}
              placeholder='البريدالالكتروني'
              style={{
                marginTop: 5,
                backgroundColor: '#cbcbcb',
                borderRadius:10

              }}
            />
            <Text style={{
              color: '#f00'
            }}>{this.state.error_lname}</Text>
          </View>

          <View style={{ padding: 10 }}>
            <Text style={{fontWeight:"bold"}}>كلمةالمرور</Text>
            <TextInput
              value={this.state.كلمةالمرور}
              onChangeText={value => {
                this.setState({
                  كلمةالمرور: value
                })
              }}
              placeholder='كلمةالمرور'
              style={{
                marginTop: 5,
                backgroundColor: '#cbcbcb'
                , borderRadius:10
              }}
            />
            <Text style={{
              color: '#f00'
            }}>{this.state.error_email}</Text>
          </View>
          <TouchableOpacity
              onPress={ async () => {
                await this.login()
              }}
              style={{
               paddingHorizontal:30,
               paddingVertical:15,
               backgroundColor:'#159da9',
               width:"90%",
               marginTop:30,
               alignSelf:"center",
               borderRadius:10

              }}
            >
              <Text style={{textAlign:"center",color:"#fff",fontWeight:"bold"}}>انشاء حساب جديد</Text>

            </TouchableOpacity>
            <Text style={{fontWeight:'bold', textAlign:'center',marginTop:'60%'}}>تسجيل دخول</Text>
        </View>
      </>
    )
  }
}
