import React, { useState, useEffect }from 'react'
import axios from 'axios'
import { useParams } from 'react-router'

const Edit = () => {
    let { id }  = useParams();
    const [task, setTask] = useState([])
    useEffect(() => { fetchTask() }, [id])

    const fetchTask = async () => {
        const result = await axios({
            method: 'get',
            url: '/api/getTasks',
        })
        setTask(result.data.data.filter(item => item._id === id)[0])
    }

    return (
        <div>
            <h1 className="welcome">{task.title}</h1>
        </div>
    )
}

export default Edit
