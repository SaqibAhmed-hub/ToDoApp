import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { setTaskID, setTasks } from '../redux/actions/task_action';


export default function TodoScreen({ navigation }) {

    const {tasks}  = useSelector(state => state.taskReducer);
    const dispatch = useDispatch();

    const getTasks = () => {
        AsyncStorage.getItem('todo')
            .then(tasks => {
                const parsedTasks = JSON.parse(tasks);
                if (parsedTasks && typeof parsedTasks === 'object') {
                    dispatch(setTasks(parsedTasks));
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getTasks();
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                bounces
                data={tasks}
                renderItem={ ({item})  => (
                    <TouchableOpacity
                        style={styles.backGround}
                        onPress={() => {
                            dispatch(setTaskID(item.ID));
                            navigation.navigate('Task');
                        }}
                    >
                        <Text
                            style={styles.title}
                            numberOfLines={1}
                        >
                            {item.Title}
                        </Text>
                        <Text
                            style={styles.subtitle}
                            numberOfLines={1}
                        >
                            {item.Desc}
                        </Text>
                    </TouchableOpacity>
                
                )
                }
                keyExtractor={(item, index) => index.toString()}
            />


            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    dispatch(setTaskID(tasks.length + 1));
                    navigation.navigate('Task');
                }}
            >
                <FontAwesome name='plus' color='#fff' size={20} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        backgroundColor: '#0080ff',
        bottom: 10,
        right: 10,
        elevation: 5,
        borderRadius: 30,
        position: 'absolute',
    },
    backGround: {
        marginHorizontal: 10,
        marginVertical: 7,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5,
    },
    title: {
        color: '#000000',
        fontSize: 28,
        margin: 5,
    },
    subtitle: {
        color: '#999999',
        fontSize: 18,
        margin: 5,
    }

});