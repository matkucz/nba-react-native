import * as React from 'react';
import { View } from 'react-native';
import {TextInput, Button, Title, Caption, Snackbar} from 'react-native-paper';
import AuthContext from '../context/AuthContext';

function Login({ navigation }) {
    const [loginText, setText] = React.useState('');
    const [passwordText, setPasswordText] = React.useState('');
    const [visible, setVisible] = React.useState(false);
    const toggleSnackBar = () => setVisible(true);
    const { signIn } = React.useContext(AuthContext);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                padding: 20
            }}>
            <Title>
                Sign in to your account
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
            <Button
                style={{
                    marginTop: 20
                }}
                mode="contained"
                compact={true}
                onPress={() => {
                    signIn({username: loginText, password: passwordText}).then(status => {
                        if (!status) {
                            toggleSnackBar();
                        }
                    });
                }}
            >
                Sign in
            </Button>
            <Caption 
                style={{
                    paddingTop: 20,
                    fontSize: 13
                }}
            >
                New here? Create an account
            </Caption>
            <Button
                style={{
                    marginTop: 20
                }}
                mode="contained"
                compact={true}
                onPress={() => navigation.navigate('Signup')}
            >
                Sing up
            </Button>
            <Snackbar
                visible={visible}
                duration={300}
                onDismiss={() => setVisible(false)}
                wrapperStyle = {{ alignSelf: "center" }}
                style={{ alignSelf: "baseline"}}
            >
                Wrong username or password
            </Snackbar>
        </View>
    )
}

export default Login;