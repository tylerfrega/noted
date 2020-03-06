import React, { useState } from 'react'
import './Todo.scss'
import Task from './Task'

const TaskListEdit = ({    
    tasks,
    value,
    handleSubmit, 
    removeTask,
    setValue,
    completeTask,
}
    ) => {
    const [showCompleted, setCompleted] = useState(false)

    const showCreateTask = () => {
        if (!showCompleted) {
            return  <div className='create-task'>
                        <form onSubmit={handleSubmit}>
                            <input
                                type='text'
                                className='input'
                                value={value}
                                placeholder='Add a new task...'
                                onChange={e => setValue(e.target.value)}
                            />
                        </form>
                    </div>
        }
    }

    return (
        <div>
            <div className="task-headers">
                <h3 className={`task-header ${!showCompleted ? 'active' : ''}`} onClick={() => setCompleted(!showCompleted)}>Todo</h3>
                <h3 className={`task-header ${showCompleted ? 'active' : ''}`} onClick={() => setCompleted(!showCompleted)}>Complete</h3>
            </div>
            <div className='tasks'>
                {
                    !showCompleted ?
                        //NOT COMPLETED
                        <ul>
                            {tasks.map((task, index) =>
                                !task.completed ? (
                                    (<Task
                                        task={task}
                                        index={index}
                                        key={index}
                                        completeTask={completeTask}
                                    />)
                                ) : (
                                        null
                                    )
                            )}
                        </ul>
                        :
                        //COMPLETED
                        <ul>
                            {tasks.map((task, index) =>
                                task.completed ? (
                                    (<Task
                                        task={task}
                                        index={index}
                                        key={index}
                                        removeTask={removeTask}
                                        completeTask={completeTask}
                                    />)
                                ) : (
                                        null
                                    )
                            )}
                        </ul>
                }
                
            </div>
            {showCreateTask()}
        </div>
    )
}

export default TaskListEdit
