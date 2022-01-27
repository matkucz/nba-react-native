import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Title, Text, Caption, ActivityIndicator } from 'react-native-paper';
import MatchTeamStats from '../../components/MatchTeamStats';
import Table from '../../components/Table';
import { Tabs, TabScreen } from 'react-native-paper-tabs';
import { firebase } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

function Result (params) {
    const navigation = useNavigation();
    return (
        <View style={ resultStyles.container }>
            <Avatar.Image style={ [resultStyles.mh15 ,  { backgroundColor: "white" } ] } size={36} source={{ uri: params.homeImg }} onTouchStart={() => navigation.navigate("TeamScreen", {teamName: params.homeTeam})}/>
            <Title style={[ resultStyles.mt3, resultStyles.mh15 ]}>{ params.homeScore }</Title>
            <Caption style={[ resultStyles.mt8, resultStyles.mh12 ]}>FINAL</Caption>
            <Title style={[ resultStyles.mt3, resultStyles.mh15 ]}>{ params.awayScore }</Title>
            <Avatar.Image style={ [resultStyles.mh15 ,  { backgroundColor: "white" } ] } size={36} source={{ uri: params.awayImg }} onTouchStart={() => navigation.navigate("TeamScreen", {teamName: params.awayTeam})}/>
        </View>
    );
}

const resultStyles = StyleSheet.create({
    container: {
        flexDirection: "row", 
        alignContent: "center", 
        justifyContent: "center", 
        margin: 5, 
        paddingVertical: 10
    },
    mh15: {
        marginHorizontal: 15,
    },
    mh12: {
        marginHorizontal: 15
    },
    mt3: {
        marginTop: 3,
    },
    mt8: {
        marginTop: 8,
    }
});


class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowFlex: 1 / ( 5 + props.overtime.length )
        };
    }
    render() {
        return (        
            <View style={ summaryStyles.container }>
                <View style={ summaryStyles.teams }>
                    <Text style={ summaryStyles.text }></Text>
                    <Text style={ summaryStyles.headerText }>{ this.props.homeTeam }</Text>
                    <Text style={ summaryStyles.headerText }>{ this.props.awayTeam }</Text>
                </View>
                <View style={ summaryStyles.scores }>
                {
                    this.props.rounds.map(([homeScore, awayScore], index) => (
                        <View style={[ summaryStyles.scoreColumn, { flex: this.state.rowFlex }]}>
                            <Text style={ summaryStyles.headerText }>Q{  index + 1 }</Text>
                            <Text style={[ summaryStyles.text, homeScore > awayScore ? summaryStyles.biggerScore : {}] }>{ homeScore }</Text>
                            <Text style={[ summaryStyles.text, homeScore < awayScore ? summaryStyles.biggerScore : {}] }>{ awayScore }</Text>
                        </View>                    
                    )).concat(
                        this.props.overtime.map(([homeScore, awayScore], index) => (
                            <View style={[ summaryStyles.scoreColumn, { flex: this.state.rowFlex }]}>
                                <Text style={ summaryStyles.headerText }>OT{ index + 1 }</Text>
                                <Text style={[ summaryStyles.text, homeScore > awayScore ? summaryStyles.biggerScore : {}] }>{ homeScore }</Text>
                                <Text style={[ summaryStyles.text, homeScore < awayScore ? summaryStyles.biggerScore : {}] }>{ awayScore }</Text>
                            </View>
                        ))
                    )
                }
                    <View style={[ summaryStyles.scoreColumn, { flex: this.state.rowFlex } ]}>
                        <Text style={ summaryStyles.headerText }>TOT</Text>
                        <Text style={[ summaryStyles.text, parseInt(this.props.homeScore) > parseInt(this.props.awayScore) ? summaryStyles.biggerScore : {}] }>{ this.props.homeScore }</Text>
                        <Text style={[ summaryStyles.text, parseInt(this.props.homeScore) < parseInt(this.props.awayScore) ? summaryStyles.biggerScore : {}] }>{ this.props.awayScore }</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const summaryStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginHorizontal: 10,
        marginVertical: 10,
        flexWrap: "wrap"
    },
    teams: {
        flex: 0.15, 
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 15
    },
    headerText: {
        marginVertical: 5,
        fontWeight: "bold"
    },
    scores: {
        flexDirection: "row",
        flex: 0.85
    },
    scoreColumn: {
        flexDirection: "column",
        borderLeftColor: "gray", 
        borderLeftWidth: 0.2,  
        alignItems: "center"
    },
    text: {
        marginVertical: 5
    },
    biggerScore: {
        color: "red"
    }
    
});

