import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Caption, Divider } from 'react-native-paper';


function MatchTeamStats (params) {
    return (
            <View style={ styles.container }>
                <View style={ styles.header }>
                    <Text style={[ styles.headerText, styles.headerLeft ]}>{ params.homeTeam }</Text>
                    <Text style={[ styles.headerText, styles.headerRight ]}>{ params.awayTeam }</Text>
                    <Divider/>
                </View>
                <View style={ styles.row }>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.home_totals.FG) > parseInt(params.stats.away_totals.FG) ? styles.triangleOrange : styles.triangleWhite }>&#9654;</Text>
                    <Text style={[ styles.text, styles.textLeft ]}>{ parseInt(params.stats.home_totals.FG) }</Text>
                    <Text style={ styles.description }>Field Goals</Text>
                    <Text style={[ styles.text, styles.textRight ]}>{ parseInt(params.stats.away_totals.FG) }</Text>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.away_totals.FG) > parseInt(params.stats.home_totals.FG) ? styles.triangleOrange : styles.triangleWhite }>&#9664;</Text>
                    <Divider/>
                </View>
                <View style={ styles.row }>
                    <Text style={ styles.triangleContainer, parseFloat(params.stats.home_totals["FG%"]) > parseFloat(params.stats.away_totals["FG%"]) ? styles.triangleOrange : styles.triangleWhite }>&#9654;</Text>
                    <Text style={[ styles.text, styles.textLeft ]}>{ parseFloat(params.stats.home_totals["FG%"]) }</Text>
                    <Caption style={ styles.description }>Percent</Caption>
                    <Text style={[ styles.text, styles.textRight ]}>{ parseFloat(params.stats.away_totals["FG%"]) }</Text>
                    <Text style={ styles.triangleContainer, parseFloat(params.stats.away_totals["FG%"]) > parseFloat(params.stats.home_totals["FG%"]) ? styles.triangleOrange : styles.triangleWhite }>&#9664;</Text>
                    <Divider/>
                </View>
                <View style={ styles.row }>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.home_totals.FT) > parseInt(params.stats.away_totals.FT) ? styles.triangleOrange : styles.triangleWhite }>&#9654;</Text>
                    <Text style={[ styles.text, styles.textLeft ]}>{ parseInt(params.stats.home_totals.FT) }</Text>
                    <Text style={ styles.description }>Free Throws</Text>
                    <Text style={[ styles.text, styles.textRight ]}>{ parseInt(params.stats.away_totals.FT) }</Text>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.away_totals.FT) > parseInt(params.stats.home_totals.FT) ? styles.triangleOrange : styles.triangleWhite }>&#9664;</Text>
                    <Divider/>
                </View>
                <View style={ styles.row }>
                    <Text style={ styles.triangleContainer, parseFloat(params.stats.home_totals["FT%"]) > parseFloat(params.stats.away_totals["FT%"]) ? styles.triangleOrange : styles.triangleWhite }>&#9654;</Text>
                    <Text style={[ styles.text, styles.textLeft ]}>{ parseFloat(params.stats.home_totals["FT%"]) }</Text>
                    <Caption style={ styles.description }>Percent</Caption>
                    <Text style={[ styles.text, styles.textRight ]}>{ parseFloat(params.stats.away_totals["FT%"]) }</Text>
                    <Text style={ styles.triangleContainer, parseFloat(params.stats.away_totals["FT%"]) > parseFloat(params.stats.home_totals["FT%"]) ? styles.triangleOrange : styles.triangleWhite }>&#9664;</Text>
                    <Divider/>
                </View>                
                <View style={ styles.row }>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.home_totals["3P"]) > parseInt(params.stats.away_totals["3P"]) ? styles.triangleOrange : styles.triangleWhite }>&#9654;</Text>
                    <Text style={[ styles.text, styles.textLeft ]}>{ parseInt(params.stats.home_totals["3P"]) }</Text>
                    <Text style={ styles.description }>3 Point</Text>
                    <Text style={[ styles.text, styles.textRight ]}>{ parseInt(params.stats.away_totals["3P"]) }</Text>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.away_totals["3P"]) > parseInt(params.stats.home_totals["3P"]) ? styles.triangleOrange : styles.triangleWhite }>&#9664;</Text>
                    <Divider/>
                </View>
                <View style={ styles.row }>
                    <Text style={ styles.triangleContainer, parseFloat(params.stats.home_totals["3P%"]) > parseFloat(params.stats.away_totals["3P%"]) ? styles.triangleOrange : styles.triangleWhite }>&#9654;</Text>
                    <Text style={[ styles.text, styles.textLeft ]}>{ parseFloat(params.stats.home_totals["3P%"]) }</Text>
                    <Caption style={ styles.description }>Percent</Caption>
                    <Text style={[ styles.text, styles.textRight ]}>{ parseFloat(params.stats.away_totals["3P%"]) }</Text>
                    <Text style={ styles.triangleContainer, parseFloat(params.stats.away_totals["3P%"]) > parseFloat(params.stats.home_totals["3P%"]) ? styles.triangleOrange : styles.triangleWhite }>&#9664;</Text>
                    <Divider/>
                </View>
                <View style={ styles.row }>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.home_totals.TRB) > parseInt(params.stats.away_totals.TRB) ? styles.triangleOrange : styles.triangleWhite }>&#9654;</Text>
                    <Text style={[ styles.text, styles.textLeft ]}>{ parseInt(params.stats.home_totals.TRB) }</Text>
                    <Text style={ styles.description }>Rebounds</Text>
                    <Text style={[ styles.text, styles.textRight ]}>{ parseInt(params.stats.away_totals.TRB) }</Text>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.away_totals.TRB) > parseInt(params.stats.home_totals.TRB) ? styles.triangleOrange : styles.triangleWhite }>&#9664;</Text>
                    <Divider/>
                </View>
                <View style={ styles.row }>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.home_totals.ORB) > parseInt(params.stats.away_totals.ORB) ? styles.triangleOrange : styles.triangleWhite }>&#9654;</Text>
                    <Text style={[ styles.text, styles.textLeft ]}>{ parseInt(params.stats.home_totals.ORB) }</Text>
                    <Caption style={ styles.description }>Offensive</Caption>
                    <Text style={[ styles.text, styles.textRight ]}>{ parseInt(params.stats.away_totals.ORB) }</Text>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.away_totals.ORB) > parseInt(params.stats.home_totals.ORB) ? styles.triangleOrange : styles.triangleWhite }>&#9664;</Text>
                    <Divider/>
                </View>
                <View style={ styles.row }>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.home_totals.DRB) > parseInt(params.stats.away_totals.DRB) ? styles.triangleOrange : styles.triangleWhite }>&#9654;</Text>
                    <Text style={[ styles.text, styles.textLeft ]}>{ parseInt(params.stats.home_totals.DRB) }</Text>
                    <Caption style={ styles.description }>Defensive</Caption>
                    <Text style={[ styles.text, styles.textRight ]}>{ parseInt(params.stats.away_totals.DRB) }</Text>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.away_totals.DRB) > parseInt(params.stats.home_totals.DRB) ? styles.triangleOrange : styles.triangleWhite }>&#9664;</Text>
                    <Divider/>
                </View>
                <View style={ styles.row }>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.home_totals.AST) > parseInt(params.stats.away_totals.AST) ? styles.triangleOrange : styles.triangleWhite }>&#9654;</Text>
                    <Text style={[ styles.text, styles.textLeft ]}>{ parseInt(params.stats.home_totals.AST) }</Text>
                    <Text style={ styles.description }>Assists</Text>
                    <Text style={[ styles.text, styles.textRight ]}>{ parseInt(params.stats.away_totals.AST) }</Text>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.away_totals.AST) > parseInt(params.stats.home_totals.AST) ? styles.triangleOrange : styles.triangleWhite }>&#9664;</Text>
                    <Divider/>
                </View>
                <View style={ styles.row }>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.home_totals.BLK) > parseInt(params.stats.away_totals.BLK) ? styles.triangleOrange : styles.triangleWhite }>&#9654;</Text>
                    <Text style={[ styles.text, styles.textLeft ]}>{ parseInt(params.stats.home_totals.BLK) }</Text>
                    <Text style={ styles.description }>Blocks</Text>
                    <Text style={[ styles.text, styles.textRight ]}>{ parseInt(params.stats.away_totals.BLK) }</Text>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.away_totals.BLK) > parseInt(params.stats.home_totals.BLK) ? styles.triangleOrange : styles.triangleWhite }>&#9664;</Text>
                    <Divider/>
                </View>
                <View style={ styles.row }>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.home_totals.STL) > parseInt(params.stats.away_totals.STL) ? styles.triangleOrange : styles.triangleWhite }>&#9654;</Text>
                    <Text style={[ styles.text, styles.textLeft ]}>{ parseInt(params.stats.home_totals.STL) }</Text>
                    <Text style={ styles.description }>Steals</Text>
                    <Text style={[ styles.text, styles.textRight ]}>{ parseInt(params.stats.away_totals.STL) }</Text>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.away_totals.STL) > parseInt(params.stats.home_totals.STL) ? styles.triangleOrange : styles.triangleWhite }>&#9664;</Text>
                    <Divider/>
                </View>
                <View style={ styles.row }>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.home_totals["+/-"]) > parseInt(params.stats.away_totals["+/-"]) ? styles.triangleOrange : styles.triangleWhite }>&#9654;</Text>
                    <Text style={[ styles.text, styles.textLeft ]}>{ parseInt(params.stats.home_totals["+/-"]) }</Text>
                    <Text style={ styles.description }>Plus/Minus</Text>
                    <Text style={[ styles.text, styles.textRight ]}>{ parseInt(params.stats.away_totals["+/-"]) }</Text>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.away_totals["+/-"]) > parseInt(params.stats.home_totals["+/-"]) ? styles.triangleOrange : styles.triangleWhite }>&#9664;</Text>
                    <Divider/>
                </View>
                <View style={ styles.row }>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.home_totals.TOV) > parseInt(params.stats.away_totals.TOV) ? styles.triangleOrange : styles.triangleWhite }>&#9654;</Text>
                    <Text style={[ styles.text, styles.textLeft ]}>{ parseInt(params.stats.home_totals.TOV) }</Text>
                    <Text style={ styles.description }>Turnovers</Text>
                    <Text style={[ styles.text, styles.textRight ]}>{ parseInt(params.stats.away_totals.TOV) }</Text>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.away_totals.TOV) > parseInt(params.stats.home_totals.TOV) ? styles.triangleOrange : styles.triangleWhite }>&#9664;</Text>
                    <Divider/>
                </View>
                <View style={ styles.row }>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.home_totals.PF) > parseInt(params.stats.away_totals.PF) ? styles.triangleOrange : styles.triangleWhite }>&#9654;</Text>
                    <Text style={[ styles.text, styles.textLeft ]}>{ parseInt(params.stats.home_totals.PF) }</Text>
                    <Text style={ styles.description }>Personal Fouls</Text>
                    <Text style={[ styles.text, styles.textRight ]}>{ parseInt(params.stats.away_totals.PF) }</Text>
                    <Text style={ styles.triangleContainer, parseInt(params.stats.away_totals.PF) > parseInt(params.stats.home_totals.PF) ? styles.triangleOrange : styles.triangleWhite }>&#9664;</Text>
                    <Divider/>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        margin: 10
    },
    header: {
        backgroundColor: "#E9ECEF", 
        flex: 1, 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center", 
        paddingBottom: 5
    },
    headerText: { 
        flex: 0.5, 
        fontWeight: "bold"
    },
    headerLeft: {
        paddingLeft: 20, 
        textAlign: "left", 
    },
    headerRight: {
        paddingRight: 20, 
        textAlign: "right",
    },
    row: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    triangleContainer: { 
        width: 15,        
    },
    triangleOrange: {
        color: "orange"
    },
    triangleWhite: {
        color: "white"
    },
    text: {
        color: "gray",
        flex: 0.2,
    },
    textLeft: { 
        paddingLeft: 5,
        textAlign: "left"
    },
    textRight: { 
        paddingRight: 5,
        textAlign: "right"
    },
    description: { 
        flex: 0.6, 
        textAlign: "center",
        fontSize: 14
    }
});

export default MatchTeamStats;
