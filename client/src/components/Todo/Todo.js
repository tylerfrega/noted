import React, { useState, useEffect } from 'react'
import './Todo.scss'
import axios from 'axios'
import CreateTask from './CreateTask'
import Task from './Task'

const Todo = () => {
    const [tasks, setTasks] = useState([])
    const [showCompleted, setCompleted] = useState(false)

    //effects must explictly declare dependencies. any external variable you use in this function must be declared. In this case, none
    useEffect(() => { fetchTask() }, [])

    const fetchTask = async () => {
        const result = await axios({
            method: 'get',
            url: '/api/getTasks',
        })
        console.log(result)
        setTasks(result.data.data)
    }

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

    const updateTask = async (task) => {
        const result = await axios({
            method: 'post',
            url: '/api/updateTask',
            data: task
        })
    }

    const completeTask = index => {
        const newTasks = [...tasks]
        newTasks[index].completed = !newTasks[index].completed
        console.log(newTasks[index])

        updateTask(newTasks[index], newTasks[index].id)
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
                                        key={task._id}
                                        completeTask={completeTask}
                                        removeTask={removeTask}
                                    />
                                ) : (
                                        null
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
                                        key={task._id}
                                        completeTask={completeTask}
                                        removeTask={removeTask}
                                    />
                                ) : (
                                        null
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
