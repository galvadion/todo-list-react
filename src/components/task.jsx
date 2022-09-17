import React from "react";

const Task = ({task,isRepeated,deleteTask,editTask}) => {


    return (
        <li className={`${task.priority} ${isRepeated ? 'repeated' : ''}` }>
            {task.description} 
            <span onClick={()=>{
                editTask(task)}}  className='feather'>I</span>
            <span onClick={()=>{
                deleteTask(task.id)}}  className='feather'>X</span>
        </li>
    )
}

export default Task;