class MatchDetails extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            rounds: [ ],
            overtime: [ ],
            firestore: firebase.firestore(),
            loading: true
        }
    }
    
    async componentDidMount () {
        const [ matchData, teams ] = await Promise.all([
            this.getMatch(),
            this.getTeamInfo([
                this.props.route.params.homeTeam,
                this.props.route.params.awayTeam
            ])
        ]);

        this.handleMatchData(matchData);
        this.handleTeamData(teams);
        this.setState({loading: false});
    }

    handleTeamData (result) {
        this.setState({ teamData: result });
    }

    handleMatchData (result) {
        this.setState({ matchData: result });
    }


    getMatch = () => {
        let outData = this.state.firestore
        .collection('Matches')
        .where('id', '==', this.props.route.params.matchID)
        .get()
        .then((querySnapshot) => {
            let outD = {};
            querySnapshot.forEach((res) => {
                outD = res.data();
            });
            return outD;
        });
        return outData;       
    }

    getTeamInfo = (teamNames) => {
        const teamData = this.state.firestore
        .collection('Teams')
        .where('name', 'in', teamNames)
        .get()
        .then((querySnapshot) => {
            let teamD = {};
            querySnapshot.forEach((res) => {
                const data = res.data();
                const team = {
                    "abbreviation": data.abbreviation,
                    "division": data.division,
                    "id": data.id,
                    "name": data.name,
                    "name_short": data.name_short
                };
                if (team.name == this.props.route.params.homeTeam) {
                    teamD["homeTeam"] = team;
                } else {
                    teamD["awayTeam"] = team;
                }                
            });
            return teamD;
        });
        return teamData;
    }

    render () {
            return (
                this.state.loading ?
                <View style={{flexDirection: "column", flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <ActivityIndicator
                        visible={this.state.loading}
                        textContent={'Loading...'}
                        size='large'
                    />
                </View>
                :
        <View style={{flexDirection: "column", flex: 1}}>
            <Result {...this.props.route.params} />
            <Tabs
                dark={false}
                disableSwipe={true}
                style={{ backgroundColor: "#E9ECEF" }}
            >
                <TabScreen label="Summary">
                    <Summary
                        homeTeam={this.state.teamData.homeTeam.abbreviation}
                        awayTeam={this.state.teamData.awayTeam.abbreviation}
                        rounds={this.state.rounds}
                        overtime={this.state.overtime}
                        homeScore={this.props.route.params.homeScore}
                        awayScore={this.props.route.params.awayScore}
                    />
                </TabScreen>
                <TabScreen label="Game Stats">
                    <MatchTeamStats
                        homeTeam={this.state.teamData.homeTeam.name_short}
                        awayTeam={this.state.teamData.awayTeam.name_short}
                        stats={
                            this.state.matchData
                        }
                    />
                </TabScreen>
                <TabScreen label="Box Score">
                    <ScrollView style={{flex: 1}}>
                        <Title style={{ fontWeight: "900", paddingLeft: 10, margin: 10}}>{ this.state.teamData.homeTeam.name }</Title>
                        <Table
                            columns={ this.state.matchData.columns }
                            headers={ this.state.matchData.home_players }
                            headersFlex = {0.6}
                            dataMaper = { this.state.matchData.columns.slice(1) }
                            data={ this.state.matchData.home_score }
                        />
                        <Title style={{  fontWeight: "900", paddingLeft: 10, margin: 10, marginTop: 20 }}>{ this.state.teamData.awayTeam.name }</Title>
                        <Table
                            columns={ this.state.matchData.columns }
                            headers={ this.state.matchData.away_players }
                            headersFlex = {0.6}
                            dataMaper = { this.state.matchData.columns.slice(1) }
                            data={ this.state.matchData.away_score }
                        />
                    </ScrollView>
                </TabScreen>
            </Tabs>
        </View>
    )
    }
}

export default MatchDetails;