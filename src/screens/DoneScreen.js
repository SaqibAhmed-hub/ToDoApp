import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { setTaskID, setTasks } from '../redux/actions/task_action';

const DoneScreen = ({navigation}) => {

  const { tasks } = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.ID !== id);
    AsyncStorage.setItem('todo', JSON.stringify(filteredTasks))
      .then(() => {
        dispatch(setTasks(filteredTasks));
        Alert.alert('Success!', 'Task removed successfully.');
      })
      .catch(err => console.log(err))
  }


  return (
    <View style={styles.body}>
      <FlatList
        data={tasks.filter(task => task.Done === true)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              dispatch(setTaskID(item.ID));
              navigation.navigate('Task');
            }}
          >
            <View style={styles.item_row}>
              <View style={styles.item_body}>
                <Text
                  style={[
                    styles.title
                  ]}
                  numberOfLines={1}
                >
                  {item.Title}
                </Text>
                <Text
                  style={[
                    styles.subtitle
                  ]}
                  numberOfLines={1}
                >
                  {item.Desc}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => { deleteTask(item.ID) }}
              >
                <FontAwesome
                  name={'trash'}
                  size={22}
                  color={'#000000'}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>

  )
}

export default DoneScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  item_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_body: {
    flex: 1,
  },
  delete: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
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
    fontSize: 26,
    margin: 5,
    textDecorationLine : 'line-through'
  },
  subtitle: {
    color: '#999999',
    fontSize: 16,
    margin: 5,
  }
})