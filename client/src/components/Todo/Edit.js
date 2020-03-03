import React, { useState, useEffect }from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import CreateNotebook from './CreateNotebook';

const Edit = () => {
    let { id }  = useParams();
    const [notebook, setNotebook] = useState([])
    useEffect(() => { fetchNotebook() }, [id])

    const fetchNotebook = async () => {
        const result = await axios({
            method: 'get',
            url: '/api/getNotebooks',
        })
        setNotebook(result.data.data.filter(item => item._id === id)[0])
    }

    return (
        <div>
            <h1 className="welcome">{notebook.title}</h1>
            <p>{notebook.notes}</p>
        </div>
    )
}

export default Edit
