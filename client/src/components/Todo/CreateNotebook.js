import React, { useState } from 'react'
import axios from 'axios'
import TaskList from './TaskList'

const CreateNotebook = () => {
    const [task, setTask] = useState('')
    const [title, setTitle] = useState('')
    const [notes, setNotes] = useState('')

    const handleSubmit =  async (title, notes, tasks) => {
        const notebook = {
            title,
            completed: false,
            notes,
            tasks
        }
        const result = await axios({
            method: 'post',
            url: '/api/saveNotebook',
            data: notebook
        })
    }

    const saveTask = (e, title) => {
        e.preventDefault()
        if (!title) return

        const task = {
            title,
            completed: false,
        }

        saveTask(task)
        setTask('')
    }

    return (
        <div className='create-task'>
            <form onSubmit={saveTask}>
                <input
                    type='text'
                    className='input'
                    value={task.title}
                    placeholder='Title'
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea
                    value={task.details}
                    placeholder='Notes'
                    onChange={e => setNotes(e.target.value)}
                >
                </textarea>
            </form>
            <TaskList />
        </div>
    )
}

export default CreateNotebook
