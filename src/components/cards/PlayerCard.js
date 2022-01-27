import * as React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import { Text, Paragraph, Caption } from 'react-native-paper';

function PlayerCard (props) {
    const {
        playerName,         
    } = props;
    return (
        <TouchableHighlight onPress={() => props.navigation.navigate("FavPlayerDetails", { playerName: playerName })} underlayColor="lightgrey" key={props.listKey}>
            <View style={{ flexDirection: "column", backgroundColor: "white",  marginRight: 5, marginLeft: 5, marginTop: 3, marginBottom: 3, borderColor: "#a6a1a1", borderWidth: 0.3, borderRadius: 2}}>
                <View style={{flex: 1,flexDirection: "row", alignItems: "center", margin: 5, marginBottom: 0}}>
                        <Paragraph style={{flex: 0.3, marginLeft: 10, fontWeight: "bold"}}>{ props.playerName }</Paragraph>
                        <Caption style={{flex: 0.1,  marginHorizontal: 15}}>vs</Caption>
                        <Paragraph style={{flex: 0.4}}>{ props.teamAgainst }</Paragraph>
                        <Caption style={{flex: 0.2 }}>{ props.matchDate }</Caption>
                </View>
                <View style={{flexDirection: "row", alignItems: 'center' }}>
                    <View style={{ margin: 5, marginLeft: 20 }}>
                        <Image style={{ borderWidth: 1, borderColor: "#a6a1a1", width: 50, height: 80, alignItems: "center", justifyContent: "center"}} source={{ uri: props.img }}/>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <View style={{ flexDirection: "column", marginBottom: 20,  marginLeft: 20, alignItems: "center"}}>
                            <Text style={{marginBottom: 10}}>PTS</Text>
                            <Text style={{ fontWeight: "bold"}}>{ props.points }</Text>
                        </View>
                        <View style={{ flexDirection: "column", marginLeft: 20, alignItems: "center"}}>
                            <Text style={{marginBottom: 10}}>MP</Text>
                            <Text style={{fontWeight: "bold"}}>{ props.minutes }</Text>
                        </View>
                        <View style={{ flexDirection: "column",  marginLeft: 20, alignItems: "center"}}>
                            <Text style={{marginBottom: 10 }}>AST</Text>
                            <Text style={{ fontWeight: "bold"}}>{ props.assists }</Text>
                        </View>
                        <View style={{ flexDirection: "column", marginLeft: 20, alignItems: "center"}}>
                            <Text style={{marginBottom: 10 }}>BLK</Text>
                            <Text style={{fontWeight: "bold"}}>{ props.blocks }</Text>
                        </View>
                        <View style={{ flexDirection: "column", marginLeft: 20, alignItems: "center"}}>
                            <Text style={{marginBottom: 10 }}>TRB</Text>
                            <Text style={{fontWeight: "bold"}}>{ props.totalRebounds }</Text>
                        </View>
                        <View style={{ flexDirection: "column", marginLeft: 20, alignItems: "center"}}>
                            <Text style={{marginBottom: 10 }}>STL</Text>
                            <Text style={{fontWeight: "bold"}}>{ props.steals }</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    )
}

export default PlayerCard;