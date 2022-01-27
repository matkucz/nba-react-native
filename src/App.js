import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './stacks/HomeStackScreen';
import FavoritesStackScreen from './stacks/FavoritesStackScreen';
import AccountStackScreen from './stacks/AccountStackScreen';
import AuthContext from './context/AuthContext';
import { firebase } from '@react-native-firebase/firestore';

const Tab = createBottomTabNavigator();

function App() {
    const firestore = firebase.firestore(); 

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'SIGN_IN':
                return {
                    ...prevState,
                    isSignout: false,
                    username: action.username,
                };
                case 'SIGN_OUT':
                return {
                    ...prevState,
                    isSignout: true,
                    username: null,
                };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            username: null,
        }
    );

    const authContext = React.useMemo(() => ({
        signIn: async data => {
            const status = firestore.collection("Users")
            .where('username', '==', data.username)
            .get()
            .then((querySnapshot) => {
                let databaseUser = null;
                querySnapshot.forEach((res) => {
                    databaseUser = res.data();
                });
                if (databaseUser && databaseUser.password === data.password) {
                    dispatch({ type: 'SIGN_IN', username: data.username });
                    return true;
                }
                return false;                
            });
            return status;             
        },
        signOut: () => dispatch({ type: 'SIGN_OUT' }),
        signUp: async data => {
            const status = firestore.collection("Users")
            .where('username', '==', data.username)
            .get()
            .then((querySnapshot) => {
                let databaseUser = null;
                querySnapshot.forEach((res) => {
                    databaseUser = res.data();
                });
                if (!databaseUser) {
                    firestore.collection("Users").add({username:data.username, password:data.password})
                    return true;
                }
                return false;
            });
            return status;
        }
    }),[]);

    return (
        <PaperProvider>
                <NavigationContainer>
                <AuthContext.Provider value={authContext}>
                    <Tab.Navigator
                        initialRouteName='Home'
                        screenOptions={({route}) => ({
                            tabBarIcon: ({ focused, color, size}) => {
                                let iconName = "";
                                if (route.name == "Home") {
                                    iconName = focused ? "home" : "home-outline";                        
                                }
                                else if (route.name == "Favorites") {
                                    iconName = focused ? "heart" : "heart-outline";
                                }
                                else if (route.name == "Account") {
                                    iconName = focused ? "person" : "person-outline";
                                }
                                return <Ionicons name={iconName} size={size} color={color}/>
                            },
                            tabBarStyle: { backgroundColor: "#E9ECEF" },
                            tabBarActiveTintColor: 'blueviolet',
                            tabBarInactiveTintColor: 'gray',
                            headerShown: false,
                        }
                        )}>
                        <Tab.Screen name="Favorites">
                            {(props) => <FavoritesStackScreen loggedUser={state.username} {...props}/>}
                        </Tab.Screen> 
                        <Tab.Screen name="Home">
                            {(props) => <HomeStackScreen loggedUser={state.username} {...props}/>}
                        </Tab.Screen>
                        <Tab.Screen name="Account">
                            {(props) => <AccountStackScreen loggedUser={state.username} {...props}/>}
                        </Tab.Screen>
                    </Tab.Navigator>
        </AuthContext.Provider>
                </NavigationContainer>
            </PaperProvider>
    )
}


export default App;