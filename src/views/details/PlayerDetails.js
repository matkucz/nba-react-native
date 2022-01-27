import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Title, ActivityIndicator } from 'react-native-paper';
import { Tabs, TabScreen } from 'react-native-paper-tabs';
import { firebase } from '@react-native-firebase/firestore';


function PlayerDetails ({ navigation, route}) {
    const awards = ['7 All-NBA', '1 All-Rookie Team', '2 NBA Most Valuable Player', '9 NBA Player of the Month', '17 NBA Player of the Week', '3 NBA Rookie of the Month', '1 NBA Sportsmanship'];
    const [isLoading, setLoading] = React.useState(true);
    const [playerData, setPlayerData] = React.useState({});
    React.useEffect(() => {
        const subscriber = firebase.firestore()
            .collection('Players')
            .doc(route.params.playerName)
            .get()
            .then((res) => {
                const data = res.data()
                setPlayerData(data);
                setLoading(false);
            });
        return () => subscriber;
    }, []);

    return (
        isLoading ? 
        <View style={{flexDirection: "column", flex: 1, justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator
                visible={isLoading}
                textContent={'Loading...'}
                size='large'
            />
        </View>
        : (
        <View style={{flexDirection: "column", flex: 1}}>
            <View style={ playerStyles.playerContainer }>
                <View style={ playerStyles.imageContainer }>
                    <Image style={ playerStyles.image } source={{ uri: playerData.details.img_url }}/>
                </View>
                <View style={ playerStyles.header }>
                    <Text style={ playerStyles.headerPlayerText }>{ playerData.team }</Text>
                    <Text style= { playerStyles.headerPlayerText }>#{ playerData.team_nr } | { playerData.team_position }</Text>
                    <Title style={ playerStyles.headerPlayer}>{ playerData.details.firstname }</Title>
                    <Title style={ playerStyles.headerPlayer }>{ playerData.details.lastname }</Title>
                </View>                
            </View>
            <View style={ playerStyles.statsContainer }>
                <View style={[ playerStyles.statsRow, playerStyles.statsRowBorder ]}>
                    <Text>PPG</Text>
                    <Title>{ playerData.stats.PPG }</Title>
                </View>
                <View style={[ playerStyles.statsRow, playerStyles.statsRowBorder ]}>
                    <Text>RPG</Text>
                    <Title>{ playerData.stats.RPG }</Title>
                </View>
                <View style={[ playerStyles.statsRow, playerStyles.statsRowBorder ]}>
                    <Text>APG</Text>
                    <Title>{ playerData.stats.APG }</Title>
                </View>
                <View style={ playerStyles.statsRow }>
                    <Text>PIE</Text>
                    <Title>{ playerData.stats.PIE }</Title>
                </View>
            </View>
            <Tabs
                dark={false}
                disableSwipe={true}
                style={ playerStyles.tabs }                
            >
                <TabScreen label="Details">
                    <View style={{ flex: 1 }}>
                        <View style={ playerStyles.playerDetailsContainer }>
                            <View style={ playerStyles.playerDetailsRow }>
                                <Text style={ playerStyles.playerDetailsHeaderText }>Birthdate</Text>
                                <Text style={ playerStyles.playerDetailsText }>{ playerData.details.birthday }</Text>
                            </View>
                            <View style={ playerStyles.playerDetailsRow }>
                                <Text style={ playerStyles.playerDetailsHeaderText }>Weight</Text>
                                <Text style={ playerStyles.playerDetailsText }>{ playerData.details.weight } lb</Text>
                            </View>
                            <View style={ playerStyles.playerDetailsRow }>
                                <Text style={ playerStyles.playerDetailsHeaderText }>Height</Text>
                                <Text style={ playerStyles.playerDetailsText }>{ playerData.details.height }</Text>
                            </View>
                            <View style={ playerStyles.playerDetailsRow }>
                                <Text style={ playerStyles.playerDetailsHeaderText }>Country</Text>
                                <Text style={ playerStyles.playerDetailsText }>{ playerData.details.country }</Text>
                            </View>
                            <View style={ playerStyles.playerDetailsRow }>
                                <Text style={ playerStyles.playerDetailsHeaderText }>Last attended</Text>
                                <Text style={ playerStyles.playerDetailsText }>{ playerData.details.last_attended }</Text>
                            </View>
                            <View style={ playerStyles.playerDetailsRow }>
                                <Text style={ playerStyles.playerDetailsHeaderText }>Draft</Text>
                                <Text style={ playerStyles.playerDetailsText }>{ playerData.details.draft }</Text>
                            </View>
                            <View style={ playerStyles.playerDetailsRow }>
                                <Text style={ playerStyles.playerDetailsHeaderText }>Experience</Text>
                                <Text style={ playerStyles.playerDetailsText }>{ playerData.details.exp } { playerData.details.exp > 1 ? "years" : "year" }</Text>
                            </View>
                        </View>
                    </View>
                </TabScreen>
                <TabScreen label="Profile">
                    <View style={{ flex: 1 }}>
                        <Title style={[ playerStyles.titleText, { marginTop: 0 } ]}>Awards and Honors</Title>
                        {
                            awards.map((element) => {
                                return (
                                    <Text style={{ margin: 5, paddingLeft: 15 }}>{ element }</Text>
                                );
                            })
                        }
                    </View>
                </TabScreen>
                <TabScreen label="Stats">
                    <View>
                        <Text>Stats </Text>
                    </View>
                </TabScreen>
            </Tabs>
        </View>
        )
    )
}

const playerStyles = StyleSheet.create({
    imageContainer: { 
        flexDirection: "column", 
        alignItems: "center", 
        flex: 0.5, 
        padding: 5
    },
    image: { 
        width: 120, 
        height: 95 
    },
    header: { 
        flexDirection: "column", 
        flex: 0.5, 
        padding: 5 
    },
    headerPlayerText: { 
        flex: 0.2, 
        textAlign: "right" 
    },
    headerPlayer: {
        flex: 0.3,
        textAlign: "left"
    },
    playerContainer: {
        borderBottomWidth: 1, 
        marginHorizontal: 10,
        flexDirection: "row", 
        borderBottomColor: "#ADB5BD",
    },
    statsContainer: { 
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        marginVertical: 15 
    },
    statsRow: { 
        flexDirection: "column", 
        flex: 0.25, 
        alignItems: "center"
    },
    statsRowBorder: {
        borderRightColor: "#ADB5BD", 
        borderRightWidth: 1
    },
    tabs: {
        backgroundColor: "#E9ECEF"
    },
    playerDetailsContainer: {
        flexDirection: "column",
        marginHorizontal: 20,
        marginVertical: 15 
    },
    playerDetailsRow: { 
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center", 
        marginVertical: 7
    },
    playerDetailsHeaderText: { 
        flex: 0.5, 
        textAlign: "center", 
        borderRightColor: "#ADB5BD", 
        borderRightWidth: 1
    },
    playerDetailsText: {
        flex: 0.5, 
        textAlign: "center"
    },
    titleText: {
        fontWeight: "700",
        padding: 10,
        margin: 10,
        marginTop: 20
    },
});

export default PlayerDetails;