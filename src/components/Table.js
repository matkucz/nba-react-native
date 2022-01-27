import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { DataTable } from 'react-native-paper';

function Table (props) {
    const navigate = useNavigation();
    return (
        <View style={{ flexDirection: "row" }}>
            <View style={{flex: props.headersFlex !== undefined ?  props.headersFlex : 0.6 }}>
                <DataTable>
                    <DataTable.Header style={{ backgroundColor: "#E9ECEF" }}>
                        <DataTable.Title style={{  }}>{props.columns[0]}</DataTable.Title>
                    </DataTable.Header>
                    {
                        props.headers.map((value) => {
                            return (
                                <DataTable.Row style={[ value == "Team Totals" ? { backgroundColor: "#E9ECEF" } : { } ]}>
                                    <DataTable.Cell onPress={() => value === "Stephen Curry" ? navigate.navigate("PlayerDetails", {playerName: value}): ""} style={[{ backgroundColor: "#E9ECEF",  }]}>{ value }</DataTable.Cell>
                                </DataTable.Row>        
                            )
                        })
                    }
                </DataTable>
            </View>
            <ScrollView style={{flex: 0.6}} horizontal={true}>
                <DataTable>
                    <DataTable.Header style={{  backgroundColor: "#E9ECEF" }}>
                        {
                            props.columns.map((column, index) => {
                                if (index !== 0) {
                                    return <DataTable.Title style={{ width:120 }}>{ column }</DataTable.Title>    
                                }
                            })                            
                        }
                    </DataTable.Header>
                    {
                        props.data.map((value) => {
                            return (
                                <DataTable.Row style={{ }}>
                                    {
                                        props.dataMaper.map((fieldName) => {
                                            return (
                                                <DataTable.Cell style={{ width: 120 }}>
                                                    { value[fieldName] }        
                                                </DataTable.Cell>
                                            )
                                        })
                                    }
                                </DataTable.Row>
                            )
                        })                    
                    }
                </DataTable>
            </ScrollView>
        </View>
    )
}

export default Table;