import React, { useState } from 'react'
import axios from 'axios'
import TaskList from './TaskList'

const CreateTask = () => {
    const [task, setTask] = useState('')
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        if (!title && !details) return
        const  task  = {title, details}

        saveTask(task)
        setTask('')
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
        // fetchTask()
    }

    return (
        <div className='create-task'>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                    type='text'
                    className='input'
                    value={task.title}
                    placeholder='Title'
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea
                    value={task.details}
                    placeholder='Details'
                    onChange={e => setDetails(e.target.value)}
                >
                </textarea>
            </form>
            <TaskList />
        </div>
    )
}

export default CreateTask
