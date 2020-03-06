import React, { useState, useEffect }from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import TaskListEdit from './TaskListEdit'
import saveIcon from '../../assets/images/save.png'
import deleteIcon from '../../assets/images/delete.png'

const Edit = () => {
    let { _id }  = useParams();
    const [title, setTitle] = useState('')
    const [notes, setNotes] = useState('')
    const [tasks, setTasks] = useState([])
    const [value, setValue] = useState('')
    useEffect(() => { fetchNotebook() }, [_id])

    const fetchNotebook = async () => {
        if(_id) {
            const result = await axios({
                method: 'get',
                url: '/api/getNotebooks',
            })
            const notebook = result.data.data.filter(item => item._id === _id)[0]
            setTasks(notebook.tasks)
            setNotes(notebook.notes)
            setTitle(notebook.title)
        }
    }

    const saveNotebook =  async () => {
        const url = _id ? '/api/updateNotebook' : '/api/saveNotebook'
        const notebook = {
            _id,
            title,
            notes,
            tasks
        }

        const result = await axios({
            method: 'post',
            url: url,
            data: notebook
        })
    }

    const deleteNotebook =  async () => {
        console.log(_id)
        const result = await axios({
            method: 'delete',
            url: '/api/deleteNotebook',
            data: {_id}
        })
    }

    const handleTaskSubmit = e => {
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
        setTasks(newTasks)
    }
    


    return (
        <div className="edit">
            <div className='title'>
            <input
                    type='text'
                    className='input'
                    value={title}
                    placeholder='Title'
                    onChange={e => setTitle(e.target.value)}
                />
            </div>
            
            <div  className='notes'>
            <textarea
                    value={notes}
                    placeholder='Notes'
                    onChange={e => setNotes(e.target.value)}
                    
                >
                </textarea>
            </div>

            <TaskListEdit
                tasks={tasks}
                value={value}
                handleSubmit={handleTaskSubmit}
                removeTask={removeTask}
                setValue={setValue}
                completeTask={completeTask}
            />
            <button onClick={() => saveNotebook()}>
                <img src={saveIcon} alt={'turds'} />
            </button>
            <button onClick={() => deleteNotebook()}>
                <img src={deleteIcon} alt={'turds'} />
            </button>
        </div>
    )
}

export default Edit
