import logo from './logo.svg';
import './App.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import TaskList from './components/task-list';

function App() {


  return (
    <main>
      <RouterProvider router={createBrowserRouter([
        {
          path:"/", element: <TaskList />
        }
      ])} />

      
        
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
