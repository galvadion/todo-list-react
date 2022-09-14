import logo from './logo.svg';
import './App.css';
import Form from './components/form';
import { useEffect, useState } from 'react';
import Task from './components/task';
import {Task as TaskModel} from './model/task'

function App() {

  const [taskList,setTaskList] = useState([])
  const [idOfRepeatedElement, setIdOfRepeatedElement] = useState("")

  const addTaskToList = (task) => {
    if(taskList.every((canditate)=>canditate.description !== task.description)){
      setTaskList(taskList.concat(task))
      return true
    }else{
      setIdOfRepeatedElement(taskList.find((canditate)=>canditate.description == task.description).id)
      return false
    }
      
  }

  const inputHasChanged = () => setIdOfRepeatedElement("")

  const deleteAll = () =>setTaskList([])

  useEffect(()=>{
    fetch("http://localhost:3001/tasks")
    .then(response=>response.json())
    .then(data => {
      setTaskList(data.map((task)=>new TaskModel(task.text,task.priority)))
    })
  },[])

  return (
    <main>
      <h1>Lista de tareas!</h1>

      <Form addTaskToList={addTaskToList} inputHasChanged={inputHasChanged} />
      <span id="error-message"> </span>
      <h3>Tareas</h3>
      <ul id="lista-tareas">
        { /* Ordenamos la lista de prioridades convirtiendo con un 
        método de la clase Tarea, la prioridad en un valor número del 1 al 3 
        Para luego, mapear (AKA: convertir cada elemento de la lista en un JSX) 
        la lista a un <li> (Componente TASK) */}
        {
          taskList
            .sort((a,b)=> b.priorityOrder() - a.priorityOrder())
            .map((task)=> <Task key={task.id} task={task} isRepeated={task.id == idOfRepeatedElement}/>)
        }
      </ul>
      {/* Si la lista de tareas tiene elementos, mostrar botón */}
      {
        taskList.length > 0 && <button onClick={deleteAll} >Eliminar todo</button>
      }
        
    </main>
  );
}

/*
  - Editar elemento
  - Validar entrada :check:
  - Borrar elemento 
  - borrar lista completa :check:
  - Mover tarea
  - Si esta repetida que no la agregue :check:
  - Borrar entrada una vez pronto :check:
*/

export default App;
