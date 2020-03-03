import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Todo.scss'
import axios from 'axios'
import Task from './Task'
import createTaskImg from '../../assets/images/createTask.png'

const Todo = () => {
    const [tasks, setTasks] = useState([])
    const [showCompleted, setCompleted] = useState(false)

    //effects must explictly declare dependencies. 
    //any external variable you use in this function must be declared. 
    //In this case, none
    useEffect(() => { fetchTask() }, [])

    const fetchTask = async () => {
        const result = await axios({
            method: 'get',
            url: '/api/getNotebooks',
        })
        setTasks(result.data.data)
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
        updateTask(newTasks[index], newTasks[index].id)
        setTasks(newTasks)
    }

    const showCreateNotebook = () => {
        if (!showCompleted) {
            return <Link to='/create' className="create-task-btn">
                        <img src={createTaskImg} alt='boo' style={{ height: "25px", marginRight: "8px" }} />
                        Create a new Notebook...
                    </Link>
        }
    }

    return (
        <div>
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
                                        showEdit={true}
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
                                        showEdit={true}
                                    />
                                ) : (
                                        null
                                    )
                            )}
                        </ul>
                }
            </div>
            {showCreateNotebook()}
        </div>
    )
}

export default Todo
