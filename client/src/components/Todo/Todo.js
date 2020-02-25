import React, { useState, useEffect } from 'react'
import './Todo.scss'
import axios from 'axios'
import CreateTask from './CreateTask'
import Task from './Task'

const Todo = () => {
    const [tasks, setTasks] = useState([])
    const [showCompleted, setCompleted] = useState(false)

    const fetchTask = async () => {
        const result = await axios({
            method: 'get',
            url: '/api/getTasks'
        })
        setTasks(result.data.data)
    }

    useEffect(() => { fetchTask() }, [])

    const addTask = title => {
        const task = {
            title: title,
            completed: false
        }
        const newTasks = [...tasks, { title, completed: false }]
        setTasks(newTasks)

        const saveTask = async () => {
            const result = await axios({
                method: 'post',
                url: '/api/addTask',
                data: task
            })
            setTasks(result.data.data)
        }
        saveTask()
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

    const toggleShowCompleted = (bol) => {
        setCompleted(bol)
    }

    const showCreateTask = () => {
        if (!showCompleted) {
            return <CreateTask addTask={addTask} />
        }
    }

    return (
        <div className='todo-container paper'>
            <div className='header'>React Hooks for Fun and Profit</div>
            <div className='tasks'>

                <div className="task-headers">
                    <h3 className={`task-header ${!showCompleted ? 'active' : ''}`} onClick={() => toggleShowCompleted(false)}>Todo</h3>
                    <h3 className={`task-header ${showCompleted ? 'active' : ''}`} onClick={() => toggleShowCompleted(true)}>Complete</h3>
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
