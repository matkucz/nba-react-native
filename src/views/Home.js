import * as React from 'react';
import { ActivityIndicator} from 'react-native-paper';
import { View, FlatList } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';
import MatchCard from '../components/cards/MatchCard';


function renderItem (matchData) {
    return (
        <MatchCard
            key={ matchData.item.id }
            matchID={ matchData.item.id }
            homeImg={ matchData.item.home_img }
            homeScore={ matchData.item.home_points }
            awayImg={ matchData.item.away_img }
            awayScore={ matchData.item.away_points }
            homeTeam={ matchData.item.home_team }
            awayTeam={ matchData.item.away_team }
            date={ matchData.item.date }
        />  
    )
}

function Home() {
    const [loading, setLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setMatchData] = React.useState([]);
    const firestore = firebase.firestore();
    const maxSize = 25;

    React.useEffect(() => {
        if (data.length == 0) {
            const subscriber = firestore
            .collection('Schedule')
            .orderBy("id", "desc")
            .limit(6)
            .get()
            .then((querySnapshot) => {
                const matches = []
                querySnapshot.forEach((res) => {
                    const querydata = res.data();
                    matches.push(
                        { ...querydata, key: querySnapshot.id }
                    );
                });
                setMatchData(matches);
                setLoading(false);
            });
            return () => subscriber;
        }        
    }, []);

    const fetchData  = () => {
        setRefreshing(true);
        const subscriber = firestore
        .collection("Schedule")
        .where("id", "<", maxSize - data.length)
        .orderBy("id", "desc")
        .limit(6)
        .get()
        .then((querySnapshot) => {
            const matches = [];
            querySnapshot.forEach((res) => {
                const querydata = res.data();
                matches.push(
                    { ...querydata, key: querySnapshot.id }
                );
            });
            setMatchData([...data, ...matches]);
            setRefreshing(false);
        });
        return () => subscriber;
    }
    
    if (loading) {
        return (
            <View style={{flexDirection: "column", flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "transparent"}}>
                <ActivityIndicator
                    textContent={'Loading...'}
                    size='large'
                />
            </View>
        )
    }
    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={ 0.001 }
            onEndReached={ ({distanceFromEnd}) => {
                fetchData();
            }}
            refreshing={refreshing}
            onRefresh={() => {}}
        />
    )
}

export default Home;