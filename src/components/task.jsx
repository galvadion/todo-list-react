import React from "react";

const Task = ({task,isRepeated}) => {
    return (
        <li className={`${task.priority} ${isRepeated ? 'repeated' : ''}` }>{task.description} <span  className='feather'>X</span></li>
    )
}

export default Task;