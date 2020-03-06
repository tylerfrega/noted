import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Todo.scss'
import axios from 'axios'
import Task from './Task'
import createTaskImg from '../../assets/images/createTask.png'

const Todo = () => {
    const [tasks, setTasks] = useState([])
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

    return (
        <div>
            <div className="task-headers">
                <h3 className="taskHeader">NoteBooks -ALL</h3>
            </div>
            <div className='tasks'>
                {
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
                }
            </div>
            <Link to='/create' className="create-task-btn">
                        <img src={createTaskImg} alt='boo' style={{ height: "25px", marginRight: "8px" }} />
                        Create a new Notebook...
            </Link>
        </div>
    )
}

export default Todo
