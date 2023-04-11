import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from '../redux/actions/task_action';

const TaskScreen = ({ navigation }) => {


    const { tasks, taskID } = useSelector(state => state.taskReducer);
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        navigation.addListener('focus', () => {
            getTask();
        });
    }, [])

    const getTask = () => {
        const Task = tasks.find(task => task.ID === taskID)
        if (Task) {
            setTitle(Task.Title);
            setDesc(Task.Desc);
            setDone(Task.Done);
        }
    }

    const setTask = () => {
        if (title.length == 0) {
            Alert.alert('Warning!', 'Please write your task title.')
        } else {
            try {
                var Task = {
                    ID: taskID,
                    Title: title,
                    Desc: desc,
                    Done: done,
                }
                const index = tasks.findIndex(task => task.ID === taskID);
                let newTasks = [];
                if (index > -1) {
                    newTasks = [...tasks];
                    newTasks[index] = Task;
                } else {
                    newTasks = [...tasks, Task];
                }
                AsyncStorage.setItem('todo', JSON.stringify(newTasks))
                    .then(() => {
                        dispatch(setTasks(newTasks));
                        Alert.alert('Success!', 'Task saved successfully.');
                        navigation.goBack();
                    })
                    .catch(err => console.log(err))
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                value={title}
                style={styles.input}
                placeholder='Title'
                onChangeText={(value) => setTitle(value)}
            />
            <TextInput
                value={desc}
                style={styles.noteInput}
                placeholder='Description'
                multiline
                onChangeText={(value) => setDesc(value)}
            />
            <TouchableOpacity
                onPress={setTask}>
                <View
                    style={{
                        backgroundColor: '#0080ff',
                        borderRadius: 8,
                        marginHorizontal: 16,
                        marginTop: 10,
                        width: 250,
  
                    }}>
                    <Text style={styles.button}> Save Task</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default TaskScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#555555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'left',
        fontSize: 20,
        margin: 10,
        paddingHorizontal: 10,
    },
    noteInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#555555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        fontSize: 16,
        margin: 10,
        paddingHorizontal: 10,
        height: 250,
        textAlign: 'left',
    },
    button: {
        padding: 10,
        color: 'white',
        fontSize: 16,
        textAlign : 'center',
        fontWeight : 'bold'

    }

})