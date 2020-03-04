import React, { useState, useEffect }from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import Task from './Task'

const Edit = () => {
    let { id }  = useParams();
    const [notebook, setNotebook] = useState('')
    const [tasks, setTasks] = useState([])

    useEffect(() => { fetchNotebook() }, [id, setNotebook])

    const fetchNotebook = async () => {
        const result = await axios({
            method: 'get',
            url: '/api/getNotebooks',
        })
        setNotebook(result.data.data.filter(item => item._id === id)[0])
        setTasks(result.data.data.filter(item => item._id === id)[0].tasks)
    }

    const completeTask = (index) => {
        const newTasks = [...tasks]
        console.log(newTasks)
        newTasks[index].completed = !newTasks[index].completed
        // updateTask(newTasks[index], newTasks[index].id)
        setTasks(newTasks)
    }

    return (
        <div>
            <h1 className="welcome">{notebook.title}</h1>
            <p className="notes">{notebook.notes}</p>
            
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
                                showCompleteTask={true}
                                completeTask={completeTask}
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
                </div>
                {/* <TaskList tasks={notebook.tasks} /> */}
            </div>
        </div>
    )
}

export default Edit
