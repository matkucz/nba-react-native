import * as React from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator, Title} from 'react-native-paper';
import MatchCard from '../components/cards/MatchCard';
import { firebase } from '@react-native-firebase/firestore';


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


function Favorites (props) {
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [teams, setTeams] = React.useState([]);
    const firestore = firebase.firestore();

    async function getMatches () {
        const [ home, away ] = await Promise.all([
            getHomeMatches(),
            getAwayMatches()
        ]);
        const sorted = ([...home, ...away].sort((a, b) => b.id - a.id));
        const filtered = sorted.filter((value, index, self) => 
            index === self.findIndex((elem) => 
                elem.id === value.id
            )
        )
        setData(filtered);
    }

    const getHomeMatches = () => {
        return firestore.collection("Schedule")
            .where("home_team", "in", teams)
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
                return matches;
            }).catch((error) => console.error(error));
    }

    const getAwayMatches = () => {
        return firestore.collection("Schedule")
            .where("away_team", "in", teams)
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
                return matches;
            }).catch((error) => console.error(error));
    }

    React.useEffect(() => {
        setLoading(true);        
        if (props.username) {
            const list = [];
            firestore.collection("Favorites").where("username", "==", props.username)
                .get().then(
                    querySelector => {
                        querySelector.forEach(query => {
                            const queryData = query.data();
                            list.push(queryData.team);
                        })
                        setTeams(list);
                    })
                    .then(() => {
                        getMatches();
                    })
        }
        setLoading(false);
    }, [props])

    return (
        loading ? 
            <View style={{flexDirection: "column", flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator
                    visible={true}
                    textContent={'Loading...'}
                    size='large'
                />
            </View>
        : ( data.length !== 0 ? (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    padding: 20
                }}>
                    <Title>
                        Sign in to your account to see favorites
                    </Title>
                </View>
            )
        )
    )
}

export default Favorites;