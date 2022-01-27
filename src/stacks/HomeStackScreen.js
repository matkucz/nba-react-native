import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../views/Home';
import TeamDetails from '../views/details/TeamDetails';
import MatchDetails from '../views/details/MatchDetails';
import PlayerDetails from '../views/details/PlayerDetails';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen(params) {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <HomeStack.Screen name="HomeScreen" component={Home}/>
            <HomeStack.Screen name="TeamScreen">
                {(props)=> <TeamDetails username={params.loggedUser} {...props}/>}
            </HomeStack.Screen> 
            <HomeStack.Screen name="MatchDetails" component={MatchDetails}/>
            <HomeStack.Screen name="PlayerDetails" component={PlayerDetails}/>
        </HomeStack.Navigator>
    )
}

export default HomeStackScreen;