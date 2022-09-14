import logo from './logo.svg';
import './App.css';
import Form from './components/form';
import { useState } from 'react';
import Task from './components/task';

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

  return (
    <main>
      <h1>Lista de tareas!</h1>

      <Form addTaskToList={addTaskToList} inputHasChanged={inputHasChanged} />
      <span id="error-message"> </span>
      <h3>Tareas</h3>
      <ul id="lista-tareas">
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
