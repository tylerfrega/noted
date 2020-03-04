import React, { useState } from 'react'
import axios from 'axios'
import TaskList from './TaskList'
import Task from './Task'
import save from '../../assets/images/save.png'
import CreateTask from './CreateTask';

const CreateNotebook = () => {
    const [title, setTitle] = useState('')
    const [notes, setNotes] = useState('')
    const [tasks, setTasks] = useState([])
    // const [value, setValue] = useState('')

    const handleSubmit =  async () => {
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

    // const saveTask = (e, title) => {
    //     e.preventDefault()
    //     if (!title) return

    //     const task = {
    //         title,
    //         completed: false,
    //     }

    //     saveTask(task)
    //     setTask('')
    // }


    const handleTaskSubmit = (e, value) => {
        e.preventDefault()
        if (!value) return

        addTask(value)
        // setValue('')
    }

    const addTask = title => {
        const newTasks = [...tasks, { title, completed: false }]
        console.log(newTasks)
        setTasks(newTasks)
    }

    const removeTask = index => {
        const newTasks = [...tasks]

        newTasks.splice(index, 1)
        setTasks([...newTasks])
    }

    return (
        <div className='create-task'>
            <form>
                <input
                    type='text'
                    className='input'
                    value={title}
                    placeholder='Title'
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea
                    value={notes}
                    placeholder='Notes'
                    onChange={e => setNotes(e.target.value)}
                >
                </textarea>
            </form>

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
                {/* <div className='create-task'>
                    <form onSubmit={handleTaskSubmit}>
                        <input
                            type='text'
                            className='input'
                            value={value}
                            placeholder='Add a new task...'
                            onChange={e => setValue(e.target.value)}
                        />
                    </form>
                </div> */}
                <CreateTask handleTaskSubmit={handleTaskSubmit} />
            </div>

            <button className="save-task-btn" onClick={() => handleSubmit()}>
                <img src={save} alt='boo' />
            </button>      
        </div>
    )
}

export default CreateNotebook
