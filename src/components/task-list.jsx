import React from "react";
import Form from './form';
import { useEffect, useState } from 'react';
import Task from './task';
import {Task as TaskModel} from '../model/task'
import PacmanLoader from "react-spinners/PacmanLoader"
import { addTask, getTasks, httpDeleteTask, httpEditTask } from "../services/httpConsumer";

const TaskList = ()=>{
    
  const [taskList,setTaskList] = useState([])
  const [idOfRepeatedElement, setIdOfRepeatedElement] = useState("")
  const [isLoading,setIsLoading]= useState(true)
  const [selectedTask,setSelectedTask] = useState(null)

  const addTaskToList = (task) => {
    if(taskDoesNotExists(task.description)){
        handleUpload(task)
      return true
    }else{
      setIdOfRepeatedElement(getIdOfRepeatedElement(task.description))
      return false
    }
  }

  const inputHasChanged = () => setIdOfRepeatedElement("")

  const taskDoesNotExists = (description) => taskList.every((canditate)=>canditate.description !== description)

  const getIdOfRepeatedElement = (description) => taskList.find((canditate)=>canditate.description == description).id

  const deleteAll = () =>{
    setIsLoading(true)
    taskList.forEach((task)=>{
      httpDeleteTask(task.id)
    })
    setTaskList([])
    setIsLoading(false)
  }

  const getTaskLists = () => getTasks(data => {
    setTaskList(data.map(adaptModelToDomain));
  },() => setIsLoading(false))

  const adaptModelToDomain = (task) => new TaskModel(task.description, task.priority, task.id)

  useEffect(()=>{
    getTaskLists()
  },[])
  /*
  Cuando la página se carga (escuchamos al []), realizar un fetch (GET->) a nuestro servidor
  para ir a buscar datos para renderizar en nuestra página
  */

  const deleteTask = (id) =>{
    setIsLoading(true)
    httpDeleteTask(id)
        .then(data =>getTaskLists())
  }

  const selectedTaskToEdit = (task) =>{
    setSelectedTask(task)
  }

  const handleUpload = (task) =>{
    setIsLoading(true)
        if(selectedTask){
          httpEditTask(selectedTask.id,task,() =>getTaskLists(),()=> {
            setSelectedTask(null)
            setIsLoading(false)
          })
        }else{
          addTask(task,data =>{
            setTaskList(taskList.concat(new TaskModel(data.description,data.priority,data.id)))
        },()=>setIsLoading(false))
        }
  }

    return (
        <>
            <h1>Lista de tareas!</h1>

            <Form 
              addTaskToList={addTaskToList} 
              inputHasChanged={inputHasChanged}
              selectedTask={selectedTask} />
            <span id="error-message"> </span>
            <h3>Tareas</h3>
            {
            isLoading ?
            <PacmanLoader color="#3155a6" />
            : (
                <ul id="lista-tareas">
                { /* Ordenamos la lista de prioridades convirtiendo con un 
                método de la clase Tarea, la prioridad en un valor número del 1 al 3 
                Para luego, mapear (AKA: convertir cada elemento de la lista en un JSX) 
                la lista a un <li> (Componente TASK) */}
                {
                    taskList
                    .sort((a,b)=> b.priorityOrder() - a.priorityOrder())
                    .map((task)=> <Task 
                      key={task.id} 
                      task={task} 
                      isRepeated={task.id == idOfRepeatedElement}
                      deleteTask={deleteTask}
                      editTask={selectedTaskToEdit}
                      />)
                }
                </ul>
            )
            }

            {/* Si la lista de tareas tiene elementos, mostrar botón */}
            {
            taskList.length > 0 && <button onClick={deleteAll} >Eliminar todo</button>
            }
    </>
    )
}

export default TaskList