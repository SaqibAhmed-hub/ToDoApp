import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import React, { useEffect } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { setTaskID, setTasks } from '../redux/actions/task_action';


export default function TodoScreen({ navigation }) {

    const { tasks } = useSelector(state => state.taskReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        getTasks();
    }, [])

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

    const deleteTask = (id) => {
        const filteredItem = tasks.filter(task => task.ID !== id)
        AsyncStorage.setItem('todo', JSON.stringify(filteredItem))
            .then(() => {
                dispatch(setTasks(filteredItem));
                Alert.alert('Task', 'Task removed successfully');
            })
            .catch(err => console.log(err))
    }

    const checkTask = (id, newValue) => {
        const index = tasks.findIndex(task => task.ID === id)
        if (index > -1) {
            let newTasks = [...tasks];
            newTasks[index].Done = newValue;
            AsyncStorage.setItem('todo', JSON.stringify(newTasks))
                .then(() => {
                    dispatch(setTasks(newTasks));
                    Alert.alert('Success!', 'Task state is changed.');
                })
                .catch(err => console.log(err))
        }
    }


        return (
            <View style={styles.container}>
                <FlatList
                    bounces
                    data={tasks.filter(task => task.Done === false)}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.backGround}
                            onPress={() => {
                                dispatch(setTaskID(item.ID));
                                navigation.navigate('Task');
                            }} >
                            <View style={styles.item_row}>
                                <View
                                    style={[{ backgroundColor: '#f28b82' }, styles.color]}
                                />
                                <CheckBox
                                    value={item.Done}
                                    onValueChange={(newValue) => { checkTask(item.ID, newValue) }}
                                />

                                <View style={styles.item_body} >
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
                                </View>
                                <TouchableOpacity
                                    style={styles.delete}
                                    onPress={() => {
                                        deleteTask(item.ID)
                                    }}
                                >
                                    <FontAwesome
                                        name="trash"
                                        size={24}
                                        color='#000f00'
                                    />
                                </TouchableOpacity>
                            </View>
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
            paddingRight: 10,
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            borderRadius: 10,
            elevation: 5,
        },
        title: {
            color: '#000000',
            fontSize: 26,
            margin: 5,
        },
        subtitle: {
            color: '#999999',
            fontSize: 16,
            margin: 3,
        },
        item_row: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        color: {
            width: 20,
            height: 100,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
        },
        item_body: {
            flex: 1,
        },
        delete: {
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
        }

    });