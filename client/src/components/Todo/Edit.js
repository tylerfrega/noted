import React, { useState, useEffect }from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import CreateNotebook from './CreateNotebook'
import TaskListEdit from './TaskListEdit'
import { set } from 'mongoose';

const Edit = () => {
    let { id }  = useParams();
    const [notebook, setNotebook] = useState([])
    const [tasks, setTasks] = useState([])
    const [value, setValue] = useState('')

    useEffect(() => { fetchNotebook() }, [id])

    const fetchNotebook = async () => {
        const result = await axios({
            method: 'get',
            url: '/api/getNotebooks',
        })
        setNotebook(result.data.data.filter(item => item._id === id)[0])
        setTasks(result.data.data.filter(item => item._id === id)[0].tasks)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (!value) return

        addTask(value)
        setValue('')
    }

    const addTask = title => {
        const newTasks = [...tasks, { title, completed: false }]
        setTasks(newTasks)
    }

    const removeTask = index => {
        const newTasks = [...tasks]

        newTasks.splice(index, 1)
        setTasks([...newTasks])
    }

    const completeTask = index => {
        const newTasks = [...tasks]

        newTasks[index].completed = !newTasks[index].completed
        // updateTask(newTasks[index], newTasks[index].id)
        setTasks(newTasks)
    }


    return (
        <div>
            <h1 className="welcome">{notebook.title}</h1>
            <p className="notes">{notebook.notes}</p>
            <TaskListEdit
                tasks={tasks}
                value={value}
                handleSubmit={handleSubmit}
                removeTask={removeTask}
                setValue={setValue}
                completeTask={completeTask}
            />
        </div>
    )
}

export default Edit
