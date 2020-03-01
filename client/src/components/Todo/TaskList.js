import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Todo.scss'
import axios from 'axios'
import Task from './Task'
import createTaskImg from '../../assets/images/createTask.png'


const TaskList = () => {
    const [tasks, setTask] = useState([])
    const [value, setValue] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        if (!value) return

        setValue(value)
        setTask('')
    }

    return (
        <div>
            <div className='tasks'>
                <div className="task-headers">
                    <h3 className={'task-header'} >Tasks</h3>
                </div>
                {
                    <ul>
                        {tasks.map((task, index) =>
                            (<Task
                                task={task}
                                index={index}
                                key={task._id}
                            // completeTask={completeTask}
                            // removeTask={removeTask}
                            />)
                        )}
                    </ul>
                }
                <div className='create-task'>
                    <form onSubmit={handleSubmit}>
                        <input
                            type='text'
                            className='input'
                            value={value}
                            placeholder='Add a new task...'
                            onChange={e => setValue(e.target.value)}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TaskList
