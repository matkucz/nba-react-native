import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { DataTable } from 'react-native-paper';

function Table ({columns, result}) {
    let players = [];
    Object.entries(result.Players).forEach(([key, value]) => players.push(value));
    let tableData = [];
    let rowIndex = 0;
    let cellIndex = 0;
    Object.entries(result).forEach(([key, value]) => {
        if (key !== "Players")  {            
            Object.entries(value).forEach(([k, v]) => {
                if (rowIndex === 0) {
                    tableData.push([]);
                }
                if (v === "Player Suspended" || v === "Did Not Play") {
                    tableData[cellIndex].push("-");
                } else {
                    tableData[cellIndex].push(v);
                }                
                cellIndex += 1;
            })
            cellIndex = 0;
            rowIndex += 1;
        }
    });
    return (
        <View style={{ flexDirection: "row" }}>
            <View style={{flex: 0.6 }}>
                <DataTable>
                    <DataTable.Header style={{ backgroundColor: "#E9ECEF" }}>
                        <DataTable.Title style={{ textAlign: "left" }}>{columns[0]}</DataTable.Title>
                    </DataTable.Header>
                    {
                        players.map((value) => {
                            return (
                                <DataTable.Row style={[ value == "Team Totals" ? { backgroundColor: "#E9ECEF" } : {} ]}>
                                    <DataTable.Cell style={[{ textAlign: "left" }]}>{ value }</DataTable.Cell>
                                </DataTable.Row>        
                            )
                        })
                    }
                </DataTable>
            </View>
            <ScrollView style={{flex: 0.6}} horizontal={true}>
                <DataTable>
                    <DataTable.Header style={{ backgroundColor: "#E9ECEF" }}>
                        {
                            columns.map((column, index) => {
                                if (index !== 0) {
                                    return <DataTable.Title style={{ textAlign: "left", width: 80 }}>{ column }</DataTable.Title>    
                                }
                            })                            
                        }
                    </DataTable.Header>
                    {
                        tableData.map((value) => {
                            return (
                                <DataTable.Row>
                                    {
                                        value.map((cell) => (
                                            <DataTable.Cell style={{ textAlign: "left", width: 80 }}>
                                                { cell }        
                                            </DataTable.Cell>
                                        )
                                        )
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


function MatchTable(props) {
    return (
        <Table columns={props.columns} result={props.result}/>
    );
}

export default MatchTable;