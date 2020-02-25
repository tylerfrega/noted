import React, { useState } from 'react'

const CreateTask = ({ saveTask }) => {
    const [value, setValue] = useState('')
    const handleSubmit = e => {
        e.preventDefault()
        if (!value) return

        saveTask(value)
        setValue('')
    }

    return (
        <div className='create-task'>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    className='input'
                    value={value}
                    placeholder='Add a new task'
                    onChange={e => setValue(e.target.value)}
                />
            </form>
        </div>
    )
}

export default CreateTask



    //revert back to add task to fix build!!!!!!!!!!
    // const addTask = async (task) => {
    //     const result = await axios({
    //         method: 'post',
    //         url: '/api/addTask',
    //         data: task
    //     })
    //     setTasks(result.data.data)
    // }