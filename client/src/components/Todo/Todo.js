import React, { useState, useEffect } from 'react'
import './Todo.scss'
import axios from 'axios'
import CreateTask from './CreateTask'
import Task from './Task'

const Todo = () => {
    const [tasks, setTasks] = useState([])
    const [showCompleted, setCompleted] = useState(false)

    useEffect(() => { fetchTask() }, [])

    const saveTask = async (title) => {
        const task = {
            title: title,
            completed: false
        }
        const result = await axios({
            method: 'post',
            url: '/api/addTask',
            data: task
        })
        fetchTask()
    }

    const fetchTask = async () => {
        const result = await axios({
            method: 'get',
            url: '/api/getTasks'
        })
        setTasks(result.data.data)
    }

    const completeTask = index => {
        const newTasks = [...tasks]
        newTasks[index].completed
            ? (newTasks[index].completed = false)
            : (newTasks[index].completed = true)
        setTasks(newTasks)
    }

    const removeTask = index => {
        const newTasks = [...tasks]
        newTasks.splice(index, 1)
        setTasks([...newTasks])
    }

    const showCreateTask = () => {
        if (!showCompleted) {
            return <CreateTask saveTask={saveTask} />
        }
    }

    return (
        <div className='todo-container paper'>
            <div className='header'>Noted...</div>
            <div className='tasks'>

                <div className="task-headers">
                    <h3 className={`task-header ${!showCompleted ? 'active' : ''}`} onClick={() => setCompleted(!showCompleted)}>Todo</h3>
                    <h3 className={`task-header ${showCompleted ? 'active' : ''}`} onClick={() => setCompleted(!showCompleted)}>Complete</h3>
                </div>
                {
                    !showCompleted ?
                        //NOT COMPLETED
                        <ul>
                            {tasks.map((task, index) =>
                                !task.completed ? (
                                    <Task
                                        task={task}
                                        index={index}
                                        key={index}
                                        completeTask={completeTask}
                                        removeTask={removeTask}
                                    />
                                ) : (
                                        ''
                                    )
                            )}
                        </ul>
                        :
                        //COMPLETED
                        <ul>
                            {tasks.map((task, index) =>
                                task.completed ? (
                                    <Task
                                        task={task}
                                        index={index}
                                        key={index}
                                        completeTask={completeTask}
                                        removeTask={removeTask}
                                    />
                                ) : (
                                        ''
                                    )
                            )}
                        </ul>
                }
            </div>
            {showCreateTask()}
        </div>
    )
}

export default Todo
