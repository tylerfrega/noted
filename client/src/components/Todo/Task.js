import React from 'react'
import complete from '../assets/images/complete.svg'
import incomplete from '../assets/images/incomplete.svg'

const Task = ({
    task,
    index,
    completeTask,
    handleDragStart,
    handleDragOver,
    handleDrop
}) => {
    return (
        <li
            className='task'
            id={index}
            style={{ textDecoration: task.completed ? 'line-through' : '' }}
            draggable
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {task.title}
            <button onClick={() => completeTask(index)}>
                {task.completed ? (
                    <img src={complete} alt='boo' />
                ) : (
                    <img src={incomplete} alt='boo' />
                    )}
            </button>
        </li>
    )
}

export default Task