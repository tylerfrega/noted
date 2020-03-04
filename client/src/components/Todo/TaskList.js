import React, { useState } from 'react'
import './Todo.scss'
import Task from './Task'

const TaskList = ({tasks}) => {
    const [tasksList, setTasksList] = useState([])
    const [value, setValue] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        if (!value) return

        addTask(value)
        setValue('')
    }

    const addTask = title => {
        const newTasks = [...tasks, { title, completed: false }]
        setTasksList(newTasks)
    }

    const removeTask = index => {
        const newTasks = [...tasks]

        newTasks.splice(index, 1)
        setTasksList([...newTasks])
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
                                key={index}
                                removeTask={removeTask}
                            />)
                        )}
                    </ul>
                }
                <div className='create-task'>
                    <form >
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
