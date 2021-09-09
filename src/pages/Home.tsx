import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  id: number;
  newTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyCreated = tasks.find(item => item.title === newTaskTitle);

    if(taskAlreadyCreated) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome.');
    }
    
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks([...tasks, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({...task}))

    const findItem = updatedTasks.find(item => item.id === id);

    if(!findItem) {
      return;
    }

    findItem.done = !findItem.done;

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      `Ops! Tome cuidado.`,
      "Tem certeza que deseja remover essa tarefa?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        {
          text: "Sim",
          style: 'destructive',
          onPress: () => {
            const updatedTasks = tasks.filter(task => task.id !== id);

            setTasks(updatedTasks);
          }}
      ]
    );
  }

  function handleEditTask({ id, newTitle} : EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({...task}));

    const taskEdit = updatedTasks.find(task => task.id === id);

    if(!taskEdit) {
      return;
    }

    taskEdit.title = newTitle;

    setTasks(updatedTasks);
    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})