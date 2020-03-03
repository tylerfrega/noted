import React from 'react'
import complete from '../../assets/images/complete.svg'
import incomplete from '../../assets/images/incomplete.svg'
import edit from '../../assets/images/edit.png'
import { Link } from 'react-router-dom'


const Task = ({
    task,
    index,
    completeTask,
    showEdit,
    removeTask,
    _id
}) => {

    const showEditButton = (showEdit) => {
        if (showEdit) {
            return  <button>
                        <Link to={`edit/${task._id}`}>
                            <img src={edit} alt='boo' style={{ height: "25px", marginRight: "8px" }} />
                        </Link>
                    </button>
        }
    }

    const showCompleteButton = () => {
        if (completeTask) {
            return <button onClick={() => completeTask(index)}>
                        {task.completed ? (
                            <img src={complete} alt='boo' />) : (<img src={incomplete} alt='boo' />)}
                    </button>
        }
    }

    const showRemoveButton = () => {
        if (removeTask) {
            return <button onClick={() => removeTask(index)}>
                        x
                    </button>
        }
    }

    return (
        <li
            className='task'
            id={_id}
            style={{ textDecoration: task.completed ? 'line-through' : '' }}
        >
            {task.title}
            {showEditButton(showEdit)}
            {showCompleteButton()}
            {showRemoveButton()}
        </li>
    )
}

export default Task