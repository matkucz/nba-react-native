import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favorites from '../views/Favorites';

const FavoritesStack = createNativeStackNavigator();

function FavoritesStackScreen(params) {
    return (
        <FavoritesStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <FavoritesStack.Screen name="FavoritesScreen">
                {(props) => <Favorites username={params.loggedUser} {...props}/>}
            </FavoritesStack.Screen>
        </FavoritesStack.Navigator>
    )
}

export default FavoritesStackScreen;