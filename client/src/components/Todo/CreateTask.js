import React, { useState } from 'react'

const CreateTask = (handleTaskSubmit) => {
    const [value, setValue] = useState('')


    return (
        <div className='create-task'>
            <form onSubmit={(e) => handleTaskSubmit(e, value)}>
                <input
                    type='text'
                    className='input'
                    value={value}
                    placeholder='Add a new task...'
                    onChange={e => setValue(e.target.value)}
                />
            </form>
        </div>
    )
}

export default CreateTask
