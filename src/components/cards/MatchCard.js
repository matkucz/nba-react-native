import * as React from 'react';
import { View, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { Title, Text, Caption } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


function MatchCardContent (props) {
    return (
        <View style={matchStyles.container} key={props.id}>
            <View style={{ flexDirection: "row"}}>
                <View style={matchStyles.imageContainer}>
                    <Image style={matchStyles.image} source={{ uri: props.homeImg }}/>
                    <Title style={{marginLeft: 25}}>{ props.homeScore }</Title>
                </View>
                <View style={matchStyles.separator}>
                    <Caption>FINAL</Caption>
                </View>
                <View style={matchStyles.imageContainer}>
                    <Title style={{marginRight: 25}}>{ props.awayScore }</Title>
                    <Image style={matchStyles.image} source={{ uri: props.awayImg }}/>
                </View>
            </View>
            <View style={{flexDirection: "row"}}>
                <View style={{flex: 0.3, alignItems: 'flex-start'}}>
                    <Text style={{fontWeight: "bold"}}>{ props.homeTeam }</Text>
                </View>
                <View style={{flex: 0.3, alignItems: 'center'}}>
                    <Text>{ props.date }</Text>
                </View>
                <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                    <Text style={{fontWeight: "bold"}}>{ props.awayTeam }</Text>
                </View>
            </View>
        </View>
    );
}

function MatchCard (props) {    
    const navigation = useNavigation();
    const {
        awayImg, 
        awayScore, 
        awayTeam, 
        date, 
        homeImg, 
        homeScore, 
        homeTeam,
        matchID
    } = props;
    return (
        <TouchableHighlight onPress={() => {
            return navigation.navigate("MatchDetails", {
                    matchID: matchID,
                    awayImg: awayImg,
                    awayScore: awayScore, 
                    awayTeam: awayTeam, 
                    date: date, 
                    homeImg: homeImg, 
                    homeScore: homeScore, 
                    homeTeam: homeTeam,
                });
            }} 
            underlayColor="lightgrey"
        > 
            <MatchCardContent 
                awayImg={awayImg}
                awayScore={awayScore}
                awayTeam={awayTeam}
                date={date}
                homeScore={homeScore}
                homeTeam={homeTeam}
                homeImg={homeImg}
            />             
        </TouchableHighlight>
    );
}

const matchStyles = StyleSheet.create({
    container: {
        opacity: 5,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        marginRight: 5,
        marginLeft: 5,
        marginTop: 3,
        marginBottom: 3,
        borderColor: "#a6a1a1",
        borderWidth: 0.3,
        borderRadius: 2
    },
    imageContainer: {
        flexDirection: "row",
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15
    },
    image: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: "#a6a1a1"
    },
    separator: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center'
    }

})
export default MatchCard;