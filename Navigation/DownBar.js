/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable keyword-spacing */
/* eslint-disable jsx-quotes */
/* eslint-disable eqeqeq */
/* eslint-disable semi */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable space-infix-ops */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet, Text, View, ToastAndroid, Linking} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ReqestPage from '../screens/ReqestPage';
import SignIn from './../screens/SingIn';
import SignUp from './../screens/SingUp';

import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Context } from './../context/context';
import { PatientState } from './../screens/PatientState';



const Stack = createNativeStackNavigator();

export default function TabNavigation() {
  return (
    <Context>
 <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="Request"
          component={ReqestPage}
        //  options={{title: 'الاعدادات'}}
        />

        <Stack.Screen name="PatientState" component={PatientState} />

        <Stack.Screen name="SignIn" component={SignIn} />

        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
    </Context>
   
  );
}
