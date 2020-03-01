import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Todo from './components/Todo/Todo'
import Home from './components/Home'
import Edit from './components/Todo/Edit'
import CreateTask from './components/Todo/CreateTask'
import './App.scss'

function App() {
    return (
        <div className='app todo-container paper'>
            <Router>
                <div className='header'>
                    <Link to='/todo'>
                        Noted...
                    </Link>
                </div>
                <div>
                    <Switch>
                        <Route path='/' component={Home} exact></Route>
                        <Route path='/todo' component={Todo}></Route>
                        <Route path='/edit/:id' component={Edit}></Route>
                        <Route path='/create' component={CreateTask}></Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App
