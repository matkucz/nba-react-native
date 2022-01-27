import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Account from '../views/Account';
import Login from '../views/Login';
import Signup from '../views/Signup';

const AccountStack = createNativeStackNavigator();

function AccountStackScreen(params) {
    return (
        <AccountStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {
                params.loggedUser === null ? (
                    <>
                        <AccountStack.Screen name="Signin" component={Login}/>
                        <AccountStack.Screen name="Signup" component={Signup}/>
                    </>
                ) : (
                    <AccountStack.Screen name="Screen">
                        {(props) => <Account username={params.loggedUser} {...props}/>}
                    </AccountStack.Screen>
                )
            }
        </AccountStack.Navigator>
    )
}

export default AccountStackScreen;