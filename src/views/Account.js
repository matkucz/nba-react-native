import * as React from 'react';
import { View } from 'react-native';
import {TextInput, Button, Title, Caption, Snackbar} from 'react-native-paper';
import AuthContext from '../context/AuthContext';
import { firebase } from '@react-native-firebase/firestore';

function Account({ navigation, ...params }) {
    const [oldPasswordText, setOldPasswordText] = React.useState('');
    const [passwordText, setPasswordText] = React.useState('');
    const [repeatPasswordText, setRepeatPasswordText] = React.useState('');
    const [visible, setVisible] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const { signOut } = React.useContext(AuthContext);
    const [loading, setLoading] = React.useState(false);
    const firestore = firebase.firestore();

    return (
        <View
            style={{
                padding: 20
            }}>
            <Title>
                Change your password
            </Title>
            <TextInput
                style={{
                    paddingTop: 20
                }}
                label="Old password"
                mode="outlined"
                disabled={loading}
                value={oldPasswordText}
                secureTextEntry={true}
                onChangeText={text => setOldPasswordText(text)}
            />
            <TextInput
                style={{
                    paddingTop: 20
                }}
                label="New password"
                mode="outlined"
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
                onPress={() => {
                        setLoading(true);
                        if (oldPasswordText === passwordText) {
                            setMessage("Old and new password can't be the same")
                            setVisible(true);
                        } else if (passwordText === repeatPasswordText) {
                            firestore.collection("Users").where('username', '==', params.username).get().then(
                                (querySnapshot) => {
                                    querySnapshot.forEach(query => {
                                        if(query.data().password !== oldPasswordText) {
                                            setMessage("Wrong old password.")
                                            setVisible(true);
                                        } else {
                                            query.ref.update({
                                                password: passwordText
                                            }).then(() => {
                                                    setMessage("Password changed.")
                                                    setVisible(true);
                                                    signOut();
                                                }
                                            )
                                        }
                                    });
                                }
                            ).finally(() => setLoading(false));
                        } else {
                            setMessage("New passwords are not the same")
                            setVisible(true);
                        }
                        setLoading(false);
                    }
                }
            >
                Change password
            </Button>
            <Caption 
                style={{
                    paddingTop: 20,
                    fontSize: 13
                }}
            >
                Logout?
            </Caption>
            <Button
                disabled={loading}
                style={{
                    marginTop: 20
                }}
                mode="contained"
                compact={true}
                onPress={() => {
                        signOut();
                    }
                }
            >
                Logout
            </Button>
            <Caption 
                style={{
                    paddingTop: 20,
                    fontSize: 13
                }}
            >
                Want to delete accout?
            </Caption>
            <Button
                disabled={loading}
                style={{
                    marginTop: 20
                }}
                mode="contained"
                compact={true}
                onPress={() => {
                        firestore.collection("Users").where('username', '==', params.username).get().then(
                            (querySnapshot) => {
                                querySnapshot.forEach(query => {
                                    query.ref.delete().then(() => {
                                        setMessage("Account deleted.")
                                        setVisible(true);
                                        signOut();
                                    })
                                    .catch((error) => console.error(error))
                                });
                            }
                        ).finally(() => setLoading(false));
                    }
                }
            >
                Delete
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

export default Account;