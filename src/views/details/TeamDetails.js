import * as React from 'react';
import { ScrollView, View, Image, StyleSheet } from 'react-native';
import { Text, Title, ActivityIndicator, Subheading, Caption } from 'react-native-paper';
import { Tabs, TabScreen } from 'react-native-paper-tabs';
import { firebase } from '@react-native-firebase/firestore';
import Table from '../../components/Table';

function TeamDetails (params) {
    const teamName = params.route.params.teamName;
    const username = params.username;
    const [ teamData, setTeamData ] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const subscriber = firebase.firestore()
        .collection('Teams')
        .where('name', '==', teamName)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((res) => {
                const data = res.data();
                setTeamData(data);
                setLoading(false);
            });
        })
        return () => subscriber;
    }, []);

    const addToFavorite = () => {
        if (username) {
            firebase.firestore().collection('Favorites').add({
                "username": username,
                "team": teamName
            });
        }
    }

    return (
        loading ? 
        <View style={{flexDirection: "column", flex: 1, justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator
                visible={loading}
                textContent={'Loading...'}
                size='large'
            />
        </View>
        :
        <View style={ teamStyles.container }>
            <View style={ teamStyles.headerContainer }>
                <View style={ teamStyles.imageContainer }>
                    <Image style={ teamStyles.image } source={{ uri: teamData.img }}/>
                </View>
                <View style={ teamStyles.textHeaderContainer }>
                    <Title style={ teamStyles.textHeaderTeam }>{ teamData.name }</Title>
                    <Title style={ teamStyles.textHeaderTeam }>{ teamData.name_short }</Title>
                    <Text style={ teamStyles.textHeader }>{ teamData.profile.header[0] } | { teamData.profile.header[1] }</Text>
                    <Text style={ teamStyles.textHeader, {color: "red"} } onPress={() => addToFavorite()}>Favorite</Text>
                </View>                
            </View>
            <View style={ teamStyles.scoreContainer }>
                <View style={[ teamStyles.scoreRow, teamStyles.scoreRowBorder ]}>
                    <Text>PPG</Text>
                    <Title>{ teamData.profile.stats.PPG.place }</Title>
                    <Text>{ teamData.profile.stats.PPG.score }</Text>
                </View>
                <View style={[ teamStyles.scoreRow, teamStyles.scoreRowBorder ]}>
                    <Text>RPG</Text>
                    <Title>{ teamData.profile.stats.RPG.place }</Title>
                    <Text>{ teamData.profile.stats.RPG.score }</Text>
                </View>
                <View style={[ teamStyles.scoreRow, teamStyles.scoreRowBorder ]}>
                    <Text>APG</Text>
                    <Title>{ teamData.profile.stats.APG.place }</Title>
                    <Text>{ teamData.profile.stats.APG.score }</Text>
                </View>
                <View style={ teamStyles.scoreRow }>
                    <Text>OOPG</Text>
                    <Title>{ teamData.profile.stats.OPPG.place }</Title>
                    <Text>{ teamData.profile.stats.OPPG.score }</Text>
                </View>
            </View>
            <Tabs
                dark={false}
                disableSwipe={true}
                style={ teamStyles.tabs }                
            >
                <TabScreen label="Profile">
                    <ScrollView style={{flex: 1}}>
                        <Title style={[ teamStyles.titleText, { marginTop: 20 }]}>Coaching Staff</Title>
                        {
                            teamData.profile.coaching_staff.map((element) => {
                                    return (
                                        <>
                                            <Subheading style={{ margin: 5, paddingLeft: 15 }}>{ element.title }</Subheading>
                                            <Text style={{ margin: 5, paddingLeft: 15 }}>{ element.staff }</Text>
                                        </>
                                    );
                                })
                        }
                        <Title style={[ teamStyles.titleText, { marginTop: 20 } ]}>Retired Numbers</Title>
                        <Table
                            columns={ teamData.profile.retired_columns }
                            headers={ teamData.profile.retired_numbers_num }
                            headersFlex = {0.3}
                            dataMaper = { ["name", "pos", "seasons_with_team", "year_of_induction"] }
                            data={ teamData.profile.retired_numbers }
                        />
                        <Title style={[ teamStyles.titleText, { marginTop: 20 } ]}>Hall of Fame</Title>
                        <Table
                            columns={ teamData.profile.hall_columns }
                            headers={ teamData.profile.hall_names }
                            dataMaper = { [ "pos", "seasons_with_team", "year_of_induction"] }
                            data={ teamData.profile.hall_of_fame }
                        />
                        <Title style={[ teamStyles.titleText, { marginTop: 20 } ]}>All Time Records</Title>
                        {
                            teamData.profile.all_time_records.map((element) => {
                                    return (
                                        <>
                                            <Subheading style={{ margin: 5, paddingLeft: 15 }}>{ element.record }</Subheading>
                                            <Caption style={{ margin: 5, paddingLeft: 15 }}>Player: { element.player_name }</Caption>
                                            <Caption style={{ margin: 5, paddingLeft: 15 }}>Score: { element.record_score }</Caption>
                                        </>
                                    );
                                })
                        }
                        <Title style={[ teamStyles.titleText, { marginTop: 20 } ]}>Achievements</Title>
                        {
                            teamData.profile.achievements.map((element) => {
                                    return (
                                        <>
                                            <Subheading style={{ margin: 5, paddingLeft: 15 }}>{ element.title }</Subheading>
                                            <Text style={{ margin: 5, paddingLeft: 15 }}>{ element.years }</Text>
                                        </>
                                    );
                                })
                        }
                        <Title style={[ teamStyles.titleText, { marginTop: 20 } ]}>Background</Title>
                        {
                            teamData.profile.background.map((element) => {
                                    return (
                                        <>
                                            <Subheading style={{ margin: 5, paddingLeft: 15 }}>{ element.title }</Subheading>
                                            <Caption style={{ margin: 5, paddingLeft: 15 }}>{ element.element }</Caption>
                                        </>
                                    );
                                })
                        }
                    </ScrollView>
                </TabScreen>
                <TabScreen label="Roster">
                    <ScrollView style={{flex: 1}}>
                        <Title style={ teamStyles.titleText }>Roster</Title>
                        <Table
                            columns={ teamData.roster_columns }
                            headers={ teamData.roster_numbers }
                            headersFlex = {0.3}
                            dataMaper = { [
                                "name",
                                "pos",
                                "height",
                                "weight",
                                "birth_date",
                                "nationality",
                                "experience",
                                "college"
                            ]  }
                            data={ teamData.roster }
                        />
                        <Title style={ teamStyles.titleText }>Roster Salaries</Title>
                    </ScrollView>
                </TabScreen>
                <TabScreen label="Stats">
                    <ScrollView style={{flex: 1}}>
                        <Title style={ teamStyles.titleText }>Roster Stats</Title>
                        <Table
                            columns={ teamData.roster_stats_columns }
                            headers={ teamData.roster_names }
                            dataMaper = { [
                                "Age",
                                "G",
                                "GS",
                                "MP",
                                "FG",
                                "FGA",
                                "3P",
                                "3PA",
                                "2P",
                                "2PA",
                                "FT",
                                "FTA",
                                "ORB",
                                "DRB",
                                "TRB",
                                "AST",
                                "STL",
                                "BLK",
                                "TOV",
                                "PF",
                                "PTS/G"
                            ] }
                            data={ teamData.roster_stats }
                        />
                    </ScrollView>
                </TabScreen>
            </Tabs>
        </View>
    )
}

const teamStyles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1
    },
    headerContainer: { 
        flexDirection: "row", 
        borderBottomColor: "#ADB5BD", 
        borderBottomWidth: 1,
        marginHorizontal: 10
    },
    textHeaderTeam: {
        flex: 0.3, 
        textAlign: "left"
    },
    textHeader: {
        flex: 0.2, 
        textAlign: "left"
    },
    textHeaderContainer: {
        flexDirection: "column", 
        flex: 0.5, 
        padding: 5
    },
    imageContainer: {
        flexDirection: "column", 
        alignItems: "center", 
        flex: 0.5,  
        padding: 5
    },
    image: { 
        width: 120,
        height: 120
    },
    scoreContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        marginVertical: 15
    },
    scoreRowBorder: {
        borderRightColor: "#ADB5BD",
        borderRightWidth: 1
    },
    scoreRow: {
        flexDirection: "column",
        flex: 0.25,
        alignItems: "center"
    },
    tabs: {
        backgroundColor: "#E9ECEF"
    },
    titleText: {
        fontWeight: "700",
        padding: 10,
        margin: 10,
    }
});

export default TeamDetails;