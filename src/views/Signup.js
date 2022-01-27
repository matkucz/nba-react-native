import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import {TextInput, Button, Title, Caption, Snackbar} from 'react-native-paper';
import AuthContext from '../context/AuthContext';

function Signup({ navigation }) {
    const [loginText, setText] = React.useState('');
    const [passwordText, setPasswordText] = React.useState('');
    const [repeatPasswordText, setRepeatPasswordText] = React.useState('');
    const navigate = useNavigation();
    const [visible, setVisible] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const { signUp } = React.useContext(AuthContext);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                padding: 20
            }}>
            <Title>
                Sign up
            </Title>
            <TextInput
                style={{
                    paddingTop: 20
                }}
                label="Login"
                mode="outlined"
                value={loginText}
                onChangeText={text => setText(text)}
            />
            <TextInput
                style={{
                    paddingTop: 20
                }}
                label="Password"
                mode="outlined"
                value={passwordText}
                secureTextEntry={true}
                onChangeText={text => setPasswordText(text)}
            />
            <TextInput
                style={{
                    paddingTop: 20
                }}
                label="Repeat passoword"
                mode="outlined"
                value={repeatPasswordText}
                secureTextEntry={true}
                onChangeText={text => setRepeatPasswordText(text)}
            />
            <Button
                style={{
                    marginTop: 20
                }}
                mode="contained"
                compact={true}
                onPress={() => {
                        if (passwordText === repeatPasswordText) {
                            signUp({username:loginText, password:passwordText}).then(sign => {                            
                                if (!sign) {
                                    setVisible(true);
                                    setMessage("User with given login already exist");
                                } else {
                                    navigate.navigate("Signin");
                                }
                            });                            
                        } else {
                            setVisible(true);
                            setMessage("Password aren't the same");
                        }                        
                    }
                }
            >
                Sign up
            </Button>
            <Caption 
                style={{
                    paddingTop: 20,
                    fontSize: 13
                }}
            >
                Already have an account? Log in
            </Caption>
            <Button
                style={{
                    marginTop: 20
                }}
                mode="contained"
                compact={true}
                onPress={() => navigation.navigate("Signin")}
            >
                Log in
            </Button>
            <Snackbar
                visible={visible}
                duration={300}
                onDismiss={() => setVisible(false)}
                wrapperStyle = {{ alignSelf: "center" }}
                style={{ alignSelf: "baseline"}}
            >
                {message}
            </Snackbar>
        </View>
    )
}

export default Signup;